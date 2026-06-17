import express from 'express'
import upload from '../middleware/upload.js'
import { addProduct, bulkUploadProducts, getProducts, getCategories, addCategory } from '../controllers/productController.js'

const router= express.Router()

router.get('/test-route', (req, res) => {
  console.log("Test route called!");
  res.json({ test: true, message: "Product router test route working!" });
})

router.get('/categories', getCategories)
router.post('/add-category', addCategory)
router.get('/', getProducts)
router.post('/bulk-upload', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'images', maxCount: 100 }]), bulkUploadProducts)
router.post('/add-product', upload.single('image'), addProduct)

export default router