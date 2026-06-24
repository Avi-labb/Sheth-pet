import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, FileSpreadsheet, CheckCircle, XCircle, ArrowLeft, Download, Trash2, LogOut, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { productAPI } from '../../services/api';

const BulkUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'uploading' | 'success' | 'error'
  const [message, setMessage] = useState('');
  const [uploadStats, setUploadStats] = useState(null);
  const [debugInfo, setDebugInfo] = useState([]); // For debug messages
  const [showDebugPanel, setShowDebugPanel] = useState(false); // Toggle debug panel
  const fileInputRef = useRef(null);
  const imagesInputRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, logout } = useAuth();
  
  const addDebugLog = (msg) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugInfo(prev => [...prev, `[${timestamp}] ${msg}`]);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      addDebugLog(`Selected spreadsheet file: ${file.name} (${Math.round(file.size / 1024)} KB)`);
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
        'application/vnd.ms-excel'
      ];
      const isValid = validTypes.includes(file.type) ||
                      file.name.endsWith('.csv') ||
                      file.name.endsWith('.xlsx');
      
      if (!isValid) {
        setMessage('Please select a CSV or Excel file (.csv, .xlsx)');
        setStatus('error');
        addDebugLog('ERROR: Invalid file type!');
        return;
      }
      setSelectedFile(file);
      setMessage('');
      setStatus('idle');
      setUploadStats(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setStatus('uploading');
    setMessage('Processing file...');
    addDebugLog('Starting upload process...');
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      addDebugLog(`Added spreadsheet file: ${selectedFile.name}`);
      
      addDebugLog(`Adding ${selectedImages.length} image(s) to FormData:`);
      selectedImages.forEach((image, i) => {
        addDebugLog(`  [${i}] Image name: "${image.name}"`);
        formData.append('images', image);
      });
      
      addDebugLog('Sending bulk upload request to API...');
      const result = await productAPI.bulkUploadProducts(formData);
      addDebugLog(`API response - ok: ${result.ok}`);
      addDebugLog(`API data: ${JSON.stringify(result.data)}`);
      
      if (result.ok) {
        setUploadStats(result.data);
        setStatus('success');
        setMessage(`Success! Imported ${result.data.imported}, Updated ${result.data.updated}, Failed ${result.data.failed}`);
        addDebugLog('Upload successful!');
      } else {
        setStatus('error');
        setMessage(result.data.message || 'Upload failed');
        addDebugLog(`Upload failed: ${result.data.message}`);
      }
    } catch (error) {
      addDebugLog(`Upload error: ${error.message}`);
      console.error('[DEBUG] Upload error:', error);
      setStatus('error');
      setMessage('Upload failed');
    }
    setUploading(false);
  };

  const handleImagesSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
    addDebugLog(`Selected ${files.length} image(s)`);

    // Generate previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
    setMessage('');
    setStatus('idle');
  };

  const handleReset = () => {
    addDebugLog('Resetting form...');
    setSelectedFile(null);
    setSelectedImages([]);
    setImagePreviews([]);
    setStatus('idle');
    setMessage('');
    setUploadStats(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (imagesInputRef.current) {
      imagesInputRef.current.value = '';
    }
  };

  const downloadTemplate = () => {
    const csvContent = 
`Name,SKU,Category,Colors,MOQ_Amber,MOQ_Clear,MOQ_Opaque_White,MOQ_Opaque_Black,Neck_Size,Neck_Profile,Volume,OFC,Weight,Height,Diameter,Pilfer,Length,Cap_Type,Usage,Market_Segments,Image_Amber,Image_Clear,Image_Opaque_White,Image_Opaque_Black
500ml PET Bottle,BOTTLE-001,Bottles,"Amber,Clear",2000,1000,,,28mm,PCO 1881,500ml,38mm,20g,250mm,100mm,,,Screw Cap,Beverages,"Food & Beverages,Pharmaceutical",500ml-amber-bottle.jpg,500ml-clear-bottle.jpg,,
250ml Cosmetic Jar,JAR-001,Jars,"Opaque White,Opaque Black",,3000,,2500,38mm,Lug,250ml,,30g,150mm,100mm,,,Flip Top,Cosmetics,"Personal Care,Home Care",,,250ml-white-jar.jpg,250ml-black-jar.jpg
1000g Preform,PREFORM-001,Preforms,"Clear",,800,,,,48mm,PCO 1810,,,,,,200mm,25g,,Screw Cap,Industrial,Industrial,,1000g-preform.jpg,,
Child Resistant Cap,CAP-001,Caps,"Opaque Black",,,,,28mm,PCO 1881,,,,Yes,20mm,5g,,,Snap Cap,Pharmaceutical,Pharmaceutical,,,child-resistant-cap.jpg`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-upload-template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050506] flex items-center justify-center text-neutral-400">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate('/admin');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#050506] text-neutral-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-950/50 transition-all"
            >
              <ArrowLeft size={20} className="text-neutral-400" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Bulk Upload
              </h1>
              <p className="text-neutral-500 text-sm mt-1">Upload products in bulk from CSV or Excel</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDebugPanel(!showDebugPanel)}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800 rounded-lg transition-all text-xs font-medium tracking-wider uppercase text-neutral-300"
            >
              {showDebugPanel ? 'Hide Debug' : 'Show Debug'}
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 rounded-lg transition-all text-xs font-medium tracking-wider uppercase text-neutral-300"
            >
              <LogOut size={16} />
              Log Out
            </button>
          </div>
        </div>
        
        {/* Debug Panel */}
        {showDebugPanel && (
          <div className="mb-6 bg-neutral-900 border border-neutral-700 rounded-xl p-4">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              Debug Console
            </h3>
            <div className="bg-black border border-neutral-700 rounded-lg p-3 h-48 overflow-y-auto font-mono text-[10px]">
              {debugInfo.length === 0 ? (
                <p className="text-neutral-600">No debug messages yet... Do an upload to see logs!</p>
              ) : (
                debugInfo.map((msg, i) => (
                  <p key={i} className="mb-1 text-neutral-300">{msg}</p>
                ))
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Upload Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Spreadsheet Upload Card */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FileSpreadsheet size={20} className="text-neutral-400" />
                Product Spreadsheet
              </h3>
              {!selectedFile ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer"
                >
                  <div className="border-2 border-dashed border-neutral-700 hover:border-neutral-600 bg-neutral-950/50 rounded-xl p-8 text-center transition-all duration-300">
                    <div className="w-12 h-12 mx-auto mb-3 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center">
                      <Upload size={24} className="text-neutral-400" />
                    </div>
                    <h4 className="text-md font-medium text-white mb-1">Drop CSV/Excel file here</h4>
                    <p className="text-neutral-500 text-xs mb-3">Supports .csv and .xlsx files</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="border border-neutral-800 rounded-xl p-4 bg-neutral-900/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg">
                        <FileSpreadsheet size={20} className="text-neutral-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate text-sm">{selectedFile.name}</h4>
                        <p className="text-neutral-500 text-xs">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      {status !== 'uploading' && (
                        <button
                          onClick={handleReset}
                          className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-neutral-900 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Images Upload Card */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <ImageIcon size={20} className="text-neutral-400" />
                Product Images (Optional)
              </h3>
              {selectedImages.length === 0 ? (
                <div
                  onClick={() => imagesInputRef.current?.click()}
                  className="cursor-pointer"
                >
                  <div className="border-2 border-dashed border-neutral-700 hover:border-neutral-600 bg-neutral-950/50 rounded-xl p-8 text-center transition-all duration-300">
                    <div className="w-12 h-12 mx-auto mb-3 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center">
                      <Upload size={24} className="text-neutral-400" />
                    </div>
                    <h4 className="text-md font-medium text-white mb-1">Drop product images here</h4>
                    <p className="text-neutral-500 text-xs mb-3">Name images to match Image_Filename in spreadsheet</p>
                    <input
                      ref={imagesInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImagesSelect}
                      className="hidden"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-neutral-700 bg-neutral-900">
                        <img 
                          src={preview} 
                          alt={`Preview ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-1">
                          <p className="text-white text-[10px] truncate">{selectedImages[index].name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {status !== 'uploading' && (
                    <button
                      onClick={handleReset}
                      className="w-full py-2 border border-neutral-700 text-neutral-400 text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-900 transition-all"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              )}
            </div>
            
            {/* Status and Actions */}
            {selectedFile && (
              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6">
                {/* Status Message */}
                {message && (
                  <div className={`mb-4 flex items-center gap-3 p-3 rounded-lg text-sm ${
                    status === 'success'
                      ? 'bg-green-500/10 border border-green-500/20 text-green-300'
                      : status === 'error'
                      ? 'bg-red-500/10 border border-red-500/20 text-red-300'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-300'
                  }`}>
                    {status === 'success' && <CheckCircle size={18} />}
                    {status === 'error' && <XCircle size={18} />}
                    {status === 'uploading' && (
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2" />
                    )}
                    {message}
                  </div>
                )}
                
                {/* Upload Stats if available */}
                {uploadStats && status === 'success' && (
                  <div className="mb-4 grid grid-cols-3 gap-4">
                    <div className="p-3 bg-neutral-900/50 rounded-lg border border-neutral-800 text-center">
                      <div className="text-2xl font-bold text-green-500">{uploadStats.imported}</div>
                      <div className="text-xs text-neutral-500 uppercase tracking-wider">Added</div>
                    </div>
                    <div className="p-3 bg-neutral-900/50 rounded-lg border border-neutral-800 text-center">
                      <div className="text-2xl font-bold text-blue-500">{uploadStats.updated}</div>
                      <div className="text-xs text-neutral-500 uppercase tracking-wider">Updated</div>
                    </div>
                    <div className="p-3 bg-neutral-900/50 rounded-lg border border-neutral-800 text-center">
                      <div className="text-2xl font-bold text-yellow-500">{uploadStats.failed}</div>
                      <div className="text-xs text-neutral-500 uppercase tracking-wider">Failed</div>
                    </div>
                  </div>
                )}
                
                {status !== 'success' && (
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full py-3 bg-neutral-100 text-neutral-900 font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Uploading...' : 'Upload & Process'}
                  </button>
                )}
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Download size={16} className="text-neutral-400" />
                Need a Template?
              </h3>
              <p className="text-neutral-500 text-sm mb-4">Download our sample CSV template to get started quickly.</p>
              <button
                onClick={downloadTemplate}
                className="w-full py-2.5 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-[0.15em] rounded-lg hover:bg-neutral-900 transition-all duration-300"
              >
                Download Template
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6"
            >
              <h3 className="text-white font-semibold mb-4">Instructions</h3>
              <ul className="space-y-3 text-sm text-neutral-500">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2 shrink-0" />
                  Your file must include columns: Name, SKU, Category
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2 shrink-0" />
                  Colors: comma-separated (e.g., "Amber,Clear")
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2 shrink-0" />
                  MOQ per color: use respective columns
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2 shrink-0" />
                  Category-based fields: Volume, Neck Size (Bottles/Jars), Weight (Preforms)
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2 shrink-0" />
                  SKU must be unique for each product
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2 shrink-0" />
                  Maximum file size: 10MB
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
