import express from 'express'
import upload from '../middleware/upload.js'
import { debugBulkUpload } from '../debug-bulk-upload-route.js'
import { addProduct, bulkUploadProducts, getProducts, getCategories, addCategory, updateProduct, deleteProduct } from '../controllers/productController.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router= express.Router()

router.get('/test-route', (req, res) => {
  console.log("Test route called!");
  res.json({ test: true, message: "Product router test route working!" });
})

// Debug route to check all files in uploads
router.get('/uploads-check', (req, res) => {
  const uploadsDir = path.join(__dirname, '../uploads')
  try {
    const files = fs.readdirSync(uploadsDir)
    res.json({ success: true, uploads: files })
  } catch (err) {
    res.json({ success: false, error: err.message })
  }
})

router.get('/categories', getCategories)
router.post('/add-category', addCategory)
router.get('/', getProducts)
router.post('/bulk-upload', debugBulkUpload, upload.fields([{ name: 'file', maxCount: 1 }, { name: 'images', maxCount: 100 }]), bulkUploadProducts)
// Use upload.any() to accept any image fields for flexibility
router.post('/add-product', upload.any(), addProduct)
router.put('/update-product/:id', upload.any(), updateProduct)
router.post('/update-product/:id', upload.any(), updateProduct)
router.delete('/delete-product/:id', deleteProduct)

export default router