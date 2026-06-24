import React, { useState, useEffect } from 'react'
import { X, Sparkles, Tag, ArrowRight, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { productAPI } from '../services/api'
import { useTheme } from '../contexts/ThemeContext';

const NewProductPopup = () => {
  const [latestProduct, setLatestProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const { theme } = useTheme();

  // Calculate time remaining
  const calculateTimeRemaining = (product) => {
    if (!product) return null;
    const productCreatedAt = new Date(product.createdAt);
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

  useEffect(() => {
    const fetchProducts = async () => {
      console.log('=== NewProductPopup: Starting fetch ===');
      try {
        const dismissedId = localStorage.getItem('dismissedNewProductId');
        console.log('NewProductPopup: dismissedNewProductId from localStorage:', dismissedId);
        
        const result = await productAPI.getProducts();
        console.log('NewProductPopup: Fetched products result:', result);
        
        if (result.ok && result.data.products.length > 0) {
          console.log('NewProductPopup: Total products:', result.data.products.length);
          
          // Filter products that have showInPopup: true first
          const popupProducts = result.data.products.filter(product => {
            console.log('NewProductPopup: Checking product:', product.name, 'showInPopup:', product.showInPopup);
            return product.showInPopup;
          });
          
          console.log('NewProductPopup: Filtered popup products count:', popupProducts.length, 'products:', popupProducts);
          
          if (popupProducts.length > 0) {
            const sorted = [...popupProducts].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            const latest = sorted[0];
            console.log('NewProductPopup: Latest popup product:', latest);
            console.log('NewProductPopup: latest._id value:', latest._id, 'typeof:', typeof latest._id);
            
            const fifteenDaysAgo = new Date();
            fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
            const productCreatedAt = new Date(latest.createdAt);
            
            console.log('NewProductPopup: Product age check:', { 
              productCreatedAt: productCreatedAt.toISOString(), 
              fifteenDaysAgo: fifteenDaysAgo.toISOString(),
              isNewEnough: productCreatedAt > fifteenDaysAgo
            });
            
            // Check if product is new enough
            if (productCreatedAt > fifteenDaysAgo) {
              console.log('NewProductPopup: Product is new enough');
              
              // Check if user already dismissed THIS product
              console.log('NewProductPopup: Comparing dismissedId:', dismissedId, 'with product._id:', latest._id);
              const isDismissed = String(dismissedId) === String(latest._id);
              console.log('NewProductPopup: Is product dismissed?', isDismissed, 'String(dismissedId):', String(dismissedId), 'String(latest._id):', String(latest._id));
              
              // Only show if this product hasn't been dismissed yet
              if (!isDismissed) {
                console.log('NewProductPopup: Setting latest product');
                setLatestProduct(latest);
                setTimeRemaining(calculateTimeRemaining(latest));
                // Delay entry for 1 second for a natural feel
                console.log('NewProductPopup: Starting 1-second timer to show popup');
                setTimeout(() => {
                  console.log('NewProductPopup: Timer complete, setting isVisible to true');
                  setIsVisible(true);
                }, 1000); 
              } else {
                console.log('NewProductPopup: Not showing, product dismissed');
              }
            } else {
              console.log('NewProductPopup: Not showing, product too old');
            }
          } else {
            console.log('NewProductPopup: No products with showInPopup=true');
          }
        } else {
          console.log('NewProductPopup: No products found or result not ok');
        }
      } catch (error) {
        console.error('NewProductPopup: Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Update time remaining every minute
  useEffect(() => {
    if (!latestProduct) return;
    
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(latestProduct));
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [latestProduct]);

  // Auto hide after 10 seconds
  useEffect(() => {
    let timer;
    if (isVisible) {
      console.log('NewProductPopup: Starting 10-second auto-hide timer');
      timer = setTimeout(() => {
        console.log('NewProductPopup: Auto-hiding popup');
        handleDismiss();
      }, 10000); // 10 seconds
    }
    
    return () => {
      if (timer) {
        console.log('NewProductPopup: Clearing auto-hide timer');
        clearTimeout(timer);
      }
    };
  }, [isVisible]);

  const handleDismiss = () => {
    console.log('NewProductPopup: handleDismiss called');
    if (latestProduct) {
      const idToSave = String(latestProduct._id);
      console.log('NewProductPopup: Saving idToSave to localStorage:', idToSave);
      localStorage.setItem('dismissedNewProductId', idToSave);
    }
    console.log('NewProductPopup: Setting isVisible to false');
    setIsVisible(false);
  };

  // Helper to get product link
  const getProductLink = () => {
    if (!latestProduct) return '/products';
    
    // Try to find which category this product belongs to
    const category = latestProduct.category?.toLowerCase();
    if (category) {
      // First check if we have a category page
      const validCategories = ['bottles', 'jars', 'caps', 'preforms'];
      if (validCategories.includes(category)) {
        return `/products/${category}`;
      }
    }
    return '/products';
  };

  // Helper to get product image
  const getProductImage = (product) => {
    if (product.images && Object.keys(product.images).length > 0) {
      const firstColor = Object.keys(product.images)[0];
      //return `http://localhost:5000/uploads/${product.images[firstColor]}`;
      return `/uploads/${product.images[firstColor]}`;
    }
    if (product.image) {
      //return `http://localhost:5000/uploads/${product.image}`;
      return `/uploads/${product.image}`;
    }
    return null;
  };

  console.log('NewProductPopup render state:', { latestProduct: latestProduct?.name, isVisible });

  return (
    <AnimatePresence>
      {isVisible && latestProduct && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed bottom-6 left-6 z-50 w-full max-w-md"
        >
          {/* Main Container: Light, Crisp, and Playful */}
          <div className={`relative overflow-hidden rounded-3xl shadow-2xl border p-6 flex flex-col gap-5 group ${
            theme === 'light' 
              ? 'bg-white shadow-gray-200/70 border-gray-100' 
              : 'bg-slate-900 shadow-black/50 border-slate-800'
          }`}>
            
            {/* Playful Pastel Corner Accent */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-bl-full pointer-events-none" style={{
              background: theme === 'light' ? '#f0fdfa' : '#0f172a'
            }} />
            
            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              className={`absolute top-6 right-6 p-3 rounded-full active:scale-95 transition-all z-10 ${
                theme === 'light' 
                  ? 'text-gray-400 hover:text-gray-700 hover:bg-gray-100/70' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70'
              }`}
              aria-label="Close popup"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            {/* Top Section: Image + Basic Info */}
            <div className="flex gap-5 relative z-0">
              {/* Image Section */}
              <div className="relative flex-shrink-0">
                {getProductImage(latestProduct) ? (
                  <div className={`w-28 h-28 rounded-2xl overflow-hidden border ${
                    theme === 'light' ? 'border-gray-100' : 'border-slate-700'
                  }`}>
                    <img
                      src={getProductImage(latestProduct)}
                      alt={latestProduct.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className={`w-28 h-28 rounded-2xl flex items-center justify-center border ${
                    theme === 'light' ? 'border-gray-100 bg-gray-50' : 'border-slate-700 bg-slate-800'
                  }`}>
                    <Tag size={24} className={theme === 'light' ? 'text-gray-300' : 'text-slate-600'} />
                  </div>
                )}
                {/* Fresh Drop badge */}
                <div className={`absolute -bottom-2 -left-2 px-3 py-1.5 rounded-full border shadow-md text-[10px] font-bold uppercase tracking-wide ${
                  theme === 'light' 
                    ? 'bg-white border-gray-100 text-teal-700' 
                    : 'bg-slate-800 border-slate-700 text-teal-400'
                }`}>
                  Fresh Drop
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 min-w-0 flex flex-col justify-between pt-1">
                <div>
                  {/* Bright Hype Tag */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl" style={{
                      background: theme === 'light' ? '#f0fdfa' : '#0f172a',
                      color: theme === 'light' ? '#0d9488' : '#14b8a6'
                    }}>
                      <Sparkles size={16} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider" style={{
                      color: theme === 'light' ? '#0f766e' : '#5eead4'
                    }}>
                      New Product Released
                    </span>
                  </div>

                  <h4 className={`text-xl font-extrabold tracking-tighter line-clamp-2 leading-tight mb-2 ${
                    theme === 'light' ? 'text-gray-950' : 'text-white'
                  }`}>
                    {latestProduct.name}
                  </h4>
                  
                  {latestProduct.category && (
                    <div className="flex items-center gap-1.5" style={{
                      color: theme === 'light' ? '#64748b' : '#94a3b8'
                    }}>
                      <Tag size={13} className={theme === 'light' ? 'text-gray-400' : 'text-slate-500'} />
                      <p className="text-xs font-medium truncate">
                        {latestProduct.category}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Time Remaining */}
            {timeRemaining && !timeRemaining.isExpired && (
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl ${
                theme === 'light' 
                  ? 'bg-emerald-50 border border-emerald-100' 
                  : 'bg-emerald-900/20 border border-emerald-800/30'
              }`}>
                <Clock size={16} className={theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'} />
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  theme === 'light' ? 'text-emerald-700' : 'text-emerald-300'
                }`}>
                  Only {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m left!
                </span>
              </div>
            )}

            {/* Product Details */}
            <div className={`grid grid-cols-2 gap-3 ${
              theme === 'light' ? 'text-gray-600' : 'text-slate-400'
            }`}>
              {latestProduct.volume && (
                <div className="text-xs">
                  <span className={`font-bold uppercase tracking-wider ${
                    theme === 'light' ? 'text-gray-400' : 'text-slate-500'
                  }`}>Volume: </span>
                  {latestProduct.volume}
                </div>
              )}
              {latestProduct.neckSize && (
                <div className="text-xs">
                  <span className={`font-bold uppercase tracking-wider ${
                    theme === 'light' ? 'text-gray-400' : 'text-slate-500'
                  }`}>Neck Size: </span>
                  {latestProduct.neckSize}
                </div>
              )}
              {latestProduct.weight && (
                <div className="text-xs">
                  <span className={`font-bold uppercase tracking-wider ${
                    theme === 'light' ? 'text-gray-400' : 'text-slate-500'
                  }`}>Weight: </span>
                  {latestProduct.weight}
                </div>
              )}
              {latestProduct.color && latestProduct.color.length > 0 && (
                <div className="text-xs">
                  <span className={`font-bold uppercase tracking-wider ${
                    theme === 'light' ? 'text-gray-400' : 'text-slate-500'
                  }`}>Colors: </span>
                  {latestProduct.color.slice(0, 2).join(', ')}
                  {latestProduct.color.length > 2 && ' +'}
                </div>
              )}
            </div>

            {/* Call to Action Button */}
            <div className="pt-2">
              <Link
                to={getProductLink()}
                onClick={() => {
                  // Dismiss the popup when clicking view details
                  handleDismiss();
                }}
                className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold active:scale-95 transition-all shadow-md group/btn ${
                  theme === 'light' 
                    ? 'bg-gray-950 text-white hover:bg-teal-600' 
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                View Details
                <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewProductPopup;