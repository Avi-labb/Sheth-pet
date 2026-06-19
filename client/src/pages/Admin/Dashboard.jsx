import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box, Layers, Package, Settings,
  UploadCloud, PlusCircle, FileSpreadsheet,
  ExternalLink, BarChart3, Database,
  CheckCircle2, AlertCircle, ArrowRight,
  LogOut, RefreshCw, Menu, X, Image,
  XCircle, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { productAPI } from '../../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('inventory');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState(['Bottles', 'Jars', 'Caps', 'Preforms']);

  const [dataGridFile, setDataGridFile] = useState(null);
  const [assetImages, setAssetImages] = useState([]);
  const [bulkProcessing, setBulkProcessing] = useState(false);
  const [bulkResponse, setBulkResponse] = useState(null);
  const [bulkError, setBulkError] = useState(null);

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: '',
    color: '',
    size: '',
    moqPackaging: '',
    capType: '',
    usage: '',
    keySpecs: '',
    image: null,
  });

  const [newCategory, setNewCategory] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const result = await productAPI.getProducts();
      if (result.ok) {
        setProducts(result.data.products);
      }
    } catch (error) {
      console.error("Error fetching products from master database", error);
    }
    setLoadingProducts(false);
  };

  const fetchCategories = async () => {
    try {
      const result = await productAPI.getCategories();
      if (result.ok) {
        setCategories(result.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchCategories();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050506] flex items-center justify-center text-neutral-400">
        <div className="animate-spin rounded-full h-12 w-12 border-t border-b border-white"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate('/admin');
    return null;
  }

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(newProduct).forEach(([key, value]) => {
        if (value) {
          if (key === 'image' && value instanceof File) {
            formData.append('image', value);
          } else {
            formData.append(key, value);
          }
        }
      });

      const result = await productAPI.addProduct(formData);
      if (result.ok) {
        setNewProduct({
          name: '',
          sku: '',
          category: '',
          color: '',
          size: '',
          moqPackaging: '',
          capType: '',
          usage: '',
          keySpecs: '',
          image: null,
        });
        setImagePreview(null);
        await fetchProducts();
        setActiveTab('inventory');
      } else {
        alert(result.data.message || 'Error executing item creation.');
      }
    } catch (error) {
      alert('Network pipeline execution error during product creation.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBulkUploadDispatch = async (e) => {
    e.preventDefault();
    if (!dataGridFile) {
      setBulkError("System demands a valid CSV/Excel file target before ingestion initialization.");
      return;
    }

    setBulkProcessing(true);
    setBulkError(null);
    setBulkResponse(null);

    try {
      const result = await productAPI.bulkUploadProducts(dataGridFile);
      if (result.ok) {
        setBulkResponse(result.data);
        fetchProducts();
      } else {
        setBulkError(result.data.message || "An runtime exception occurred during array parsing workflows.");
      }
    } catch (err) {
      setBulkError("Infrastructural transport loss or API routing exception.");
    } finally {
      setBulkProcessing(false);
    }
  };

  const clearBulkFormAllocation = () => {
    setDataGridFile(null);
    setAssetImages([]);
    setBulkResponse(null);
    setBulkError(null);
  };

  const SidebarNavigationContent = () => (
    <>
      <div className="space-y-8">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-red-600/10 border border-red-500/30 rounded-lg flex items-center justify-center text-red-500">
              <Database size={14} className="stroke-[2]" />
            </div>
            <span className="text-sm font-bold tracking-[0.25em] text-white uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Sheth Control
            </span>
          </div>
          <p className="text-[13px] font-mono text-neutral-500 uppercase tracking-widest pl-9">Production ERP Engine</p>
        </div>

        <nav className="space-y-1.5">
          <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-[0.3em] block mb-3 pl-3">Data Matrix Viewports</span>

          <button
            onClick={() => { setActiveTab('inventory'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium tracking-wider uppercase transition-all duration-200 group ${activeTab === 'inventory' ? 'bg-neutral-900 text-white border border-neutral-800' : 'text-neutral-400 hover:text-neutral-100'}`}
          >
            <BarChart3 size={14} className={activeTab === 'inventory' ? 'text-red-500' : 'text-neutral-500 group-hover:text-neutral-400'} />
            Inventory Overview
          </button>

          <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-[0.3em] block pt-6 mb-3 pl-3">Ingestion Protocols</span>

          <button
            onClick={() => { setActiveTab('new-product'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium tracking-wider uppercase transition-all duration-200 group ${activeTab === 'new-product' ? 'bg-neutral-900 text-white border border-neutral-800' : 'text-neutral-400 hover:text-neutral-100'}`}
          >
            <PlusCircle size={14} className={activeTab === 'new-product' ? 'text-red-500' : 'text-neutral-500 group-hover:text-neutral-400'} />
            Single Upload
          </button>

          <button
            onClick={() => navigate('/bulk-upload')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium tracking-wider uppercase transition-all duration-200 group text-neutral-400 hover:text-neutral-100"
          >
            <FileSpreadsheet size={14} className="text-neutral-500 group-hover:text-neutral-400" />
            Bulk CSV Ingest
            <ArrowRight size={12} className="ml-auto text-neutral-600" />
          </button>
           <button
            onClick={() => navigate('/bulk-upload')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium tracking-wider uppercase transition-all duration-200 group text-neutral-400 hover:text-neutral-100"
          >
            <FileSpreadsheet size={14} className="text-neutral-500 group-hover:text-neutral-400" />
            New Product Popup
            <ArrowRight size={12} className="ml-auto text-neutral-600" />
          </button>
        </nav>
      </div>

      <div className="space-y-4">
        <div>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-between px-4 py-3.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-800 rounded-xl transition-all duration-300 group text-xs text-neutral-300 font-medium tracking-wider uppercase"
          >
            <span className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Visit Live Site
            </span>
            <ExternalLink size={12} className="text-neutral-500 group-hover:text-white transition-colors" />
          </a>
        </div>

        <div className="border-t border-neutral-900 pt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-800 rounded-xl transition-all duration-300 group text-xs text-neutral-300 font-medium tracking-wider uppercase"
          >
            <LogOut size={14} className="text-neutral-500 group-hover:text-red-500 transition-colors" />
            Log Out
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="bg-[#050506] text-[#e4e4e7] min-h-screen selection:bg-white selection:text-black font-sans antialiased flex flex-col md:flex-row relative">

      <header className="w-full h-16 bg-neutral-950 border-b border-neutral-900 px-6 flex md:hidden items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-neutral-950/80">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 bg-red-600/10 border border-red-500/30 rounded flex items-center justify-center text-red-500">
            <Database size={12} />
          </div>
          <span className="text-xs font-bold tracking-[0.2em] text-white uppercase font-mono">Sheth ERP</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-10 h-10 border border-neutral-900 rounded-xl flex items-center justify-center text-neutral-400 bg-neutral-950"
        >
          {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </header>

      <aside className="hidden md:flex w-72 bg-neutral-950 border-r border-neutral-900 flex-col justify-between p-6 shrink-0 h-screen sticky top-0 z-30">
        <SidebarNavigationContent />
      </aside>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "tween", duration: 0.25 }}
            className="md:hidden fixed inset-y-0 left-0 w-80 bg-neutral-950 border-r border-neutral-900 z-50 p-6 flex flex-col justify-between shadow-2xl top-16 h-[calc(100vh-4rem)]"
          >
            <SidebarNavigationContent />
          </motion.div>
        )}
      </AnimatePresence>

      {mobileMenuOpen && (
        <div onClick={() => setMobileMenuOpen(false)} className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 top-16" />
      )}

      <main className="flex-1 min-w-0 p-6 sm:p-8 md:p-12 overflow-y-auto w-full">
        <AnimatePresence mode="wait">

          {activeTab === 'inventory' && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 sm:space-y-10"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-900 pb-6 sm:pb-8">
                <div>
                  <span className="text-[13px] font-bold tracking-[0.3em] text-red-500 uppercase block mb-1.5">Operational Analytics</span>
                  <h1 className="text-2xl sm:text-3xl text-white tracking-tight font-light" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Product Inventory
                  </h1>
                </div>
                <button
                  onClick={fetchProducts}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-300 hover:bg-neutral-900 transition-all text-xs font-medium uppercase font-mono tracking-wider"
                >
                  <RefreshCw size={12} className={loadingProducts ? 'animate-spin' : ''} />
                  Sync System Cache
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl relative overflow-hidden shadow-sm">
                  <span className="text-[13px] font-bold tracking-[0.2em] text-neutral-500 uppercase block mb-3">Total Active Products</span>
                  <div className="text-3xl sm:text-4xl font-light text-white tracking-tight font-mono">
                    {products.length}
                  </div>
                </div>

                <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl relative overflow-hidden shadow-sm">
                  <span className="text-[13px] font-bold tracking-[0.2em] text-neutral-500 uppercase block mb-3">System Gateway Integrity</span>
                  <div className="flex items-center gap-2 text-white font-mono text-sm pt-1">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span className="uppercase text-neutral-300 font-medium tracking-widest text-[11px]">Consistent Connection</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-xs font-bold tracking-widest uppercase text-neutral-400 pl-1">Total Product Itemized Log Details</div>
                <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
                  {loadingProducts ? (
                    <div className="p-16 flex flex-col justify-center items-center text-neutral-500 gap-3 font-mono text-xs uppercase tracking-wider">
                      <RefreshCw size={20} className="animate-spin text-red-500" />
                      Parsing logs...
                    </div>
                  ) : products.length === 0 ? (
                    <div className="p-16 text-center text-neutral-500 space-y-3">
                      <Package size={40} className="mx-auto opacity-20" />
                      <p className="text-xs font-mono uppercase tracking-wider">No structured items registered yet.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                          <tr className="border-b border-neutral-900 text-[13px] font-mono uppercase tracking-[0.2em] text-neutral-500 bg-neutral-950/60">
                            <th className="py-4 px-6 font-semibold">SKU Vector</th>
                            <th className="py-4 px-6 font-semibold">Product Name Label</th>
                            <th className="py-4 px-6 font-semibold">Category</th>
                            <th className="py-4 px-6 font-semibold">Color Target</th>
                            <th className="py-4 px-6 font-semibold">Size Spec</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs divide-y divide-neutral-900/40 bg-neutral-950">
                          {products.map((product) => (
                            <tr
                              key={product._id || product.id}
                              onClick={() => setSelectedProduct(product)}
                              className="hover:bg-neutral-900/20 transition-colors duration-150 cursor-pointer"
                            >
                              <td className="py-4 px-6 font-mono text-neutral-400 tracking-wider">{product.sku}</td>
                              <td className="py-4 px-6 font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{product.name}</td>
                              <td className="py-4 px-6 text-neutral-400 font-light">{product.category || '-'}</td>
                              <td className="py-4 px-6 text-neutral-400 font-light">{product.color || '-'}</td>
                              <td className="py-4 px-6 text-neutral-400 font-light">{product.size || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'new-product' && (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Product Name</label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      required
                      className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                      placeholder="PET Bottle 500ml"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">SKU Code</label>
                    <input
                      type="text"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                      required
                      className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors font-mono"
                      placeholder="PET-001"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Product Image</label>
                  <div
                    onClick={() => imageInputRef.current?.click()}
                    className="border-2 border-dashed border-neutral-700 hover:border-neutral-600 bg-neutral-950/50 rounded-xl p-6 text-center cursor-pointer transition-all duration-300"
                  >
                    {imagePreview ? (
                      <div className="space-y-3">
                        <img src={imagePreview} alt="Preview" className="max-h-40 mx-auto rounded-lg object-cover" />
                        <p className="text-xs text-neutral-400">Click to change image</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <UploadCloud size={32} className="mx-auto text-neutral-500" />
                        <p className="text-sm text-neutral-400">Click to upload or drag and drop</p>
                        <p className="text-xs text-neutral-600">PNG, JPG, JPEG up to 5MB</p>
                      </div>
                    )}
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Category</label>
                      <button
                        type="button"
                        onClick={() => setAddingCategory(!addingCategory)}
                        className="text-[10px] text-red-500 hover:text-red-400 font-mono uppercase tracking-wider transition-colors"
                      >
                      </button>
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
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
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
                    <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Color Designation</label>
                    <input
                      type="text"
                      value={newProduct.color}
                      onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                      className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                      placeholder="Clear"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Dimension Scale (Size)</label>
                    <input
                      type="text"
                      value={newProduct.size}
                      onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                      className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                      placeholder="500ml"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">MOQ Packaging</label>
                    <input
                      type="text"
                      value={newProduct.moqPackaging}
                      onChange={(e) => setNewProduct({ ...newProduct, moqPackaging: e.target.value })}
                      className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                      placeholder="1000 units"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Cap / Closure Type</label>
                    <input
                      type="text"
                      value={newProduct.capType}
                      onChange={(e) => setNewProduct({ ...newProduct, capType: e.target.value })}
                      className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                      placeholder="Screw Cap"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">End Deployment Usage</label>
                  <input
                    type="text"
                    value={newProduct.usage}
                    onChange={(e) => setNewProduct({ ...newProduct, usage: e.target.value })}
                    className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                    placeholder="Water, Beverages"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Key Specifications Logistics</label>
                  <textarea
                    value={newProduct.keySpecs}
                    onChange={(e) => setNewProduct({ ...newProduct, keySpecs: e.target.value })}
                    rows="3"
                    className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors resize-none"
                    placeholder="Provide production line metrics..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-neutral-100 text-neutral-900 py-3 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-200 flex items-center justify-center gap-2 mt-4"
                >
                  Commit Entry Node
                </button>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-[#050506] border border-neutral-800 rounded-2xl w-full max-w-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-2 rounded-lg border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 transition-all"
                  >
                    <ArrowLeft size={16} className="text-neutral-400" />
                  </button>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {selectedProduct.name}
                    </h3>
                    {selectedProduct.sku && (
                      <p className="text-neutral-500 text-xs font-mono">{selectedProduct.sku}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedProduct.category && (
                    <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-900">
                      <p className="text-[13px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Category</p>
                      <p className="text-neutral-300 text-sm">{selectedProduct.category}</p>
                    </div>
                  )}
                  {selectedProduct.color && (
                    <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-900">
                      <p className="text-[13px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Color</p>
                      <p className="text-neutral-300 text-sm">{selectedProduct.color}</p>
                    </div>
                  )}
                  {selectedProduct.size && (
                    <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-900">
                      <p className="text-[13px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Size</p>
                      <p className="text-neutral-300 text-sm">{selectedProduct.size}</p>
                    </div>
                  )}
                  {selectedProduct.capType && (
                    <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-900">
                      <p className="text-[13px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Cap Type</p>
                      <p className="text-neutral-300 text-sm">{selectedProduct.capType}</p>
                    </div>
                  )}
                  {selectedProduct.moqPackaging && (
                    <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-900">
                      <p className="text-[13px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">MOQ Packaging</p>
                      <p className="text-neutral-300 text-sm">{selectedProduct.moqPackaging}</p>
                    </div>
                  )}
                  {selectedProduct.usage && (
                    <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-900">
                      <p className="text-[13px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Usage</p>
                      <p className="text-neutral-300 text-sm">{selectedProduct.usage}</p>
                    </div>
                  )}
                </div>

                {selectedProduct.keySpecs && (
                  <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-900">
                    <p className="text-[13px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Key Specifications</p>
                    <p className="text-neutral-300 text-sm leading-relaxed">{selectedProduct.keySpecs}</p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-neutral-800">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-full h-12 bg-neutral-100 text-neutral-900 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-200"
                >
                  Close Detail View
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
