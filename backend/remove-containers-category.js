import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Category from './models/categoryModel.js'

dotenv.config()

const removeContainersCategory = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')

    // Find and delete "Containers" category (case insensitive)
    const result = await Category.deleteMany({ 
      name: { $regex: /^Containers$/i } 
    })

    if (result.deletedCount > 0) {
      console.log(`✅ Successfully deleted ${result.deletedCount} Containers category(ies)`)
    } else {
      console.log('ℹ️ No Containers category found in the database')
    }

    // Show remaining categories
    const remainingCategories = await Category.find().sort({ name: 1 })
    console.log('\nRemaining categories:')
    remainingCategories.forEach(cat => console.log(`- ${cat.name}`))

    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    await mongoose.disconnect()
    process.exit(1)
  }
}

removeContainersCategory()
