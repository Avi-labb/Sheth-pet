import { useState, useEffect } from 'react'
import { X, Sparkles, Tag, ArrowRight, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { productAPI } from '../services/api'
import { resolveImageUrl } from '../utils/productImages';

const NewProductPopup = () => {
  const [latestProduct, setLatestProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);

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
    const handleDismissRef = () => {
      if (latestProduct) {
        const idToSave = String(latestProduct._id);
        localStorage.setItem('dismissedNewProductId', idToSave);
      }
      setIsVisible(false);
    };
    window.__dismissPopup = handleDismissRef;

    const fetchProducts = async () => {
      console.log('=== NewProductPopup: Starting fetch ===');
      try {
        const dismissedId = localStorage.getItem('dismissedNewProductId');
        console.log('NewProductPopup: dismissedNewProductId from localStorage:', dismissedId);
        
        const result = await productAPI.getProducts();
        console.log('NewProductPopup: Fetched products result:', result);
        
        if (result.ok && result.data.products.length > 0) {
          console.log('NewProductPopup: Total products:', result.data.products.length);
          
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
            
            if (productCreatedAt > fifteenDaysAgo) {
              console.log('NewProductPopup: Product is new enough');
              
              console.log('NewProductPopup: Comparing dismissedId:', dismissedId, 'with product._id:', latest._id);
              const isDismissed = String(dismissedId) === String(latest._id);
              console.log('NewProductPopup: Is product dismissed?', isDismissed, 'String(dismissedId):', String(dismissedId), 'String(latest._id):', String(latest._id));
              
              if (!isDismissed) {
                console.log('NewProductPopup: Setting latest product');
                setLatestProduct(latest);
                setTimeRemaining(calculateTimeRemaining(latest));
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

  useEffect(() => {
    if (!latestProduct) return;
    
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(latestProduct));
    }, 60000);
    
    return () => clearInterval(interval);
  }, [latestProduct]);

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

  const getProductLink = () => {
    if (!latestProduct) return '/products';
    
    const category = latestProduct.category?.toLowerCase();
    if (category) {
      const validCategories = ['bottles', 'jars', 'caps', 'preforms'];
      if (validCategories.includes(category)) {
        return `/products/${category}`;
      }
    }
    return '/products';
  };

  const getProductImage = (product) => {
    if (product.images && Object.keys(product.images).length > 0) {
      const firstColor = Object.keys(product.images)[0];
      return resolveImageUrl(product.images[firstColor]);
    }
    if (product.image) {
      return resolveImageUrl(product.image);
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
          <div className="relative overflow-hidden rounded-3xl shadow-2xl border p-6 flex flex-col gap-5 group bg-white shadow-gray-200/70 border-gray-100">
            
            <div className="absolute top-0 right-0 w-40 h-40 rounded-bl-full pointer-events-none" style={{
              background: '#f0fdfa'
            }} />
            
            <button
              onClick={handleDismiss}
              className="absolute top-6 right-6 p-3 rounded-full active:scale-95 transition-all z-10 text-gray-400 hover:text-gray-700 hover:bg-gray-100/70"
              aria-label="Close popup"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            <div className="flex gap-5 relative z-0">
              <div className="relative flex-shrink-0">
                {getProductImage(latestProduct) ? (
                  <div className="w-28 h-28 rounded-2xl overflow-hidden border border-gray-100">
                    <img
                      src={getProductImage(latestProduct)}
                      alt={latestProduct.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-28 h-28 rounded-2xl flex items-center justify-center border border-gray-100 bg-gray-50">
                    <Tag size={24} className="text-gray-300" />
                  </div>
                )}
                <div className="absolute -bottom-2 -left-2 px-3 py-1.5 rounded-full border shadow-md text-[10px] font-bold uppercase tracking-wide bg-white border-gray-100 text-teal-700">
                  Fresh Drop
                </div>
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between pt-1">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl" style={{
                      background: '#f0fdfa',
                      color: '#0d9488'
                    }}>
                      <Sparkles size={16} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider" style={{
                      color: '#0f766e'
                    }}>
                      New Product Released
                    </span>
                  </div>

                  <h4 className="text-xl font-extrabold tracking-tighter line-clamp-2 leading-tight mb-2 text-gray-950">
                    {latestProduct.name}
                  </h4>
                  
                  {latestProduct.category && (
                    <div className="flex items-center gap-1.5" style={{
                      color: '#64748b'
                    }}>
                      <Tag size={13} className="text-gray-400" />
                      <p className="text-xs font-medium truncate">
                        {latestProduct.category}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {timeRemaining && !timeRemaining.isExpired && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <Clock size={16} className="text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Only {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m left!
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-gray-600">
              {latestProduct.volume && (
                <div className="text-xs">
                  <span className="font-bold uppercase tracking-wider text-gray-400">Volume: </span>
                  {latestProduct.volume}
                </div>
              )}
              {latestProduct.neckSize && (
                <div className="text-xs">
                  <span className="font-bold uppercase tracking-wider text-gray-400">Neck Size: </span>
                  {latestProduct.neckSize}
                </div>
              )}
              {latestProduct.weight && (
                <div className="text-xs">
                  <span className="font-bold uppercase tracking-wider text-gray-400">Weight: </span>
                  {latestProduct.weight}
                </div>
              )}
              {latestProduct.color && latestProduct.color.length > 0 && (
                <div className="text-xs">
                  <span className="font-bold uppercase tracking-wider text-gray-400">Colors: </span>
                  {latestProduct.color.slice(0, 2).join(', ')}
                  {latestProduct.color.length > 2 && ' +'}
                </div>
              )}
            </div>

            <div className="pt-2">
              <Link
                to={getProductLink()}
                onClick={() => {
                  handleDismiss();
                }}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold active:scale-95 transition-all shadow-md group/btn bg-gray-950 text-white hover:bg-teal-600"
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
