import { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';
import { productAPI } from '../../services/api';

export default function SingleUpload({
  newProduct,
  setNewProduct,
  handleAddProduct,
  newCategory,
  setNewCategory,
  addingCategory,
  setAddingCategory,
  categories,
  fetchCategories,
  imagePreviews,
  setImagePreviews
}) {
  const [newColorInput, setNewColorInput] = useState('');
  const neckSizes = ['19mm', '22mm', '24mm', '25mm', '28mm', '30mm', '38mm', '46mm', '53mm', '60mm', '63mm','69mm', '73mm', '83mm', '96mm', '120mm'];

  // Handle color-specific image changes
  const handleColorImageChange = (colorName, e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct(prev => ({
        ...prev,
        images: {
          ...prev.images,
          [colorName]: file
        }
      }));
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreviews(prev => ({
          ...prev,
          [colorName]: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to get color spec value for a field (fallback to root-level value)
  const getColorSpecValue = (colorName, field) => {
    if (newProduct.colorSpecs && newProduct.colorSpecs[colorName] && newProduct.colorSpecs[colorName][field] !== undefined) {
      return newProduct.colorSpecs[colorName][field];
    }
    return '';
  };

  // Helper to set color spec value for a field
  const setColorSpecValue = (colorName, field, value) => {
    setNewProduct(prev => {
      const currentColorSpecs = prev.colorSpecs || {};
      const currentColorEntry = currentColorSpecs[colorName] || {};
      return {
        ...prev,
        colorSpecs: {
          ...currentColorSpecs,
          [colorName]: {
            ...currentColorEntry,
            [field]: value
          }
        }
      };
    });
  };

  // Helper to get color neckProfile array
  const getColorNeckProfile = (colorName) => {
    if (newProduct.colorSpecs && newProduct.colorSpecs[colorName] && newProduct.colorSpecs[colorName].neckProfile) {
      return Array.isArray(newProduct.colorSpecs[colorName].neckProfile)
        ? newProduct.colorSpecs[colorName].neckProfile
        : [newProduct.colorSpecs[colorName].neckProfile];
    }
    return [];
  };

  // Helper to toggle color neckProfile entry
  const toggleColorNeckProfile = (colorName, profile, isChecked) => {
    setNewProduct(prev => {
      const currentColorSpecs = prev.colorSpecs || {};
      const currentColorEntry = currentColorSpecs[colorName] || {};
      let currentProfiles = getColorNeckProfile(colorName);

      if (isChecked && !currentProfiles.includes(profile)) {
        currentProfiles = [...currentProfiles, profile];
      } else if (!isChecked) {
        currentProfiles = currentProfiles.filter((p) => p !== profile);
      }

      return {
        ...prev,
        colorSpecs: {
          ...currentColorSpecs,
          [colorName]: {
            ...currentColorEntry,
            neckProfile: currentProfiles
          }
        }
      };
    });
  };

  return (
    <motion.div
      key="new-product"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto md:mx-0 space-y-8"
    >
      <div className="border-b border-neutral-900 pb-5">
        <span className="text-[13px] font-bold tracking-[0.3em] text-red-500 uppercase block mb-1.5">Product Setup</span>
        <h2 className="text-xl sm:text-2xl text-white tracking-tight font-light" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Add New Product
        </h2>
      </div>

      <form onSubmit={handleAddProduct} className="bg-neutral-950 border border-neutral-900 p-5 sm:p-8 rounded-2xl space-y-5 shadow-xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Product Name</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
              className="w-full bg-[#050506] border border-neutral-600 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-400 outline-none focus:border-neutral-500 transition-colors"
              placeholder="Name..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">SKU <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={newProduct.sku}
              onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
              required
              className="w-full bg-[#050506] border border-neutral-600 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-400 outline-none focus:border-neutral-500 transition-colors"
              placeholder="Enter SKU manually (e.g. PET-JAR-001)"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Category</label>
            </div>
            {addingCategory ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter category name"
                  className="flex-1 bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (newCategory.trim()) {
                        const result = await productAPI.addCategory(newCategory.trim());
                        if (result.ok) {
                          await fetchCategories(); // Fetch updated categories
                          setNewProduct({ ...newProduct, category: newCategory.trim() });
                          setNewCategory('');
                          setAddingCategory(false);
                        } else {
                          alert(result.data.message || 'Failed to add category');
                        }
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={async () => {
                    if (newCategory.trim()) {
                      const result = await productAPI.addCategory(newCategory.trim());
                      if (result.ok) {
                        await fetchCategories(); // Fetch updated categories
                        setNewProduct({ ...newProduct, category: newCategory.trim() });
                        setNewCategory('');
                        setAddingCategory(false);
                      } else {
                        alert(result.data.message || 'Failed to add category');
                      }
                    }
                  }}
                  className="px-4 py-3 bg-yellow-600 text-white rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-red-700 transition-colors"
                >
                  Add
                </button>
              </div>
            ) : (
              <div className="relative">
                <select
                  value={newProduct.category}
                  onChange={(e) => {
                    console.log("Single Upload Category changed:", e.target.value);
                    setNewProduct({ ...newProduct, category: e.target.value });
                  }}
                  className="w-full bg-[#050506] border border-neutral-800 uppercase rounded-xl px-4 py-3 pr-10 text-xs text-neutral-200 outline-none focus:border-neutral-700 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-neutral-600">
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {/* Custom dropdown arrow to match appearance-none */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            )}
          </div>


          <div className="space-y-2">
            <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">
              Cap Type
            </label>
            <div className="flex items-center gap-6 h-[46px] px-1">
              <label className="flex items-center gap-2 text-md text-neutral-200 cursor-pointer select-none">
                <input
                  type="radio"
                  name="capType"
                  value="individual"
                  checked={newProduct.capType === "individual"}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, capType: e.target.value })
                  }
                  className="accent-blue-600 cursor-pointer"
                />
                Individual
              </label>

              <label className="flex items-center gap-2 text-md text-neutral-200 cursor-pointer select-none">
                <input
                  type="radio"
                  name="capType"
                  value="family"
                  checked={newProduct.capType === "family"}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, capType: e.target.value })
                  }
                  className="accent-blue-600 cursor-pointer"
                />
                Family
              </label>
            </div>
          </div>
        </div>

        {/* Market Segments Checkboxes */}
        <div className="space-y-2">
          <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Market Segments</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {['Pharmaceutical', 'Personal Care', 'Food & Beverages', 'Home Care', 'Industrial'].map((segment) => (
              <label key={segment} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newProduct.marketSegments.includes(segment)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setNewProduct({
                      ...newProduct,
                      marketSegments: isChecked
                        ? [...newProduct.marketSegments, segment]
                        : newProduct.marketSegments.filter((s) => s !== segment)
                    });
                  }}
                  className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-sm text-neutral-400">{segment}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="space-y-3">
          <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">
            Color Designation
          </label>

          {/* Add custom color */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newColorInput}
              onChange={(e) => setNewColorInput(e.target.value)}
              placeholder="Enter color name (e.g., Sky Blue)"
              className="flex-1 bg-[#050506] border border-neutral-700 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-600 transition-colors"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const trimmedColor = newColorInput.trim();
                  if (trimmedColor && !newProduct.color.includes(trimmedColor)) {
                    setNewProduct({
                      ...newProduct,
                      color: [...newProduct.color, trimmedColor]
                    });
                    setNewColorInput('');
                  }
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                const trimmedColor = newColorInput.trim();
                if (trimmedColor && !newProduct.color.includes(trimmedColor)) {
                  setNewProduct({
                    ...newProduct,
                    color: [...newProduct.color, trimmedColor]
                  });
                  setNewColorInput('');
                }
              }}
              className="px-4 py-3 bg-red-600 text-white rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-red-700 transition-colors"
            >
              Add
            </button>
          </div>

          {/* Selected colors list */}
          {newProduct.color.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {newProduct.color.map((color) => (
                <div
                  key={color}
                  className="flex items-center justify-between gap-2 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2"
                >
                  <span className="text-sm text-neutral-200 truncate">{color}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedColors = newProduct.color.filter(c => c !== color);
                      const updatedMoq = { ...newProduct.moqPackaging };
                      delete updatedMoq[color];
                      const updatedImages = { ...newProduct.images };
                      delete updatedImages[color];
                      const updatedColorSpecs = { ...newProduct.colorSpecs };
                      delete updatedColorSpecs[color];
                      const updatedPreviews = { ...imagePreviews };
                      delete updatedPreviews[color];
                      
                      setNewProduct({
                        ...newProduct,
                        color: updatedColors,
                        moqPackaging: updatedMoq,
                        images: updatedImages,
                        colorSpecs: updatedColorSpecs
                      });
                      setImagePreviews(updatedPreviews);
                    }}
                    className="text-neutral-500 hover:text-red-500 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Per-Color MOQ Fields */}
        {newProduct.color.length > 0 && (
          <div className="space-y-3">
            <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">
              MOQ Packaging (Per Color)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {newProduct.color.map((color) => (
                <div key={color} className="space-y-1">
                  <label className="text-xs text-neutral-500 font-mono uppercase">{color}</label>
                  <input
                    type="text"
                    value={newProduct.moqPackaging[color] || ''}
                    onChange={(e) => setNewProduct({
                      ...newProduct,
                      moqPackaging: {
                        ...newProduct.moqPackaging,
                        [color]: e.target.value
                      }
                    })}
                    className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-400 outline-none focus:border-neutral-600 transition-colors"
                    placeholder="1000 units"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Per-Color Image Fields */}
        {newProduct.color.length > 0 && (
          <div className="space-y-3">
            <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">
              Product Images (Per Color)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {newProduct.color.map((color) => (
                <div key={color} className="space-y-2">
                  <label className="text-xs text-neutral-500 font-mono uppercase">{color}</label>
                  <div
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = (e) => handleColorImageChange(color, e);
                      input.click();
                    }}
                    className="border-2 border-dashed border-neutral-700 hover:border-neutral-600 bg-neutral-950/50 rounded-xl p-4 text-center cursor-pointer transition-all duration-300"
                  >
                    {imagePreviews[color] ? (
                      <div className="space-y-2">
                        <img src={imagePreviews[color]} alt={`${color} preview`} className="max-h-28 mx-auto rounded-lg object-cover" />
                        <p className="text-xs text-neutral-400">Click to change image</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <UploadCloud size={20} className="mx-auto text-neutral-500" />
                        <p className="text-xs text-neutral-400">Upload {color} image</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Per-Color Specification Fields */}
        {newProduct.color.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-neutral-800">
            <div>
              <h3 className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                Specifications (Per Color Variant)
              </h3>
              <p className="text-xs text-neutral-500">
                Enter specifications for each color variant. All specs are configured individually per color.
              </p>
            </div>
            <div className="space-y-6">
              {newProduct.color.map((color) => (
                <div
                  key={color}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 sm:p-5 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-neutral-200 font-mono uppercase tracking-wider">
                      {color} Variant Specs
                    </h4>
                  </div>

                  {/* Bottles / Jars Color Specs */}
                  {(newProduct.category === 'Bottles' || newProduct.category === 'Jars') && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">Volume</label>
                        <input
                          type="text"
                          value={getColorSpecValue(color, 'volume')}
                          onChange={(e) => setColorSpecValue(color, 'volume', e.target.value)}
                          className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-600 transition-colors"
                          placeholder="e.g., 500ml, 1L"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">Neck Size</label>
                        <select
                          value={getColorSpecValue(color, 'neckSize')}
                          onChange={(e) => setColorSpecValue(color, 'neckSize', e.target.value)}
                          className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-neutral-200 outline-none focus:border-neutral-600 transition-colors"
                        >
                          <option value="">Use Default</option>
                          {neckSizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">Neck Profile</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {['SP410', 'PCO', 'ROPP', 'SP 400', 'CTC', '3Start', 'Alaska'].map((profile) => (
                            <label key={profile} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={getColorNeckProfile(color).includes(profile)}
                                onChange={(e) => toggleColorNeckProfile(color, profile, e.target.checked)}
                                className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-red-600 focus:ring-red-500"
                              />
                              <span className="text-xs text-neutral-400">{profile}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">OFC</label>
                        <input
                          type="text"
                          value={getColorSpecValue(color, 'ofc')}
                          onChange={(e) => setColorSpecValue(color, 'ofc', e.target.value)}
                          className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-600 transition-colors"
                          placeholder="OFC"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">Weight</label>
                        <input
                          type="text"
                          value={getColorSpecValue(color, 'weight')}
                          onChange={(e) => setColorSpecValue(color, 'weight', e.target.value)}
                          className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-600 transition-colors"
                          placeholder="e.g., 20g, 50g"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">Height</label>
                        <input
                          type="text"
                          value={getColorSpecValue(color, 'height')}
                          onChange={(e) => setColorSpecValue(color, 'height', e.target.value)}
                          className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-600 transition-colors"
                          placeholder="Height"
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">Diameter</label>
                        <input
                          type="text"
                          value={getColorSpecValue(color, 'diameter')}
                          onChange={(e) => setColorSpecValue(color, 'diameter', e.target.value)}
                          className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-600 transition-colors"
                          placeholder="Diameter"
                        />
                      </div>
                    </div>
                  )}

                  {/* Caps Color Specs */}
                  {newProduct.category === 'Caps' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">Neck Size</label>
                        <select
                          value={getColorSpecValue(color, 'neckSize')}
                          onChange={(e) => setColorSpecValue(color, 'neckSize', e.target.value)}
                          className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-neutral-200 outline-none focus:border-neutral-600 transition-colors"
                        >
                          <option value="">Use Default</option>
                          {neckSizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">Neck Profile</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {['SP410', 'PCO', 'ROPP', 'SP 400', 'CTC', '3Start', 'Alaska'].map((profile) => (
                            <label key={profile} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={getColorNeckProfile(color).includes(profile)}
                                onChange={(e) => toggleColorNeckProfile(color, profile, e.target.checked)}
                                className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-red-600 focus:ring-red-500"
                              />
                              <span className="text-xs text-neutral-400">{profile}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">Pilfer</label>
                        <input
                          type="text"
                          value={getColorSpecValue(color, 'pilfer')}
                          onChange={(e) => setColorSpecValue(color, 'pilfer', e.target.value)}
                          className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-600 transition-colors"
                          placeholder="Pilfer"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">Height</label>
                        <input
                          type="text"
                          value={getColorSpecValue(color, 'height')}
                          onChange={(e) => setColorSpecValue(color, 'height', e.target.value)}
                          className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-600 transition-colors"
                          placeholder="Height"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">Weight</label>
                        <input
                          type="text"
                          value={getColorSpecValue(color, 'weight')}
                          onChange={(e) => setColorSpecValue(color, 'weight', e.target.value)}
                          className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-600 transition-colors"
                          placeholder="e.g., 20g, 50g"
                        />
                      </div>
                    </div>
                  )}

                  {/* Preforms Color Specs */}
                  {newProduct.category === 'Preforms' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">Neck Size</label>
                        <select
                          value={getColorSpecValue(color, 'neckSize')}
                          onChange={(e) => setColorSpecValue(color, 'neckSize', e.target.value)}
                          className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-neutral-200 outline-none focus:border-neutral-600 transition-colors"
                        >
                          <option value="">Use Default</option>
                          {neckSizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">Neck Profile</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {['SP410', 'PCO', 'ROPP', 'SP 400', 'CTC', '3Start', 'Alaska'].map((profile) => (
                            <label key={profile} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={getColorNeckProfile(color).includes(profile)}
                                onChange={(e) => toggleColorNeckProfile(color, profile, e.target.checked)}
                                className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-red-600 focus:ring-red-500"
                              />
                              <span className="text-xs text-neutral-400">{profile}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">Length</label>
                        <input
                          type="text"
                          value={getColorSpecValue(color, 'length')}
                          onChange={(e) => setColorSpecValue(color, 'length', e.target.value)}
                          className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-600 transition-colors"
                          placeholder="Length"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">Weight</label>
                        <input
                          type="text"
                          value={getColorSpecValue(color, 'weight')}
                          onChange={(e) => setColorSpecValue(color, 'weight', e.target.value)}
                          className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-600 transition-colors"
                          placeholder="e.g., 20g, 50g"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}


        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showInPopupNew"
            checked={newProduct.showInPopup}
            onChange={(e) => setNewProduct({ ...newProduct, showInPopup: e.target.checked })}
            className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-teal-600 focus:ring-teal-500"
          />
          <label htmlFor="showInPopupNew" className="text-xs text-neutral-400 font-mono">Show in New Product Popup</label>
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-neutral-100 text-neutral-900 py-3 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-200 flex items-center justify-center gap-2 mt-4"
        >
          Commit Entry Node
        </button>
      </form>
    </motion.div>
  );
}
