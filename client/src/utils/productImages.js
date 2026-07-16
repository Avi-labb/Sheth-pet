
/**
 * Get all product images with their color variants
 * @param {Object} product - Product object
 * @returns {Array} Array of image objects with color and src properties
 */
export const getAllProductImages = (product) => {
  if (product.images && Object.keys(product.images).length > 0) {
    return Object.entries(product.images).map(([color, file]) => ({
      color,
      src: `/uploads/${file}`
    }))
  }
  if (product.image) {
    return [{
      src: `/uploads/${product.image}`
    }]
  }
  return []
}

/**
 * Get a single product image URL
 * @param {Object} product - Product object
 * @param {string} color - Optional color variant
 * @returns {string|null} Image URL or null
 */
export const getProductImage = (product, color = null) => {
  if (color && product.images) {
    if (product.images[color]) {
      return `/uploads/${product.images[color]}`
    }
    const colorLower = color.toLowerCase()
    const matchingKey = Object.keys(product.images).find(key => key.toLowerCase() === colorLower)
    if (matchingKey) {
      return `/uploads/${product.images[matchingKey]}`
    }
  }
  if (product.images && Object.keys(product.images).length > 0) {
    const firstKey = Object.keys(product.images)[0]
    return `/uploads/${product.images[firstKey]}`
  }
  if (product.image) {
    return `/uploads/${product.image}`
  }
  return null
}

/**
 * Get available product colors
 * @param {Object} product - Product object
 * @returns {Array} Array of color strings
 */
export const getProductColors = (product) => {
  if (product.images && Object.keys(product.images).length > 0) {
    return Object.keys(product.images)
  }
  return Array.isArray(product.color) ? product.color : (product.color ? [product.color] : [])
}
