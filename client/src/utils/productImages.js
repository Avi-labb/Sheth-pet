
export const isRemoteUrl = (url) => {
  if (!url || typeof url !== 'string') return false
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')
}

export const resolveImageUrl = (value) => {
  if (!value) return null
  if (typeof value !== 'string') return null
  if (isRemoteUrl(value)) return value
  return `/uploads/${value}`
}

export const getAllProductImages = (product) => {
  if (product.images && Object.keys(product.images).length > 0) {
    return Object.entries(product.images).map(([color, file]) => ({
      color,
      src: resolveImageUrl(file)
    }))
  }
  if (product.image) {
    return [{
      src: resolveImageUrl(product.image)
    }]
  }
  return []
}

export const getProductImage = (product, color = null) => {
  if (color && product.images) {
    if (product.images[color]) {
      return resolveImageUrl(product.images[color])
    }
    const colorLower = color.toLowerCase()
    const matchingKey = Object.keys(product.images).find(key => key.toLowerCase() === colorLower)
    if (matchingKey) {
      return resolveImageUrl(product.images[matchingKey])
    }
  }
  if (product.images && Object.keys(product.images).length > 0) {
    const firstKey = Object.keys(product.images)[0]
    return resolveImageUrl(product.images[firstKey])
  }
  if (product.image) {
    return resolveImageUrl(product.image)
  }
  return null
}

export const getProductColors = (product) => {
  if (product.images && Object.keys(product.images).length > 0) {
    return Object.keys(product.images)
  }
  return Array.isArray(product.color) ? product.color : (product.color ? [product.color] : [])
}
