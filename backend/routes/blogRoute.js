import express from 'express'
import upload from '../middleware/upload.js'
import { createBlog, getBlogs, getBlog, updateBlog, deleteBlog } from '../controllers/blogController.js'

const router = express.Router()

router.get('/', getBlogs)
router.get('/:id', getBlog)
router.post('/create', upload.single('image'), createBlog)
router.put('/update/:id', upload.single('image'), updateBlog)
router.delete('/delete/:id', deleteBlog)

export default router
