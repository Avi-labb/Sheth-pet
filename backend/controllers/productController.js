import XLSX from "xlsx";
import Product from "../models/productModule.js";
import Category from "../models/categoryModel.js";

export const bulkUploadProducts = async (req,res) => {
  try {
    // Check if spreadsheet file is present
    if (!req.files || !req.files['file'] || req.files['file'].length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload a CSV or Excel file",
      });
    }

    const spreadsheetFile = req.files['file'][0];
    
    // Create a map of image filenames to their stored filenames
    const imageMap = new Map();
    if (req.files['images'] && req.files['images'].length > 0) {
      req.files['images'].forEach(imageFile => {
        // Use original filename as key, stored filename as value
        imageMap.set(imageFile.originalname, imageFile.filename);
      });
    }

    const workbook = XLSX.readFile(
      spreadsheetFile.path
    );

    const sheet =
      workbook.Sheets[
        workbook.SheetNames[0]
      ];

    const products =
      XLSX.utils.sheet_to_json(sheet);

    let imported = 0;
    let updated = 0;
    let failed = 0;

    for (const item of products) {
      try {
        // Determine the image filename
        let imageFilename = item.Image_Filename;
        if (imageFilename && imageMap.has(imageFilename)) {
          imageFilename = imageMap.get(imageFilename);
        }
        
        const existing =
          await Product.findOne({
            sku: item.SKU,
          });

        if (existing) {
          await Product.findByIdAndUpdate(
            existing._id,
            {
              name: item.Name,
              category: item.Category,
              color: item.Color,
              size: item.Size,
              moqPackaging:item.MOQ_Packaging,
              capType: item.Cap_Type,
              usage: item.Usage,
              keySpecs: item.Key_Specs,
              image: imageFilename,
            }
          );

          updated++;
        } else {
          await Product.create({
            name: item.Name,
            sku: item.SKU,
            category: item.Category,
            color: item.Color,
            size: item.Size,
            moqPackaging:item.MOQ_Packaging,
            capType: item.Cap_Type,
            usage: item.Usage,
            keySpecs: item.Key_Specs,
            image: imageFilename,
          });

          imported++;
        }
      } catch {
        failed++;
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
    console.log("req.file:", req.file);

    const body = req.body || {};
    const {
      name,
      sku,
      category,
      color,
      size,
      moqPackaging,
      capType,
      usage,
      keySpecs,
    } = body;

    if (!name || !sku) {
      return res.status(400).json({
        success: false,
        message: "Name and SKU are required",
      });
    }

    const exists = await Product.findOne({ sku });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "SKU already exists",
      });
    }

    const product = await Product.create({
      name,
      sku,
      category,
      color,
      size,
      moqPackaging,
      capType,
      usage,
      keySpecs,
      image: req.file ? req.file.filename : undefined,
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
    const { category } = req.query;
    const filter = category ? { category: { $regex: new RegExp(`^${category}$`, 'i') } } : {};
    const products = await Product.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
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
    const defaultCategories = ['Bottles', 'Jars', 'Caps', 'Containers'];
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