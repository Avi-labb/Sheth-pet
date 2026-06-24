import React, { useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';
import { productAPI } from '../../services/api';

export default function SingleUpload({
  newProduct,
  setNewProduct,
  handleAddProduct,
  imagePreview,
  handleImageChange,
  newCategory,
  setNewCategory,
  addingCategory,
  setAddingCategory,
  categories,
  fetchCategories,
  imagePreviews,
  setImagePreviews
}) {
  const imageInputRef = useRef(null);
  const neckSizes = ['19mm', '22mm', '24mm', '25mm', '28mm', '30mm', '38mm', '46mm', '53mm', '60mm', '63mm', '73mm', '83mm', '96mm', '120mm'];

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
        <div className="grid grid-cols-1 gap-4">
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
                  className="px-4 py-3 bg-red-600 text-white rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-red-700 transition-colors"
                >
                  Add
                </button>
              </div>
            ) : (
              <select
                value={newProduct.category}
                onChange={(e) => {
                  console.log("Single Upload Category changed:", e.target.value);
                  setNewProduct({ ...newProduct, category: e.target.value });
                }}
                className="w-full bg-[#050506] border border-neutral-800 uppercase rounded-xl px-4 py-3 text-xs text-neutral-200 outline-none focus:border-neutral-700 transition-colors appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-neutral-600">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}
          </div>


          <div className="space-y-2">
            <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Cap / Closure Type</label>
            <input
              type="text"
              value={newProduct.capType}
              onChange={(e) => setNewProduct({ ...newProduct, capType: e.target.value })}
              className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-400 outline-none focus:border-neutral-600 transition-colors"
              placeholder="Screw Cap"
            />
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
        <div className="space-y-2">
          <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">
            Color Designation
          </label>

          <div className="grid grid-cols-4 bg-neutral-950 p-1 rounded-xl border border-neutral-800 gap-1">
            {['Amber', 'Clear', 'Opaque White', 'Opaque Black'].map((color) => {
              const fullColorName = color;
              const isSelected = newProduct.color.includes(fullColorName);

              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    setNewProduct({
                      ...newProduct,
                      color: isSelected
                        ? newProduct.color.filter((c) => c !== fullColorName)
                        : [...newProduct.color, fullColorName]
                    });
                  }}
                  className={`py-1.5 text-sm font-semibold rounded-lg transition-all ${isSelected
                    ? 'bg-red-800 text-white shadow-sm border border-red-700'
                    : 'text-white hover:text-red-300 border border-transparent'
                    }`}
                >
                  {color}
                </button>
              );
            })}
          </div>
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

        {/* Conditional Fields Based on Category - Key Logistic Table */}
        {(newProduct.category === 'Bottles' || newProduct.category === 'Jars') && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-neutral-300 uppercase tracking-wider">Key Specifications Logistics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Neck Size</label>
                <select
                  value={newProduct.neckSize}
                  onChange={(e) => setNewProduct({ ...newProduct, neckSize: e.target.value })}
                  className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-3 text-xs text-neutral-200 outline-none focus:border-neutral-600 transition-colors"
                >
                  <option value="">Select Neck Size</option>
                  {neckSizes.map(size => (
                    <option className="text-xs" key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Neck Profile</label>
                <input
                  type="text"
                  value={newProduct.neckProfile}
                  onChange={(e) => setNewProduct({ ...newProduct, neckProfile: e.target.value })}
                  className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-400 outline-none focus:border-neutral-600 transition-colors"
                  placeholder="Neck Profile"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Volume</label>
                <input
                  type="text"
                  value={newProduct.volume}
                  onChange={(e) => setNewProduct({ ...newProduct, volume: e.target.value })}
                  className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-400 outline-none focus:border-neutral-600 transition-colors"
                  placeholder="e.g., 500ml, 1L"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">OFC</label>
                <input
                  type="text"
                  value={newProduct.ofc}
                  onChange={(e) => setNewProduct({ ...newProduct, ofc: e.target.value })}
                  className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-400 outline-none focus:border-neutral-600 transition-colors"
                  placeholder="OFC"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Weight</label>
                <input
                  type="text"
                  value={newProduct.weight}
                  onChange={(e) => setNewProduct({ ...newProduct, weight: e.target.value })}
                  className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-400 outline-none focus:border-neutral-600 transition-colors"
                  placeholder="e.g., 20g, 50g"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Height</label>
                <input
                  type="text"
                  value={newProduct.height}
                  onChange={(e) => setNewProduct({ ...newProduct, height: e.target.value })}
                  className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-400 outline-none focus:border-neutral-600 transition-colors"
                  placeholder="Height"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Diameter</label>
                <input
                  type="text"
                  value={newProduct.diameter}
                  onChange={(e) => setNewProduct({ ...newProduct, diameter: e.target.value })}
                  className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-400 outline-none focus:border-neutral-600 transition-colors"
                  placeholder="Diameter"
                />
              </div>
            </div>
          </div>
        )}

        {newProduct.category === 'Caps' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-neutral-300 uppercase tracking-wider">Key Logistic</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Neck Size</label>
                <select
                  value={newProduct.neckSize}
                  onChange={(e) => setNewProduct({ ...newProduct, neckSize: e.target.value })}
                  className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-3 text-xs text-neutral-200 outline-none focus:border-neutral-600 transition-colors"
                >
                  <option value="">Select Neck Size</option>
                  {neckSizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Neck Profile</label>
                <input
                  type="text"
                  value={newProduct.neckProfile}
                  onChange={(e) => setNewProduct({ ...newProduct, neckProfile: e.target.value })}
                  className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-400 outline-none focus:border-neutral-600 transition-colors"
                  placeholder="Neck Profile"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Pilfer</label>
                <input
                  type="text"
                  value={newProduct.pilfer}
                  onChange={(e) => setNewProduct({ ...newProduct, pilfer: e.target.value })}
                  className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-400 outline-none focus:border-neutral-600 transition-colors"
                  placeholder="Pilfer"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Height</label>
                <input
                  type="text"
                  value={newProduct.height}
                  onChange={(e) => setNewProduct({ ...newProduct, height: e.target.value })}
                  className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-400 outline-none focus:border-neutral-600 transition-colors"
                  placeholder="Height"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Weight</label>
                <input
                  type="text"
                  value={newProduct.weight}
                  onChange={(e) => setNewProduct({ ...newProduct, weight: e.target.value })}
                  className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-400 outline-none focus:border-neutral-600 transition-colors"
                  placeholder="e.g., 20g, 50g"
                />
              </div>
            </div>
          </div>
        )}

        {newProduct.category === 'Preforms' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-neutral-300 uppercase tracking-wider">Key Logistic</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Neck Size</label>
                <select
                  value={newProduct.neckSize}
                  onChange={(e) => setNewProduct({ ...newProduct, neckSize: e.target.value })}
                  className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-3 text-xs text-neutral-200 outline-none focus:border-neutral-600 transition-colors"
                >
                  <option value="">Select Neck Size</option>
                  {neckSizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Neck Profile</label>
                <input
                  type="text"
                  value={newProduct.neckProfile}
                  onChange={(e) => setNewProduct({ ...newProduct, neckProfile: e.target.value })}
                  className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-400 outline-none focus:border-neutral-600 transition-colors"
                  placeholder="Neck Profile"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Length</label>
                <input
                  type="text"
                  value={newProduct.length}
                  onChange={(e) => setNewProduct({ ...newProduct, length: e.target.value })}
                  className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-400 outline-none focus:border-neutral-600 transition-colors"
                  placeholder="Length"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Weight</label>
                <input
                  type="text"
                  value={newProduct.weight}
                  onChange={(e) => setNewProduct({ ...newProduct, weight: e.target.value })}
                  className="w-full bg-[#050506] border border-neutral-700 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-400 outline-none focus:border-neutral-600 transition-colors"
                  placeholder="e.g., 20g, 50g"
                />
              </div>
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
