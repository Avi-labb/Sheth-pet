import React from 'react';
import { motion } from 'framer-motion';
import { Package, X } from 'lucide-react';
import { productAPI } from '../../services/api';

const PopupManager = ({ products, setActiveTab, fetchProducts }) => {
  // Get latest popup product
  const popupProducts = products.filter(product => product.showInPopup);
  const sorted = [...popupProducts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const latest = sorted[0];

  // Calculate remaining time (15 days total)
  const getTimeRemaining = () => {
    if (!latest) return null;
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
    const productCreatedAt = new Date(latest.createdAt);
    const expiresAt = new Date(productCreatedAt);
    expiresAt.setDate(expiresAt.getDate() + 15);
    
    const now = new Date();
    const totalMs = expiresAt - now;
    
    if (totalMs <= 0) return { isExpired: true };
    
    const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((totalMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return {
      isExpired: false,
      days,
      hours,
      minutes,
      expiresAt
    };
  };

  const timeRemaining = getTimeRemaining();

  const handleDeletePopup = async () => {
    if (!latest) return;
    if (confirm('Are you sure you want to remove this product from the popup?')) {
      try {
        // Update product to set showInPopup to false
        const formData = new FormData();
        formData.append('showInPopup', 'false');
        
        const result = await productAPI.updateProduct(latest._id, formData);
        if (result.ok) {
          await fetchProducts();
          alert('Product removed from popup!');
        } else {
          alert(result.data.message || 'Error removing product from popup');
        }
      } catch (error) {
        console.error('Error deleting popup:', error);
        alert('Network error');
      }
    }
  };

  const getProductImage = (product) => {
    if (product.images && Object.keys(product.images).length > 0) {
      const firstColor = Object.keys(product.images)[0];
     // return `http://localhost:5000/uploads/${product.images[firstColor]}`;
      return `/uploads/${product.images[firstColor]}`;
    }
    if (product.image) {
      //return `http://localhost:5000/uploads/${product.image}`;
      return `/uploads/${product.image}`;
      
    }
    return null;
  };

  return (
    <motion.div
      key="popup"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto md:mx-0 space-y-8"
    >
      <div className="border-b border-neutral-900 pb-5">
        <span className="text-[13px] font-bold tracking-[0.3em] text-red-500 uppercase block mb-1.5">Popup Management</span>
        <h2 className="text-xl sm:text-2xl text-white tracking-tight font-light" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          New Product Popup
        </h2>
      </div>

      <div className="bg-neutral-950 border border-neutral-900 p-5 sm:p-8 rounded-2xl space-y-6 shadow-xl">
        <div className="p-5 bg-neutral-900/30 border border-neutral-800 rounded-xl">
          <h3 className="text-sm font-bold text-neutral-300 mb-3">How it works:</h3>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li className="flex gap-2">
              <span className="text-emerald-500">•</span>
              Shows latest product added in last 15 days
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500">•</span>
              Appears on bottom-left of home page
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500">•</span>
              Dismissed state stored in localStorage
            </li>
          </ul>
        </div>

        {/* Preview Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-neutral-300">Preview:</h3>
          {latest ? (
            <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
              {/* Product Header with Image */}
              <div className="flex gap-6 mb-6">
                <div className="w-32 h-32 bg-neutral-950 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 border border-neutral-800">
                  {getProductImage(latest) ? (
                    <img
                      src={getProductImage(latest)}
                      alt={latest.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-neutral-600 text-xs">No Image</span>
                  )}
                </div>
                
                <div className="flex-1 space-y-2">
                  <h4 className="text-white font-bold text-lg">{latest.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-neutral-500 uppercase">SKU:</span>
                    <span className="text-neutral-300 text-sm">{latest.sku}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-neutral-500 uppercase">Category:</span>
                    <span className="text-neutral-300 text-sm">{latest.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-neutral-500 uppercase">Added:</span>
                    <span className="text-neutral-300 text-sm">{new Date(latest.createdAt).toLocaleDateString()}</span>
                  </div>
                  {timeRemaining && !timeRemaining.isExpired && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-mono text-emerald-500 uppercase">Time Remaining:</span>
                      <span className="text-emerald-400 text-sm font-bold">
                        {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m
                      </span>
                    </div>
                  )}
                  {timeRemaining && timeRemaining.isExpired && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-mono text-yellow-500 uppercase">Status:</span>
                      <span className="text-yellow-400 text-sm font-bold">EXPIRED</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-neutral-800 pt-4">
                {latest.volume && (
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-neutral-500 uppercase">Volume</span>
                    <p className="text-neutral-300 text-sm">{latest.volume}</p>
                  </div>
                )}
                {latest.neckSize && (
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-neutral-500 uppercase">Neck Size</span>
                    <p className="text-neutral-300 text-sm">{latest.neckSize}</p>
                  </div>
                )}
                {latest.neckProfile && (
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-neutral-500 uppercase">Neck Profile</span>
                    <p className="text-neutral-300 text-sm">{latest.neckProfile}</p>
                  </div>
                )}
                {latest.ofc && (
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-neutral-500 uppercase">OFC</span>
                    <p className="text-neutral-300 text-sm">{latest.ofc}</p>
                  </div>
                )}
                {latest.weight && (
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-neutral-500 uppercase">Weight</span>
                    <p className="text-neutral-300 text-sm">{latest.weight}</p>
                  </div>
                )}
                {latest.height && (
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-neutral-500 uppercase">Height</span>
                    <p className="text-neutral-300 text-sm">{latest.height}</p>
                  </div>
                )}
                {latest.diameter && (
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-neutral-500 uppercase">Diameter</span>
                    <p className="text-neutral-300 text-sm">{latest.diameter}</p>
                  </div>
                )}
                {latest.pilfer && (
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-neutral-500 uppercase">Pilfer</span>
                    <p className="text-neutral-300 text-sm">{latest.pilfer}</p>
                  </div>
                )}
                {latest.length && (
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-neutral-500 uppercase">Length</span>
                    <p className="text-neutral-300 text-sm">{latest.length}</p>
                  </div>
                )}
                {latest.capType && (
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-neutral-500 uppercase">Cap Type</span>
                    <p className="text-neutral-300 text-sm">{latest.capType}</p>
                  </div>
                )}
                {latest.color && latest.color.length > 0 && (
                  <div className="space-y-1 sm:col-span-2">
                    <span className="text-xs font-mono text-neutral-500 uppercase">Colors</span>
                    <div className="flex flex-wrap gap-2">
                      {latest.color.map((color, idx) => (
                        <span key={idx} className="px-2 py-1 bg-neutral-800 rounded text-neutral-300 text-xs">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {latest.marketSegments && latest.marketSegments.length > 0 && (
                  <div className="space-y-1 sm:col-span-2">
                    <span className="text-xs font-mono text-neutral-500 uppercase">Market Segments</span>
                    <div className="flex flex-wrap gap-2">
                      {latest.marketSegments.map((segment, idx) => (
                        <span key={idx} className="px-2 py-1 bg-neutral-800 rounded text-neutral-300 text-xs">
                          {segment}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-neutral-500 border border-dashed border-neutral-800 rounded-xl">
              <Package size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-xs font-mono uppercase tracking-wider">No products to show in popup</p>
            </div>
          )}
        </div>

        {latest && (
          <div className="flex gap-3">
            <button
              onClick={() => {
                localStorage.removeItem('dismissedNewProductId');
                alert('Popup reset! It will show again next visit.');
              }}
              className="flex-1 h-12 bg-neutral-800 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-neutral-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Reset Popup Dismissal
            </button>
            <button
              onClick={handleDeletePopup}
              className="flex-1 h-12 bg-red-600 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-red-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Remove from Popup
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PopupManager;