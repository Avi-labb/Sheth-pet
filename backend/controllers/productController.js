import XLSX from "xlsx";
import Product from "../models/productModule.js";
import Category from "../models/categoryModel.js";
import Counter from "../models/counterModel.js";
import { uploadToCloudinary, isCloudinaryUrl } from "../utils/cloudinary.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deleteLocalFile = (filePath) => {
  if (!filePath) return;
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`[Cleanup] Deleted local file: ${filePath}`);
    }
  } catch (err) {
    console.warn(`[Cleanup] Failed to delete local file ${filePath}:`, err.message);
  }
};

const deleteLocalFileSafe = (file) => {
  if (!file) return;
  const filePath = file.path || (file.filename ? path.join(__dirname, "../uploads", file.filename) : null);
  deleteLocalFile(filePath);
};

const uploadFileToCloudinary = async (file, folder = "sheth-pet/products") => {
  if (!file) return null;
  if (isCloudinaryUrl(file.filename || file)) return file.filename || file;

  const filePath = file.path || path.join(__dirname, "../uploads", file.filename);
  const result = await uploadToCloudinary(filePath, folder);

  if (result && result.url) {
    deleteLocalFile(filePath);
    return result.url;
  }
  return file.filename || null;
};

export const bulkUploadProducts = async (req, res) => {
  const filesToCleanup = [];
  try {
    if (!req.files || !req.files['file'] || req.files['file'].length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload a CSV or Excel file",
      });
    }

    const spreadsheetFile = req.files['file'][0];
    filesToCleanup.push(spreadsheetFile);

    const imageMap = new Map();
    if (req.files['images'] && req.files['images'].length > 0) {
      console.log(`[Cloudinary] Uploading ${req.files['images'].length} images to Cloudinary...`);

      const uploadPromises = req.files['images'].map(async (imageFile) => {
        const key = imageFile.originalname.trim().toLowerCase();
        const keyWithoutExt = key.replace(/\.[^/.]+$/, "");

        const cloudinaryUrl = await uploadFileToCloudinary(imageFile, "sheth-pet/products");

        if (cloudinaryUrl) {
          imageMap.set(key, cloudinaryUrl);
          imageMap.set(keyWithoutExt, cloudinaryUrl);
          console.log(`[Cloudinary] Image map: "${key}" → "${cloudinaryUrl}"`);
        } else {
          const fallbackName = imageFile.filename;
          imageMap.set(key, fallbackName);
          imageMap.set(keyWithoutExt, fallbackName);
          console.log(`[WARN] Cloudinary failed for ${key}, keeping local file: ${fallbackName}`);
        }
      });

      await Promise.all(uploadPromises);
      console.log(`[Cloudinary] Finished uploading ${imageMap.size / 2} unique images`);
    } else {
      console.log("[DEBUG] No images uploaded with bulk upload");
    }

    const workbook = XLSX.readFile(spreadsheetFile.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const products = XLSX.utils.sheet_to_json(sheet);

    if (products.length > 0) {
      console.log(`[DEBUG] First product columns found in sheet:`, Object.keys(products[0]));
      console.log(`[DEBUG] First product data:`, JSON.stringify(products[0], null, 2));
    }

    let imported = 0;
    let updated = 0;
    let failed = 0;

    for (let i = 0; i < products.length; i++) {
      const item = products[i];
      try {
        const images = {};
        const colorNames = ['Amber', 'Clear', 'Opaque White', 'Opaque Black'];

        colorNames.forEach(colorName => {
          const columnNameUnderscore = `Image_${colorName.replace(/ /g, '_')}`;
          const columnNameSpace = `Image ${colorName}`;
          const columnNameLowerUnderscore = `image_${colorName.replace(/ /g, '_').toLowerCase()}`;
          const columnNameColorFirst = `${colorName} Image`;

          const colorImageFilename =
            item[columnNameUnderscore] ||
            item[columnNameSpace] ||
            item[columnNameLowerUnderscore] ||
            item[columnNameColorFirst];

          if (colorImageFilename) {
            const lookupKey = colorImageFilename.trim().toLowerCase();
            if (imageMap.has(lookupKey)) {
              images[colorName] = imageMap.get(lookupKey);
              console.log(`[DEBUG] ✅ Found ${colorName} image for "${item.Name}": ${images[colorName]}`);
            } else {
              console.log(`[DEBUG] ❌ No ${colorName} image found for "${item.Name}" with key "${lookupKey}"`);
            }
          }
        });

        let imageFilename =
          item.Image_Filename ||
          item.ImageFilename ||
          item['Image Filename'] ||
          item.image_filename ||
          item.imageFilename ||
          item.image ||
          item.Image;

        if (imageFilename) {
          const lookupKey = imageFilename.trim().toLowerCase();
          if (imageMap.has(lookupKey)) {
            imageFilename = imageMap.get(lookupKey);
            console.log(`[DEBUG] ✅ Found single image for "${item.Name}": ${imageFilename}`);
          } else {
            console.log(`[DEBUG] ❌ No single image found for "${item.Name}" with key "${lookupKey}"`);
          }
        }

        console.log(`[DEBUG] Color images for "${item.Name}":`, images);

        let category = item.Category || item.category;
        if (category) {
          category = category.trim();
          if (category.toLowerCase() === 'preform') category = 'Preforms';
          if (category.toLowerCase() === 'preforms') category = 'Preforms';
          if (category.toLowerCase() === 'bottle') category = 'Bottles';
          if (category.toLowerCase() === 'bottles') category = 'Bottles';
          if (category.toLowerCase() === 'jar') category = 'Jars';
          if (category.toLowerCase() === 'jars') category = 'Jars';
          if (category.toLowerCase() === 'cap') category = 'Caps';
          if (category.toLowerCase() === 'caps') category = 'Caps';
        }

        let colors = item.Colors || item.colors || item.Color || item.color;
        if (colors) {
          if (typeof colors === 'string') {
            colors = colors.split(',').map(c => c.trim()).filter(c => c);
          } else if (!Array.isArray(colors)) {
            colors = [colors];
          }
        } else {
          colors = [];
        }

        const moqPackaging = {};
        if (item.MOQ_Amber) moqPackaging['Amber'] = item.MOQ_Amber;
        if (item.MOQ_Clear) moqPackaging['Clear'] = item.MOQ_Clear;
        if (item.MOQ_Opaque_White) moqPackaging['Opaque White'] = item.MOQ_Opaque_White;
        if (item.MOQ_Opaque_Black) moqPackaging['Opaque Black'] = item.MOQ_Opaque_Black;
        if (Object.keys(moqPackaging).length === 0 && (item.MOQ_Packaging || item.MOQPackaging || item['MOQ Packaging'])) {
          const oldMoq = item.MOQ_Packaging || item.MOQPackaging || item['MOQ Packaging'];
          moqPackaging.default = oldMoq;
        }

        let marketSegments = item.Market_Segments || item.marketSegments || item['Market Segments'];
        if (marketSegments) {
          if (typeof marketSegments === 'string') {
            marketSegments = marketSegments.split(',').map(seg => seg.trim()).filter(seg => seg);
          } else if (!Array.isArray(marketSegments)) {
            marketSegments = [marketSegments];
          }
        } else {
          marketSegments = [];
        }

        const volume = item.Volume || item.volume;
        const neckSize = item.Neck_Size || item.neckSize || item['Neck Size'];
        let neckProfile = item.Neck_Profile || item.neckProfile || item['Neck Profile'];
        if (neckProfile) {
          if (typeof neckProfile === 'string') {
            neckProfile = neckProfile.split(',').map(c => c.trim()).filter(c => c);
          } else if (!Array.isArray(neckProfile)) {
            neckProfile = [neckProfile];
          }
        } else {
          neckProfile = [];
        }
        const ofc = item.OFC || item.ofc;
        const height = item.Height || item.height;
        const diameter = item.Diameter || item.diameter;
        const pilfer = item.Pilfer || item.pilfer;
        const length = item.Length || item.length;
        const weight = item.Weight || item.weight;
        const capType = item.Cap_Type || item.CapType || item['Cap Type'];
        const usage = item.Usage || item.usage;
        const keySpecs = item.Key_Specs || item.KeySpecs || item['Key Specs'];
        const size = item.Size || item.size;

        const existing = item.SKU ? await Product.findOne({ sku: item.SKU }) : null;

        if (existing) {
          console.log(`[DEBUG] Updating product "${item.Name || item.name}" with:`, {
            image: imageFilename,
            images: images
          });
          await Product.findByIdAndUpdate(
            existing._id,
            {
              name: item.Name || item.name,
              category: category,
              color: colors,
              size: size,
              moqPackaging: moqPackaging,
              capType: capType,
              usage: usage,
              keySpecs: keySpecs,
              image: imageFilename,
              images: images,
              showInPopup: false,
              marketSegments: marketSegments,
              volume: volume,
              neckSize: neckSize,
              weight: weight,
              neckProfile,
              ofc,
              height,
              diameter,
              pilfer,
              length
            }
          );

          updated++;
        } else {
          const productData = {
            name: item.Name || item.name,
            category: category,
            color: colors,
            size: size,
            moqPackaging: moqPackaging,
            capType: capType,
            usage: usage,
            keySpecs: keySpecs,
            image: imageFilename,
            images: images,
            showInPopup: false,
            marketSegments: marketSegments,
            volume: volume,
            neckSize: neckSize,
            weight: weight,
            neckProfile,
            ofc,
            height,
            diameter,
            pilfer,
            length
          };

          if (item.SKU) {
            productData.sku = item.SKU;
          } else {
            const counter = await Counter.findOneAndUpdate(
              { name: "productSku" },
              { $inc: { sequence: 1 } },
              {
                returnDocument: "after",
                upsert: true,
              }
            );
            productData.sku = `SKU-${String(counter.sequence).padStart(4, "0")}`;
          }

          console.log(`[DEBUG] Creating product "${item.Name || item.name}" with:`, {
            sku: productData.sku,
            image: imageFilename,
            images: images
          });
          const createdProduct = await Product.create(productData);
          console.log(`[DEBUG] ✅ Created product with _id: ${createdProduct._id}`);
          imported++;
        }
      } catch (err) {
        failed++;
        console.log("Error:");
        console.log(err.message);
      }
    }

    return res.status(200).json({
      success: true,
      imported,
      updated,
      failed,
    });

  } catch (error) {
    console.error("Error in bulk upload:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    console.log(`[Cleanup] Cleaning up ${filesToCleanup.length} temp uploaded files...`);
    filesToCleanup.forEach(file => deleteLocalFileSafe(file));
  }
};


export const addProduct = async (req, res) => {
  try {

    console.log("[DEBUG] Request body:", req.body);
    console.log("[DEBUG] Request files:", req.files);

    const body = req.body || {};
    const {
      name,
      category,
      productType,
      color,
      moqPackaging,
      capType,
      usage,
      keySpecs,
      showInPopup,
      volume,
      neckSize,
      weight,
      neckProfile,
      ofc,
      height,
      diameter,
      pilfer,
      length
    } = body;

    let marketSegments = body.marketSegments;
    if (marketSegments) {
      if (typeof marketSegments === 'string') {
        try {
          marketSegments = JSON.parse(marketSegments);
        } catch {
          marketSegments = [marketSegments];
        }
      }
      if (!Array.isArray(marketSegments)) {
        marketSegments = [marketSegments];
      }
    } else {
      marketSegments = [];
    }

    let parsedColor = color;
    if (parsedColor) {
      if (typeof parsedColor === 'string') {
        try {
          parsedColor = JSON.parse(parsedColor);
        } catch {
          if (parsedColor.includes(',')) {
            parsedColor = parsedColor.split(',').map(c => c.trim()).filter(c => c);
          } else {
            parsedColor = [parsedColor];
          }
        }
      }
      if (!Array.isArray(parsedColor)) {
        parsedColor = [parsedColor];
      }
    } else {
      parsedColor = [];
    }

    let parsedMoq = moqPackaging;
    if (parsedMoq) {
      if (typeof parsedMoq === 'string') {
        try {
          parsedMoq = JSON.parse(parsedMoq);
        } catch {
          parsedMoq = { default: parsedMoq };
        }
      }
      if (typeof parsedMoq !== 'object' || parsedMoq === null) {
        parsedMoq = {};
      }
    } else {
      parsedMoq = {};
    }

    let parsedNeckProfile = neckProfile;
    if (parsedNeckProfile) {
      if (typeof parsedNeckProfile === 'string') {
        try {
          parsedNeckProfile = JSON.parse(parsedNeckProfile);
        } catch {
          if (parsedNeckProfile.includes(',')) {
            parsedNeckProfile = parsedNeckProfile.split(',').map(c => c.trim()).filter(c => c);
          } else {
            parsedNeckProfile = [parsedNeckProfile];
          }
        }
      }
      if (!Array.isArray(parsedNeckProfile)) {
        parsedNeckProfile = [parsedNeckProfile];
      }
    } else {
      parsedNeckProfile = [];
    }

    console.log("[DEBUG] parsedNeckProfile:", parsedNeckProfile);

    const images = {};
    let singleImage = undefined;

    if (req.files && req.files.length > 0) {
      console.log(`[Cloudinary] Uploading ${req.files.length} product images to Cloudinary...`);

      const uploadTasks = req.files.map(async (file) => {
        const cloudinaryUrl = await uploadFileToCloudinary(file, "sheth-pet/products");
        const value = cloudinaryUrl || file.filename;

        if (file.fieldname === 'image') {
          singleImage = value;
        } else if (file.fieldname.startsWith('image-')) {
          const colorName = file.fieldname.substring(6);
          images[colorName] = value;
        }
      });

      await Promise.all(uploadTasks);
      console.log("[Cloudinary] Finished uploading product images");
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const counter = await Counter.findOneAndUpdate(
      { name: "productSku" },
      { $inc: { sequence: 1 } },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    const sku = `SKU-${String(counter.sequence).padStart(4, "0")}`;

    const productData = {
      name,
      category,
      productType,
      color: parsedColor,
      moqPackaging: parsedMoq,
      capType,
      usage,
      keySpecs,
      image: singleImage,
      images,
      showInPopup: showInPopup === 'true' || showInPopup === true,
      marketSegments,
      volume,
      neckSize,
      weight,
      neckProfile: parsedNeckProfile,
      ofc,
      height,
      diameter,
      pilfer,
      length,
      sku,
    };

    console.log("[DEBUG] Creating product with data:", productData);

    const product = await Product.create(productData);

    return res.status(201).json({
      success: true,
      product,
    });

  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { category, marketSegment } = req.query;

    let query = {
      category: { $not: { $regex: /^Containers$/i } }
    };

    if (category) {
      query = { category: { $regex: new RegExp(`^${category}$`, 'i') } };
    }

    let products = await Product.find(query).sort({ createdAt: -1 });

    if (marketSegment) {
      products = products.filter(p =>
        p.marketSegments && p.marketSegments.some(seg =>
          seg.toLowerCase() === marketSegment.toLowerCase()
        )
      );
    }

    products.forEach(p => console.log(`- ${p.name}: marketSegments = ${p.marketSegments}`));
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error('Error in getProducts:', error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    let categories = await Category.find({
      name: { $not: { $regex: /^Containers$/i } }
    }).sort({ name: 1 });
    const existingCategoryNames = categories.map(cat => cat.name.toLowerCase());

    const defaultCategories = ['Bottles', 'Jars', 'Caps', 'Preforms'];
    for (const catName of defaultCategories) {
      if (!existingCategoryNames.includes(catName.toLowerCase())) {
        await Category.create({ name: catName });
      }
    }

    categories = await Category.find({
      name: { $not: { $regex: /^Containers$/i } }
    }).sort({ name: 1 });
    const categoryNames = categories.map(cat => cat.name);

    return res.status(200).json({
      success: true,
      categories: categoryNames
    });
  } catch (error) {
    console.error("Error in getCategories:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }

    const categoryName = category.trim();
    if (!categoryName) {
      return res.status(400).json({
        success: false,
        message: 'Category name cannot be empty'
      });
    }

    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${categoryName}$`, 'i') }
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category already exists'
      });
    }

    const newCategory = await Category.create({ name: categoryName });

    return res.status(200).json({
      success: true,
      category: newCategory.name,
      message: 'Category added successfully'
    });
  } catch (error) {
    console.error("Error adding category:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required"
      });
    }

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const body = req.body || {};
    const updateData = {};

    if (body.name !== undefined) updateData.name = body.name;
    if (body.sku !== undefined) updateData.sku = body.sku;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.productType !== undefined) updateData.productType = body.productType;
    if (body.capType !== undefined) updateData.capType = body.capType;
    if (body.usage !== undefined) updateData.usage = body.usage;
    if (body.keySpecs !== undefined) updateData.keySpecs = body.keySpecs;
    if (body.showInPopup !== undefined) updateData.showInPopup = body.showInPopup === 'true' || body.showInPopup === true;
    if (body.volume !== undefined) updateData.volume = body.volume;
    if (body.neckSize !== undefined) updateData.neckSize = body.neckSize;
    if (body.weight !== undefined) updateData.weight = body.weight;
    if (body.neckProfile !== undefined) {
      let parsedNeckProfile = body.neckProfile;
      if (parsedNeckProfile) {
        if (typeof parsedNeckProfile === 'string') {
          try {
            parsedNeckProfile = JSON.parse(parsedNeckProfile);
          } catch {
            if (parsedNeckProfile.includes(',')) {
              parsedNeckProfile = parsedNeckProfile.split(',').map(c => c.trim()).filter(c => c);
            } else {
              parsedNeckProfile = [parsedNeckProfile];
            }
          }
        }
        if (!Array.isArray(parsedNeckProfile)) {
          parsedNeckProfile = [parsedNeckProfile];
        }
      } else {
        parsedNeckProfile = [];
      }
      updateData.neckProfile = parsedNeckProfile;
    }
    if (body.ofc !== undefined) updateData.ofc = body.ofc;
    if (body.height !== undefined) updateData.height = body.height;
    if (body.diameter !== undefined) updateData.diameter = body.diameter;
    if (body.pilfer !== undefined) updateData.pilfer = body.pilfer;
    if (body.length !== undefined) updateData.length = body.length;

    let parsedColor;
    if (body.color !== undefined) {
      parsedColor = body.color;
      if (parsedColor) {
        if (typeof parsedColor === 'string') {
          try {
            parsedColor = JSON.parse(parsedColor);
          } catch {
            if (parsedColor.includes(',')) {
              parsedColor = parsedColor.split(',').map(c => c.trim()).filter(c => c);
            } else {
              parsedColor = [parsedColor];
            }
          }
        }
        if (!Array.isArray(parsedColor)) {
          parsedColor = [parsedColor];
        }
      } else {
        parsedColor = [];
      }
      updateData.color = parsedColor;
    } else {
      parsedColor = existingProduct.color;
    }

    if (body.moqPackaging !== undefined) {
      let parsedMoq = body.moqPackaging;
      if (parsedMoq) {
        if (typeof parsedMoq === 'string') {
          try {
            parsedMoq = JSON.parse(parsedMoq);
          } catch {
            parsedMoq = { default: parsedMoq };
          }
        }
        if (typeof parsedMoq !== 'object' || parsedMoq === null) {
          parsedMoq = {};
        }
      } else {
        parsedMoq = {};
      }
      const filteredMoq = {};
      Object.entries(parsedMoq).forEach(([colorEntry, value]) => {
        if (parsedColor.includes(colorEntry)) {
          filteredMoq[colorEntry] = value;
        }
      });
      updateData.moqPackaging = filteredMoq;
    }

    if (body.marketSegments !== undefined) {
      let marketSegments = body.marketSegments;
      if (marketSegments) {
        if (typeof marketSegments === 'string') {
          try {
            marketSegments = JSON.parse(marketSegments);
          } catch {
            marketSegments = [marketSegments];
          }
        }
        if (!Array.isArray(marketSegments)) {
          marketSegments = [marketSegments];
        }
      } else {
        marketSegments = [];
      }
      updateData.marketSegments = marketSegments;
    }

    let updatedImages = { ...(existingProduct.images || {}) };
    let singleImage = existingProduct.image;

    if (req.files && req.files.length > 0) {
      console.log(`[Cloudinary] Uploading ${req.files.length} updated product images to Cloudinary...`);

      const uploadTasks = req.files.map(async (file) => {
        const cloudinaryUrl = await uploadFileToCloudinary(file, "sheth-pet/products");
        const value = cloudinaryUrl || file.filename;

        if (file.fieldname === 'image') {
          singleImage = value;
        } else if (file.fieldname.startsWith('image-')) {
          const colorName = file.fieldname.substring(6);
          updatedImages[colorName] = value;
        }
      });

      await Promise.all(uploadTasks);
      console.log("[Cloudinary] Finished uploading updated product images");
    }

    const filteredImages = {};
    Object.entries(updatedImages).forEach(([colorEntry, filename]) => {
      if (parsedColor.includes(colorEntry)) {
        filteredImages[colorEntry] = filename;
      }
    });
    updateData.images = filteredImages;
    if (singleImage) {
      updateData.image = singleImage;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      product: updatedProduct,
      message: "Product updated successfully"
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required"
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getNeckSizes = async (req, res) => {
  try {
    const products = await Product.find({}, 'neckSize');
    const neckSizes = [...new Set(products.map(p => p.neckSize).filter(ns => ns))];
    return res.status(200).json({
      success: true,
      neckSizes: neckSizes.sort()
    });
  } catch (error) {
    console.error("Error in getNeckSizes:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
