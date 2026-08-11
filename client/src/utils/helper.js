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

export const filterProductsBySearch = (productsList, searchQuery) => {
  if (!searchQuery || !searchQuery.trim()) return productsList;
  const q = searchQuery.toLowerCase().trim();
  return productsList.filter(p => {
    if (!p) return false;
    const nameMatch = p.name && String(p.name).toLowerCase().includes(q);
    const skuMatch = p.sku && String(p.sku).toLowerCase().includes(q);
    const categoryMatch = p.category && String(p.category).toLowerCase().includes(q);
    const usageMatch = p.usage && String(p.usage).toLowerCase().includes(q);
    const keySpecsMatch = p.keySpecs && String(p.keySpecs).toLowerCase().includes(q);
    const volumeMatch = p.volume && String(p.volume).toLowerCase().includes(q);
    const neckSizeMatch = p.neckSize && String(p.neckSize).toLowerCase().includes(q);
    const capTypeMatch = p.capType && String(p.capType).toLowerCase().includes(q);
    const sizeMatch = p.size && String(p.size).toLowerCase().includes(q);
    const marketSegmentsMatch = Array.isArray(p.marketSegments) && p.marketSegments.some(s => String(s).toLowerCase().includes(q));
    const colorsMatch = Array.isArray(p.color) && p.color.some(c => String(c).toLowerCase().includes(q));
    const weightMatch = p.weight && String(p.weight).toLowerCase().includes(q);
    const heightMatch = p.height && String(p.height).toLowerCase().includes(q);
    const diameterMatch = p.diameter && String(p.diameter).toLowerCase().includes(q);
    const lengthMatch = p.length && String(p.length).toLowerCase().includes(q);
    return nameMatch || skuMatch || categoryMatch || usageMatch || keySpecsMatch || volumeMatch || neckSizeMatch || capTypeMatch || sizeMatch || marketSegmentsMatch || colorsMatch || weightMatch || heightMatch || diameterMatch || lengthMatch;
  });
};