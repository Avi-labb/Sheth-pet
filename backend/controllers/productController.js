import XLSX from "xlsx";
import Product from "../models/productModule.js";
import Category from "../models/categoryModel.js";
import Counter from "../models/counterModel.js";

export const bulkUploadProducts = async (req, res) => {
  try {
    console.log('[DEBUG] bulkUploadProducts function started!');
    
    // Check if spreadsheet file is present
    if (!req.files || !req.files['file'] || req.files['file'].length === 0) {
      console.log('[DEBUG] ERROR: No spreadsheet file found in req.files');
      return res.status(400).json({
        success: false,
        message: "Please upload a CSV or Excel file",
      });
    }

    const spreadsheetFile = req.files['file'][0];
    console.log(`[DEBUG] Spreadsheet file received: ${spreadsheetFile.originalname}, stored as: ${spreadsheetFile.filename}`);
    
    // Create a map of image filenames to their stored filenames (case-insensitive!)
    const imageMap = new Map();
    if (req.files['images'] && req.files['images'].length > 0) {
      console.log(`[DEBUG] Received ${req.files['images'].length} image files`);
      req.files['images'].forEach((imageFile, i) => {
        // Use lowercase trimmed original filename as key, stored filename as value
        const key = imageFile.originalname.trim().toLowerCase();
        imageMap.set(key, imageFile.filename);
        console.log(`[DEBUG] Image [${i}] - Original: "${imageFile.originalname}" → Key: "${key}" → Stored as: "${imageFile.filename}"`);
      });
    } else {
      console.log('[DEBUG] No image files received');
    }

    console.log('[DEBUG] Reading spreadsheet file...');
    const workbook = XLSX.readFile(spreadsheetFile.path);
    const sheetName = workbook.SheetNames[0];
    console.log(`[DEBUG] Using first sheet: "${sheetName}"`);
    const sheet = workbook.Sheets[sheetName];
    const products = XLSX.utils.sheet_to_json(sheet);
    
    console.log(`[DEBUG] Found ${products.length} products in spreadsheet`);
    console.log('[DEBUG] Product data from Excel:', JSON.stringify(products, null, 2));

    let imported = 0;
    let updated = 0;
    let failed = 0;

    for (let i = 0; i < products.length; i++) {
      const item = products[i];
      try {
        console.log(`\n[DEBUG] Processing product ${i+1}/${products.length}:`, item);
        
        // Determine color-specific image filenames
        console.log(`[DEBUG] Checking ALL keys in CSV row for image columns:`, Object.keys(item));
        
        // Process each color's image
        const images = {};
        const colorNames = ['Amber', 'Clear', 'Opaque White', 'Opaque Black'];
        
        colorNames.forEach(colorName => {
          // Convert color name to column name (e.g., "Opaque White" → "Image_Opaque_White")
          const columnName = `Image_${colorName.replace(/ /g, '_')}`;
          
          // Check for the column in various formats
          const colorImageFilename = 
            item[columnName] || 
            item[`Image ${colorName}`] || 
            item[`image_${colorName.toLowerCase()}`];
          
          if (colorImageFilename) {
            const lookupKey = colorImageFilename.trim().toLowerCase();
            if (imageMap.has(lookupKey)) {
              images[colorName] = imageMap.get(lookupKey);
              console.log(`[DEBUG] ✅ Found matching ${colorName} image for "${item.Name}": ${images[colorName]}`);
            } else {
              console.log(`[DEBUG] ❌ ${colorName} image NOT found for "${item.Name}"`);
            }
          }
        });
        
        // Also check for single image (backward compatibility)
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
          }
        }
        
        // Normalize category to match our standard categories
        let category = item.Category || item.category;
        if (category) {
          category = category.trim();
          // Map common variations to our standard categories
          if (category.toLowerCase() === 'preform') category = 'Preforms';
          if (category.toLowerCase() === 'preforms') category = 'Preforms';
          if (category.toLowerCase() === 'bottle') category = 'Bottles';
          if (category.toLowerCase() === 'bottles') category = 'Bottles';
          if (category.toLowerCase() === 'jar') category = 'Jars';
          if (category.toLowerCase() === 'jars') category = 'Jars';
          if (category.toLowerCase() === 'cap') category = 'Caps';
          if (category.toLowerCase() === 'caps') category = 'Caps';
          if (category.toLowerCase() === 'container') category = 'Containers';
          if (category.toLowerCase() === 'containers') category = 'Containers';
        }

        // Parse colors: comma-separated string → array
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
        console.log(`[DEBUG] Parsed colors:`, colors);

        // Parse MOQ per color into an object
        const moqPackaging = {};
        if (item.MOQ_Amber) moqPackaging['Amber'] = item.MOQ_Amber;
        if (item.MOQ_Clear) moqPackaging['Clear'] = item.MOQ_Clear;
        if (item.MOQ_Opaque_White) moqPackaging['Opaque White'] = item.MOQ_Opaque_White;
        if (item.MOQ_Opaque_Black) moqPackaging['Opaque Black'] = item.MOQ_Opaque_Black;
        // Backward compatibility: if old MOQ_Packaging is provided and no per-color MOQs
        if (Object.keys(moqPackaging).length === 0 && (item.MOQ_Packaging || item.MOQPackaging || item['MOQ Packaging'])) {
          const oldMoq = item.MOQ_Packaging || item.MOQPackaging || item['MOQ Packaging'];
          moqPackaging.default = oldMoq;
        }
        console.log(`[DEBUG] Parsed moqPackaging:`, moqPackaging);

        // Parse market segments: comma-separated string → array
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
        console.log(`[DEBUG] Parsed marketSegments:`, marketSegments);

        // Parse other fields
        const volume = item.Volume || item.volume;
        const neckSize = item.Neck_Size || item.neckSize || item['Neck Size'];
        const neckProfile = item.Neck_Profile || item.neckProfile || item['Neck Profile'];
        const ofc = item.OFC || item.ofc;
        const height = item.Height || item.height;
        const diameter = item.Diameter || item.diameter;
        const pilfer = item.Pilfer || item.pilfer;
        const length = item.Length || item.length;
        const weight = item.Weight || item.weight;
        const capType = item.Cap_Type || item.CapType || item['Cap Type'];
        const usage = item.Usage || item.usage;
        const keySpecs = item.Key_Specs || item.KeySpecs || item['Key Specs'];
        // Keep size for backward compatibility
        const size = item.Size || item.size;
        
        const existing = item.SKU ? await Product.findOne({ sku: item.SKU }) : null;

        if (existing) {
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
          console.log(`Updated product: ${item.Name}`);
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
          
          // Add SKU if provided, otherwise generate one
          if (item.SKU) {
            productData.sku = item.SKU;
          } else {
            // Generate SKU
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
          
          const createdProduct = await Product.create(productData);
          imported++;
          console.log(`Created product: ${item.Name} (Category: ${category})`);
          console.log('Product data:', createdProduct);
        }
      } catch (err) {
        failed++;
        console.log("Failed Product:");
        console.log(item);
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
  }
};


export const addProduct = async (req, res) => {
  try {
    console.log("Request received at addProduct");
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

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

    // Handle marketSegments - can be array or single value from FormData
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

    // Handle color - can be array, JSON string, or single value from FormData
    let parsedColor = color;
    if (parsedColor) {
      if (typeof parsedColor === 'string') {
        try {
          parsedColor = JSON.parse(parsedColor);
        } catch {
          // If not JSON, check if comma-separated
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

    // Handle moqPackaging - can be object, JSON string, or single value
    let parsedMoq = moqPackaging;
    if (parsedMoq) {
      if (typeof parsedMoq === 'string') {
        try {
          parsedMoq = JSON.parse(parsedMoq);
        } catch {
          // If not JSON, treat as single value
          parsedMoq = { default: parsedMoq };
        }
      }
      if (typeof parsedMoq !== 'object' || parsedMoq === null) {
        parsedMoq = {};
      }
    } else {
      parsedMoq = {};
    }

    console.log("Parsed color:", parsedColor);
    console.log("Parsed moqPackaging:", parsedMoq);

    // Process images: { color: filename }
    const images = {};
    let singleImage = undefined;
    if (req.files) {
      req.files.forEach(file => {
        console.log("Processing file:", file.fieldname);
        if (file.fieldname === 'image') {
          singleImage = file.filename;
        } else if (file.fieldname.startsWith('image-')) {
          const colorName = file.fieldname.substring(6); // Remove 'image-' prefix
          images[colorName] = file.filename;
        }
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    // Generate SKU
    const counter = await Counter.findOneAndUpdate(
      { name: "productSku" },
      { $inc: { sequence: 1 } },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    const sku = `SKU-${String(counter.sequence).padStart(4, "0")}`;

    const product = await Product.create({
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
      neckProfile,
      ofc,
      height,
      diameter,
      pilfer,
      length,
      sku,
    });

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
    console.log('getProducts called with:', { category, marketSegment });
    let products = await Product.find().sort({ createdAt: -1 });
    
    if (category) {
      products = products.filter(p => 
        p.category && p.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (marketSegment) {
      products = products.filter(p => 
        p.marketSegments && p.marketSegments.some(seg => 
          seg.toLowerCase() === marketSegment.toLowerCase()
        )
      );
    }
    
    console.log(`Filtered to ${products.length} products`);
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
    console.log("getCategories called!");
    // First try to get from Category model
    let categories = await Category.find().sort({ name: 1 });
    console.log("Current categories in DB:", categories);
    const existingCategoryNames = categories.map(cat => cat.name.toLowerCase());
    console.log("Existing category names (lowercase):", existingCategoryNames);

    // Check if all default categories exist, create any missing ones
    const defaultCategories = ['Bottles', 'Jars', 'Caps', 'Preforms'];
    for (const catName of defaultCategories) {
      if (!existingCategoryNames.includes(catName.toLowerCase())) {
        console.log("Creating missing category:", catName);
        await Category.create({ name: catName });
      }
    }

    // Get updated categories
    categories = await Category.find().sort({ name: 1 });
    const categoryNames = categories.map(cat => cat.name);
    console.log("Final categories found:", categoryNames);

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

    // Check if category already exists
    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${categoryName}$`, 'i') }
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category already exists'
      });
    }

    // Create new category
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
    console.log("Request received at updateProduct");
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);
    console.log("req.params:", req.params);

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required"
      });
    }

    // First get the existing product to merge images
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const body = req.body || {};
    const updateData = {};

    // Only update fields that are provided
    if (body.name !== undefined) updateData.name = body.name;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.productType !== undefined) updateData.productType = body.productType;
    if (body.capType !== undefined) updateData.capType = body.capType;
    if (body.usage !== undefined) updateData.usage = body.usage;
    if (body.keySpecs !== undefined) updateData.keySpecs = body.keySpecs;
    if (body.showInPopup !== undefined) updateData.showInPopup = body.showInPopup === 'true' || body.showInPopup === true;
    if (body.volume !== undefined) updateData.volume = body.volume;
    if (body.neckSize !== undefined) updateData.neckSize = body.neckSize;
    if (body.weight !== undefined) updateData.weight = body.weight;
    // New fields
    if (body.neckProfile !== undefined) updateData.neckProfile = body.neckProfile;
    if (body.ofc !== undefined) updateData.ofc = body.ofc;
    if (body.height !== undefined) updateData.height = body.height;
    if (body.diameter !== undefined) updateData.diameter = body.diameter;
    if (body.pilfer !== undefined) updateData.pilfer = body.pilfer;
    if (body.length !== undefined) updateData.length = body.length;
    
    // Handle color - can be array, JSON string, or single value from FormData
    if (body.color !== undefined) {
      let parsedColor = body.color;
      if (parsedColor) {
        if (typeof parsedColor === 'string') {
          try {
            parsedColor = JSON.parse(parsedColor);
          } catch {
            // If not JSON, check if comma-separated
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
      console.log("Parsed update color:", parsedColor);
    }
    
    // Handle moqPackaging - can be object, JSON string, or single value
    if (body.moqPackaging !== undefined) {
      let parsedMoq = body.moqPackaging;
      if (parsedMoq) {
        if (typeof parsedMoq === 'string') {
          try {
            parsedMoq = JSON.parse(parsedMoq);
          } catch {
            // If not JSON, treat as single value
            parsedMoq = { default: parsedMoq };
          }
        }
        if (typeof parsedMoq !== 'object' || parsedMoq === null) {
          parsedMoq = {};
        }
      } else {
        parsedMoq = {};
      }
      updateData.moqPackaging = parsedMoq;
      console.log("Parsed update moqPackaging:", parsedMoq);
    }
    
    // Handle marketSegments
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
    
    // Process images: update only the images that are uploaded, keep existing ones
    let updatedImages = { ...(existingProduct.images || {}) };
    let singleImage = existingProduct.image;
    if (req.files) {
      req.files.forEach(file => {
        console.log("Processing update file:", file.fieldname);
        if (file.fieldname === 'image') {
          singleImage = file.filename;
        } else if (file.fieldname.startsWith('image-')) {
          const colorName = file.fieldname.substring(6); // Remove 'image-' prefix
          updatedImages[colorName] = file.filename;
        }
      });
    }
    if (Object.keys(updatedImages).length > 0) {
      updateData.images = updatedImages;
    }
    if (singleImage) {
      updateData.image = singleImage;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
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