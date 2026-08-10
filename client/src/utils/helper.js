export const isFamilyProduct = (product) => {
  if (!product) return false;
  if (product.capType && product.capType.toLowerCase() === 'family') return true;
  const colors = Array.isArray(product.color) ? product.color : [];
  return colors.some(c => typeof c === 'string' && c.toLowerCase().includes('family'));
};

export const sortFamilyFirst = (productsList) => {
  return [...productsList].sort((a, b) => {
    const aFamily = isFamilyProduct(a) ? 0 : 1;
    const bFamily = isFamilyProduct(b) ? 0 : 1;
    if (aFamily !== bFamily) return aFamily - bFamily;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};