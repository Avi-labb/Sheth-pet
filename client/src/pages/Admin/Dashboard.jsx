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
import SingleUpload from './SingleUpload';
import PopupManager from './PopupManager';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, logout } = useAuth();

  const neckSizes = ['19mm', '22mm', '24mm', '25mm', '28mm', '30mm', '38mm', '46mm', '53mm', '60mm', '63mm', '73mm', '83mm', '96mm', '120mm'];

  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory', 'new-product', 'popup'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState(['Bottles', 'Jars', 'Caps', 'Preforms']);
  const [searchTerm, setSearchTerm] = useState('');

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
    productType: '',
    color: [],
    moqPackaging: {}, // Object: { [colorName]: moqValue }
    capType: '',
    usage: '',
    keySpecs: '',
    image: null,
    images: {}, // Object: { [colorName]: File }
    marketSegments: [],
    volume: '',
    neckSize: '',
    weight: '',
    // New fields
    neckProfile: '',
    ofc: '',
    height: '',
    diameter: '',
    pilfer: '',
    length: '',
  });
  // State for editing product
  const [editingProduct, setEditingProduct] = useState(null);
  const [editProductData, setEditProductData] = useState({
    name: '',
    sku: '',
    category: '',
    productType: '',
    color: [],
    moqPackaging: {}, // Object: { [colorName]: moqValue }
    capType: '',
    usage: '',
    keySpecs: '',
    image: null,
    images: {}, // Object: { [colorName]: File }
    showInPopup: false,
    marketSegments: [],
    volume: '',
    neckSize: '',
    weight: '',
    // New fields
    neckProfile: '',
    ofc: '',
    height: '',
    diameter: '',
    pilfer: '',
    length: '',
  });
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [editImagesPreview, setEditImagesPreview] = useState({}); // Object: { [colorName]: base64 string }
  const [imagePreviews, setImagePreviews] = useState({}); // Object: { [colorName]: base64 string }

  const [newCategory, setNewCategory] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
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
      // Add all fields except images
      Object.entries(newProduct).forEach(([key, value]) => {
        if (key === 'image' && value instanceof File) {
          formData.append('image', value);
        } else if (key === 'images') {
          // Skip, we'll handle separately
        } else if (Array.isArray(value)) {
          // Stringify array fields for consistent handling on backend
          formData.append(key, JSON.stringify(value));
        } else if (typeof value === 'object' && value !== null) {
          // Stringify object fields like moqPackaging
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      
      // Add color-specific images
      if (newProduct.images) {
        Object.entries(newProduct.images).forEach(([colorName, file]) => {
          if (file instanceof File) {
            formData.append(`image-${colorName}`, file);
          }
        });
      }
      
      // If we're on the popup tab, set showInPopup to true
      if (activeTab === 'popup') {
        formData.append('showInPopup', 'true');
      }

      const result = await productAPI.addProduct(formData);
      console.log('[DEBUG] Add Product result:', result);
      if (result.ok) {
        setNewProduct({
          name: '',
          sku: '',
          category: '',
          productType: '',
          color: [],
          moqPackaging: {},
          capType: '',
          usage: '',
          keySpecs: '',
          image: null,
          images: {},
          marketSegments: [],
          volume: '',
          neckSize: '',
          weight: '',
          neckProfile: '',
          ofc: '',
          height: '',
          diameter: '',
          pilfer: '',
          length: '',
        });
        setImagePreview(null);
        setImagePreviews({});
        await fetchProducts();
        // Only switch to inventory if NOT on popup tab
        if (activeTab !== 'popup') {
          setActiveTab('inventory');
        }
      } else {
        alert(result.data.message || 'Error executing item creation.');
      }
    } catch (error) {
      console.error('[DEBUG] Add Product error:', error);
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

  const handleEdit = (product) => {
    setEditingProduct(product);
    // Handle backwards compatibility - if moqPackaging is a string, convert it to an object
    let initialMoq = {};
    if (typeof product.moqPackaging === 'string' && product.moqPackaging) {
      initialMoq = { default: product.moqPackaging };
    } else if (typeof product.moqPackaging === 'object' && product.moqPackaging !== null) {
      Object.assign(initialMoq, product.moqPackaging);
    }
    
    // Handle backward compatibility for color: string to array
    let initialColor = [];
    if (Array.isArray(product.color)) {
      initialColor = product.color;
    } else if (typeof product.color === 'string' && product.color) {
      initialColor = [product.color];
    }
    
    // Prepare image previews
    const initialEditImagesPreview = {};
    if (product.images) {
      Object.entries(product.images).forEach(([colorName, filename]) => {
       // initialEditImagesPreview[colorName] = `http://localhost:5000/uploads/${filename}`;
        initialEditImagesPreview[colorName] = `/uploads/${filename}`;
      });
    }
    
    setEditProductData({
      name: product.name || '',
      sku: product.sku || '',
      category: product.category || '',
      productType: product.productType || '',
      color: initialColor,
      moqPackaging: initialMoq,
      capType: product.capType || '',
      usage: product.usage || '',
      keySpecs: product.keySpecs || '',
      image: null, // No image initially unless user uploads new one
      images: {},
      showInPopup: product.showInPopup || false,
      marketSegments: product.marketSegments || [],
      volume: product.volume || '',
      neckSize: product.neckSize || '',
      weight: product.weight || '',
      // New fields
      neckProfile: product.neckProfile || '',
      ofc: product.ofc || '',
      height: product.height || '',
      diameter: product.diameter || '',
      pilfer: product.pilfer || '',
      length: product.length || '',
    });
    if (product.image) {
      //setEditImagePreview(`http://localhost:5000/uploads/${product.image}`);
      setEditImagePreview(`/uploads/${product.image}`);
    } else {
      setEditImagePreview(null);
    }
    setEditImagesPreview(initialEditImagesPreview);
    setSelectedProduct(null); // Close detail view if open
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditProductData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle color-specific image changes for edit
  const handleEditColorImageChange = (colorName, e) => {
    const file = e.target.files[0];
    if (file) {
      setEditProductData(prev => ({
        ...prev,
        images: {
          ...prev.images,
          [colorName]: file
        }
      }));
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditImagesPreview(prev => ({
          ...prev,
          [colorName]: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      // Add all fields to formData
      formData.append('name', editProductData.name);
      if (editProductData.sku) formData.append('sku', editProductData.sku);
      if (editProductData.category) formData.append('category', editProductData.category);
      if (editProductData.productType) formData.append('productType', editProductData.productType);
      if (editProductData.capType) formData.append('capType', editProductData.capType);
      if (editProductData.usage) formData.append('usage', editProductData.usage);
      if (editProductData.keySpecs) formData.append('keySpecs', editProductData.keySpecs);
      formData.append('showInPopup', editProductData.showInPopup.toString());
      if (editProductData.volume) formData.append('volume', editProductData.volume);
      if (editProductData.neckSize) formData.append('neckSize', editProductData.neckSize);
      if (editProductData.weight) formData.append('weight', editProductData.weight);
      // New fields
      if (editProductData.neckProfile) formData.append('neckProfile', editProductData.neckProfile);
      if (editProductData.ofc) formData.append('ofc', editProductData.ofc);
      if (editProductData.height) formData.append('height', editProductData.height);
      if (editProductData.diameter) formData.append('diameter', editProductData.diameter);
      if (editProductData.pilfer) formData.append('pilfer', editProductData.pilfer);
      if (editProductData.length) formData.append('length', editProductData.length);
      
      // Handle color array - stringify it
      formData.append('color', JSON.stringify(editProductData.color));
      
      // Handle moqPackaging object - stringify it
      formData.append('moqPackaging', JSON.stringify(editProductData.moqPackaging));
      
      // Handle marketSegments array - stringify it
      formData.append('marketSegments', JSON.stringify(editProductData.marketSegments));
      
      // Add single image if present (for backward compatibility)
      if (editProductData.image) {
        formData.append('image', editProductData.image);
      }
      
      // Add color-specific images
      if (editProductData.images) {
        Object.entries(editProductData.images).forEach(([colorName, file]) => {
          if (file instanceof File) {
            formData.append(`image-${colorName}`, file);
          }
        });
      }

      const result = await productAPI.updateProduct(editingProduct._id, formData);
      if (result.ok) {
        setEditingProduct(null);
        setEditProductData({
          name: '',
          sku: '',
          category: '',
          productType: '',
          color: [],
          moqPackaging: {},
          capType: '',
          usage: '',
          keySpecs: '',
          image: null,
          images: {},
          showInPopup: false,
          marketSegments: [],
          volume: '',
          neckSize: '',
          weight: '',
          neckProfile: '',
          ofc: '',
          height: '',
          diameter: '',
          pilfer: '',
          length: '',
        });
        setEditImagePreview(null);
        setEditImagesPreview({});
        await fetchProducts();
        // Set selectedProduct to the updated product
        setSelectedProduct(result.data.product);
      } else {
        alert(result.data.message || 'Error updating product.');
      }
    } catch (error) {
      console.error('Update product error:', error);
      alert('Network error during product update.');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const result = await productAPI.deleteProduct(id);
        if (result.ok) {
          await fetchProducts();
          setSelectedProduct(null);
          alert('Product deleted successfully!');
        } else {
          alert(result.data.message || 'Error deleting product.');
        }
      } catch (error) {
        alert('Network error during product deletion.');
      }
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
            onClick={() => { setActiveTab('popup'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium tracking-wider uppercase transition-all duration-200 group ${activeTab === 'popup' ? 'bg-neutral-900 text-white border border-neutral-800' : 'text-neutral-400 hover:text-neutral-100'}`}
          >
            <Package size={14} className={activeTab === 'popup' ? 'text-red-500' : 'text-neutral-500 group-hover:text-neutral-400'} />
            New Product Popup
            <ArrowRight size={12} className="ml-auto text-neutral-600" />
          </button>
        </nav>
      </div>

      <div className="space-y-4">
        <div>
          <a
            href="/"
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
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div className="text-xs font-bold tracking-widest uppercase text-neutral-400">Total Product Itemized Log Details</div>
                  <div className="w-full sm:w-80">
                    <input
                      type="text"
                      placeholder="Search by SKU, Name, Category, or Color..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                    />
                  </div>
                </div>
                <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
                  {loadingProducts ? (
                    <div className="p-16 flex flex-col justify-center items-center text-neutral-500 gap-2 font-mono text-xs uppercase tracking-wider">
                      <RefreshCw size={20} className="animate-spin text-red-500" />
                      Parsing logs...
                    </div>
                  ) : (() => {
                    const filteredProducts = products.filter((product) => {
                      const term = searchTerm.toLowerCase();
                      return (
                        (product.sku && product.sku.toLowerCase().includes(term)) ||
                        (product.name && product.name.toLowerCase().includes(term)) ||
                        (product.category && product.category.toLowerCase().includes(term)) ||
                        (Array.isArray(product.color) && product.color.some(c => c.toLowerCase().includes(term))) ||
                        (product.color && typeof product.color === 'string' && product.color.toLowerCase().includes(term))
                      );
                    });
                    
                    if (filteredProducts.length === 0) {
                      return (
                        <div className="p-16 text-center text-neutral-500 space-y-3">
                          <Package size={40} className="mx-auto opacity-20" />
                          <p className="text-xs font-mono uppercase tracking-wider">{searchTerm ? 'No matching products found.' : 'No structured items registered yet.'}</p>
                        </div>
                      );
                    }
                    
                    return (
                      <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                          <thead>
                            <tr className="border-b border-neutral-700 text-[13px] font-mono uppercase tracking-[0.2em] text-neutral-400 bg-neutral-950/60">
                              <th className="py-4 px-6 font-semibold">SKU</th>
                              <th className="py-4 px-6 font-semibold">Product Name</th>
                              <th className="py-4 px-6 font-semibold">Category</th>
                              <th className="py-4 px-6 font-semibold">Color</th>
                              <th className="py-4 px-6 font-semibold">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="text-sm divide-y divide-neutral-900/40 bg-neutral-950">
                            {filteredProducts.map((product) => (
                              <tr
                                key={product._id || product.id}
                                onClick={() => setSelectedProduct(product)}
                                className="hover:bg-neutral-800/20 transition-colors duration-150 "
                              >
                                <td className="py-4 px-6 font-mono text-neutral-400 tracking-wider">{product.sku}</td>
                                <td className="py-4 px-6 font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{product.name}</td>
                                <td className="py-4 px-6 text-neutral-400 font-medium">{product.category || '-'}</td>
                                <td className="py-4 px-6 text-neutral-400 font-medium">{Array.isArray(product.color) ? product.color.join(', ') : product.color }</td>
                                <td className="py-4 px-6">
                                  <div className="flex gap-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation(); // Prevent row click
                                        handleEdit(product);
                                      }}
                                      className="px-4 py-2 bg-white text-black rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-gray-200 transition-colors cursor-pointer"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteProduct(product._id);
                                      }}
                                      className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-red-700 transition-colors cursor-pointer"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'new-product' && (
            <SingleUpload
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              handleAddProduct={handleAddProduct}
              imagePreview={imagePreview}
              handleImageChange={handleImageChange}
              newCategory={newCategory}
              setNewCategory={setNewCategory}
              addingCategory={addingCategory}
              setAddingCategory={setAddingCategory}
              categories={categories}
              fetchCategories={fetchCategories}
              imagePreviews={imagePreviews}
              setImagePreviews={setImagePreviews}
            />
          )}

          {activeTab === 'popup' && (
            <PopupManager 
              products={products}
              setActiveTab={setActiveTab}
              fetchProducts={fetchProducts}
            />
          )}

        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md"
  onClick={() => setSelectedProduct(null)}
>
  <motion.div
    initial={{ opacity: 0, y: 15, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 15, scale: 0.98 }}
    /* Added max-h and flex flex-col to contain the layout within the viewport */
    className="bg-[#09090b] border border-neutral-800/80 rounded-2xl w-full max-w-6xl max-h-[90vh] flex flex-col relative overflow-hidden shadow-2xl shadow-black/50"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Top Header Bar (Fixed at top) */}
    <div className="flex items-center justify-between px-8 py-5 border-b border-neutral-800/60 bg-neutral-950/40 shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSelectedProduct(null)}
          className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 hover:bg-neutral-900 text-neutral-400 transition-all duration-200"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = products.findIndex(p => p._id === selectedProduct._id);
              if (currentIndex > 0) {
                setSelectedProduct(products[currentIndex - 1]);
              }
            }}
            disabled={products.findIndex(p => p._id === selectedProduct._id) === 0}
            className="p-2 rounded-lg border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 hover:bg-neutral-900 text-neutral-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {selectedProduct.name}
            </h3>
            {selectedProduct.sku && (
              <p className="text-neutral-500 text-xs font-mono mt-0.5 tracking-wider">SKU: {selectedProduct.sku}</p>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = products.findIndex(p => p._id === selectedProduct._id);
              if (currentIndex < products.length - 1) {
                setSelectedProduct(products[currentIndex + 1]);
              }
            }}
            disabled={products.findIndex(p => p._id === selectedProduct._id) === products.length - 1}
            className="p-2 rounded-lg border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 hover:bg-neutral-900 text-neutral-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteProduct(selectedProduct._id);
          }}
          className="px-5 py-2.5 cursor-pointer bg-red-600 text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider hover:bg-red-700 active:scale-95 transition-all duration-200 shadow-lg shadow-red-500/20"
        >
          Delete Product
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(selectedProduct);
          }}
          className="px-5 py-2.5 cursor-pointer bg-white text-black rounded-xl text-xs font-bold font-mono uppercase tracking-wider hover:bg-neutral-200 active:scale-95 transition-all duration-200 shadow-lg shadow-white/5"
        >
          Edit Product
        </button>
      </div>
    </div>

    {/* Main Content Body (Scrollable area) */}
    <div className="grid grid-cols-1 md:grid-cols-7 gap-8 p-8 overflow-y-auto custom-scrollbar flex-1 items-start">

      {/* Left Column: Product Showcase (3/7 Width) */}
      <div className="md:col-span-3 flex flex-col gap-4 sticky top-0">
        {/* Show per-color images if available */}
        {selectedProduct.images && Object.keys(selectedProduct.images).length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(selectedProduct.images).map(([color, filename]) => (
              <div key={color} className="aspect-square bg-neutral-950 border border-neutral-800/80 rounded-xl overflow-hidden flex items-center justify-center p-3 group relative">
                <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs font-mono text-white uppercase">{color}</div>
                <img
                 // src={`http://localhost:5000/uploads/${filename}`}
                  src={`/uploads/${filename}`}
                  alt={`${selectedProduct.name} - ${color}`}
                  className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        ) : selectedProduct.image ? (
          <div className="aspect-square w-full bg-neutral-950 border border-neutral-800/80 rounded-2xl overflow-hidden flex items-center justify-center p-6 group relative">
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 to-transparent pointer-events-none" />
            <img
             // src={`http://localhost:5000/uploads/${selectedProduct.image}`}
               src={`/uploads/${selectedProduct.image}`}
             alt={selectedProduct.name}
              className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-square w-full bg-neutral-950 border border-neutral-800/80 rounded-2xl flex items-center justify-center">
            <div className="text-neutral-600 text-center space-y-3">
              <Package size={56} className="mx-auto opacity-40 stroke-[1.5]" />
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">No Asset Available</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Deep Metadata Breakdown (4/7 Width) */}
      <div className="md:col-span-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Category', value: selectedProduct.category },
            { label: 'Color Variant', value: (Array.isArray(selectedProduct.color) ? selectedProduct.color.join(', ') : selectedProduct.color) },
            { label: 'Size Dimensions', value: selectedProduct.size },
            { label: 'Cap Specification', value: selectedProduct.capType },
            { 
              label: 'MOQ Packaging', 
              value: (typeof selectedProduct.moqPackaging === 'object' && selectedProduct.moqPackaging !== null ? Object.entries(selectedProduct.moqPackaging).map(([c, m]) => `${c}: ${m}`).join(', ') : selectedProduct.moqPackaging) 
            },
            { label: 'Intended Usage', value: selectedProduct.usage },
            { label: 'Volume', value: selectedProduct.volume },
            { label: 'Neck Size', value: selectedProduct.neckSize },
            { label: 'Neck Profile', value: selectedProduct.neckProfile },
            { label: 'OFC', value: selectedProduct.ofc },
            { label: 'Height', value: selectedProduct.height },
            { label: 'Diameter', value: selectedProduct.diameter },
            { label: 'Pilfer', value: selectedProduct.pilfer },
            { label: 'Length', value: selectedProduct.length },
            { label: 'Weight', value: selectedProduct.weight },
            { label: 'Market Segments', value: (Array.isArray(selectedProduct.marketSegments) ? selectedProduct.marketSegments.join(', ') : selectedProduct.marketSegments) },
          ].filter((item) => {
            if (item.label === 'Show in Popup') return true;
            if (item.value === undefined || item.value === null || item.value === '' || item.value === 'None') return false;
            if (Array.isArray(item.value) && item.value.length === 0) return false;
            if (typeof item.value === 'object' && item.value !== null) {
              if (typeof item.value === 'string') {} 
              else if (Object.keys(item.value).length === 0) return false;
            }
            return true;
          }).map((item, idx) => {
            return (
              <div key={idx} className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-900 hover:border-neutral-800/80 transition-colors duration-200">
                <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-1 font-mono">
                  {item.label}
                </p>
                <p className="text-neutral-200 text-sm font-medium">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    {/* Bottom Footer Actions (Fixed at bottom) */}
    <div className="p-4 bg-neutral-950/40 border-t border-neutral-800/60 flex justify-end gap-3 shrink-0">
      <button
        onClick={() => setSelectedProduct(null)}
        className="px-8 h-11 cursor-pointer bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-200"
      >
        Dismiss View
      </button>
    </div>
  </motion.div>
</motion.div>
        )}
        {/* Edit Product Modal */}
        {editingProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setEditingProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-[#050506] border border-neutral-800 rounded-2xl w-full max-w-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="p-2 rounded-lg border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 transition-all"
                  >
                    <ArrowLeft size={16} className="text-neutral-400 cursor-pointer" />
                  </button>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Edit Product
                    </h3>
                    {editingProduct.sku && (
                      <p className="text-neutral-500 text-xs font-mono">{editingProduct.sku}</p>
                    )}
                  </div>
                </div>
              </div>

              <form onSubmit={handleUpdateProduct} className="p-6 space-y-5">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Product Name</label>
                  <input
                    type="text"
                    value={editProductData.name}
                    onChange={(e) => setEditProductData({ ...editProductData, name: e.target.value })}
                    required
                    className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                    placeholder="PET Bottle 500ml"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">SKU</label>
                  <input
                    type="text"
                    value={editProductData.sku}
                    onChange={(e) => setEditProductData({ ...editProductData, sku: e.target.value })}
                    className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                    placeholder="SKU..."
                  />
                </div>
                </div>
               
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Category</label>
                    <select
                      value={editProductData.category}
                      onChange={(e) => {
                        console.log("Edit Category changed:", e.target.value);
                        setEditProductData({ ...editProductData, category: e.target.value });
                      }}
                      className="w-full bg-[#050506] border border-neutral-800 uppercase rounded-xl px-4 py-3 text-xs text-neutral-200 outline-none focus:border-neutral-700 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-neutral-600">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Color Designation</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Amber', 'Clear', 'Opaque White', 'Opaque Black'].map((color) => (
                        <label key={color} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editProductData.color.includes(color)}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              setEditProductData({
                                ...editProductData,
                                color: isChecked
                                  ? [...editProductData.color, color]
                                  : editProductData.color.filter((c) => c !== color)
                              });
                            }}
                            className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-red-600 focus:ring-red-500"
                          />
                          <span className="text-sm font-semibold text-neutral-400">{color}</span>
                        </label>
                      ))}
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
                          checked={editProductData.marketSegments.includes(segment)}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setEditProductData({
                              ...editProductData,
                              marketSegments: isChecked
                                ? [...editProductData.marketSegments, segment]
                                : editProductData.marketSegments.filter((s) => s !== segment)
                            });
                          }}
                          className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-xs text-neutral-400">{segment}</span>
                      </label>
                    ))}
                  </div>
                </div>


                {/* Conditional Fields Based on Category - Key Logistic Table */}
                {(editProductData.category === 'Bottles' || editProductData.category === 'Jars') && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-neutral-300 uppercase tracking-wider">Key Logistic</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Neck Size</label>
                        <select
                          value={editProductData.neckSize}
                          onChange={(e) => setEditProductData({ ...editProductData, neckSize: e.target.value })}
                          className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 outline-none focus:border-neutral-700 transition-colors"
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
                          value={editProductData.neckProfile}
                          onChange={(e) => setEditProductData({ ...editProductData, neckProfile: e.target.value })}
                          className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                          placeholder="Neck Profile"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Volume</label>
                        <input
                          type="text"
                          value={editProductData.volume}
                          onChange={(e) => setEditProductData({ ...editProductData, volume: e.target.value })}
                          className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                          placeholder="e.g., 500ml, 1L"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">OFC</label>
                        <input
                          type="text"
                          value={editProductData.ofc}
                          onChange={(e) => setEditProductData({ ...editProductData, ofc: e.target.value })}
                          className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                          placeholder="OFC"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Weight</label>
                        <input
                          type="text"
                          value={editProductData.weight}
                          onChange={(e) => setEditProductData({ ...editProductData, weight: e.target.value })}
                          className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                          placeholder="e.g., 20g, 50g"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Height</label>
                        <input
                          type="text"
                          value={editProductData.height}
                          onChange={(e) => setEditProductData({ ...editProductData, height: e.target.value })}
                          className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                          placeholder="Height"
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Diameter</label>
                        <input
                          type="text"
                          value={editProductData.diameter}
                          onChange={(e) => setEditProductData({ ...editProductData, diameter: e.target.value })}
                          className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                          placeholder="Diameter"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {editProductData.category === 'Caps' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-neutral-300 uppercase tracking-wider">Key Logistic</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Neck Size</label>
                        <select
                          value={editProductData.neckSize}
                          onChange={(e) => setEditProductData({ ...editProductData, neckSize: e.target.value })}
                          className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 outline-none focus:border-neutral-700 transition-colors"
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
                          value={editProductData.neckProfile}
                          onChange={(e) => setEditProductData({ ...editProductData, neckProfile: e.target.value })}
                          className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                          placeholder="Neck Profile"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Pilfer</label>
                        <input
                          type="text"
                          value={editProductData.pilfer}
                          onChange={(e) => setEditProductData({ ...editProductData, pilfer: e.target.value })}
                          className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                          placeholder="Pilfer"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Height</label>
                        <input
                          type="text"
                          value={editProductData.height}
                          onChange={(e) => setEditProductData({ ...editProductData, height: e.target.value })}
                          className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                          placeholder="Height"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Weight</label>
                        <input
                          type="text"
                          value={editProductData.weight}
                          onChange={(e) => setEditProductData({ ...editProductData, weight: e.target.value })}
                          className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                          placeholder="e.g., 20g, 50g"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {editProductData.category === 'Preforms' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-neutral-300 uppercase tracking-wider">Key Logistic</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Neck Size</label>
                        <select
                          value={editProductData.neckSize}
                          onChange={(e) => setEditProductData({ ...editProductData, neckSize: e.target.value })}
                          className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 outline-none focus:border-neutral-700 transition-colors"
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
                          value={editProductData.neckProfile}
                          onChange={(e) => setEditProductData({ ...editProductData, neckProfile: e.target.value })}
                          className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                          placeholder="Neck Profile"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Length</label>
                        <input
                          type="text"
                          value={editProductData.length}
                          onChange={(e) => setEditProductData({ ...editProductData, length: e.target.value })}
                          className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                          placeholder="Length"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Weight</label>
                        <input
                          type="text"
                          value={editProductData.weight}
                          onChange={(e) => setEditProductData({ ...editProductData, weight: e.target.value })}
                          className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                          placeholder="e.g., 20g, 50g"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Per-Color MOQ Fields */}
                {editProductData.color.length > 0 && (
                  <div className="space-y-3">
                    <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">
                      MOQ Packaging (Per Color)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {editProductData.color.map((color) => (
                        <div key={color} className="space-y-1">
                          <label className="text-xs text-neutral-500 font-mono uppercase">{color}</label>
                          <input
                            type="text"
                            value={editProductData.moqPackaging[color] || ''}
                            onChange={(e) => setEditProductData({
                              ...editProductData,
                              moqPackaging: {
                                ...editProductData.moqPackaging,
                                [color]: e.target.value
                              }
                            })}
                            className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                            placeholder="1000 units"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Per-Color Image Fields */}
                {editProductData.color.length > 0 && (
                  <div className="space-y-3">
                    <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">
                      Product Images (Per Color)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {editProductData.color.map((color) => (
                        <div key={color} className="space-y-2">
                          <label className="text-xs text-neutral-500 font-mono uppercase">{color}</label>
                          <div
                            onClick={() => {
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = 'image/*';
                              input.onchange = (e) => handleEditColorImageChange(color, e);
                              input.click();
                            }}
                            className="border-2 border-dashed border-neutral-700 hover:border-neutral-600 bg-neutral-950/50 rounded-xl p-4 text-center cursor-pointer transition-all duration-300"
                          >
                            {editImagesPreview[color] ? (
                              <div className="space-y-2">
                                <img src={editImagesPreview[color]} alt={`${color} preview`} className="max-h-28 mx-auto rounded-lg object-cover" />
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

                <div className="space-y-2">
                  <label className="text-[13px] font-mono uppercase tracking-widest text-neutral-400 block">Cap / Closure Type</label>
                  <input
                    type="text"
                    value={editProductData.capType}
                    onChange={(e) => setEditProductData({ ...editProductData, capType: e.target.value })}
                    className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700 transition-colors"
                    placeholder="Screw Cap"
                  />
                </div>

              
               
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-6 py-2 rounded-xl border border-neutral-700 text-neutral-400 text-xs font-mono uppercase tracking-wider hover:border-neutral-600 hover:text-neutral-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-white text-black text-xs font-mono uppercase tracking-wider hover:bg-gray-200 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
