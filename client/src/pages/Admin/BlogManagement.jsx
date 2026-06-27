import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusCircle, Edit2, Trash2, ArrowLeft,
  Image as ImageIcon, XCircle, CheckCircle2,
  Calendar, User, Tag, ToggleLeft, ToggleRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blogAPI } from '../../services/api';

const BlogManagement = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeForm, setActiveForm] = useState('list'); // 'list', 'create', 'edit'
  const [selectedBlog, setSelectedBlog] = useState(null);
  
  // Form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    description: '',
    content: '',
    author: 'Admin',
    tags: [],
    isPublished: true,
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  
  // Loading states
  const [savingBlog, setSavingBlog] = useState(false);
  const [deletingBlog, setDeletingBlog] = useState(null);

  // Fetch blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await blogAPI.getBlogs();
      if (res.ok) {
        setBlogs(res.data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogForm({ ...blogForm, image: file });
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagsChange = (e) => {
    const tagsStr = e.target.value;
    const tags = tagsStr.split(',').map(tag => tag.trim()).filter(tag => tag);
    setBlogForm({ ...blogForm, tags });
  };

  const resetForm = () => {
    setBlogForm({
      title: '',
      description: '',
      content: '',
      author: 'Admin',
      tags: [],
      isPublished: true,
      image: null
    });
    setImagePreview(null);
    setSelectedBlog(null);
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setSavingBlog(true);
    try {
      const formData = new FormData();
      formData.append('title', blogForm.title);
      formData.append('description', blogForm.description);
      formData.append('content', blogForm.content);
      formData.append('author', blogForm.author);
      formData.append('tags', JSON.stringify(blogForm.tags));
      formData.append('isPublished', blogForm.isPublished);
      if (blogForm.image) {
        formData.append('image', blogForm.image);
      }

      const res = await blogAPI.createBlog(formData);
      if (res.ok) {
        resetForm();
        fetchBlogs();
        setActiveForm('list');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
    }
    setSavingBlog(false);
  };

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setBlogForm({
      title: blog.title,
      description: blog.description,
      content: blog.content,
      author: blog.author || 'Admin',
      tags: blog.tags || [],
      isPublished: blog.isPublished,
      image: null
    });
    // setImagePreview(blog.image ? `http://localhost:5000/uploads/${blog.image}` : null);
    setImagePreview(blog.image ? `/uploads/${blog.image}` : null);
    setActiveForm('edit');
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    setSavingBlog(true);
    try {
      const formData = new FormData();
      formData.append('title', blogForm.title);
      formData.append('description', blogForm.description);
      formData.append('content', blogForm.content);
      formData.append('author', blogForm.author);
      formData.append('tags', JSON.stringify(blogForm.tags));
      formData.append('isPublished', blogForm.isPublished);
      if (blogForm.image) {
        formData.append('image', blogForm.image);
      }

      const res = await blogAPI.updateBlog(selectedBlog._id, formData);
      if (res.ok) {
        resetForm();
        fetchBlogs();
        setActiveForm('list');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
    setSavingBlog(false);
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    setDeletingBlog(id);
    try {
      const res = await blogAPI.deleteBlog(id);
      if (res.ok) {
        fetchBlogs();
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
    setDeletingBlog(null);
  };

  return (
    <div className="bg-[#030303] text-[#f4f4f5] min-h-screen font-sans antialiased selection:bg-red-500/30 selection:text-red-200">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-red-500/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 border-b border-neutral-900 pb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="group p-3 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:border-neutral-700 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 transition-all duration-200"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <div>
              <span className="text-[11px] font-mono font-bold tracking-[0.3em] text-red-500 uppercase block mb-1">Content Hub</span>
              <h1 className="text-3xl text-white tracking-tight font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Blog Management
              </h1>
            </div>
          </div>

          {activeForm === 'list' && (
            <button
              onClick={() => setActiveForm('create')}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-white text-black hover:bg-neutral-200 active:scale-[0.98] rounded-xl transition-all text-xs font-bold font-mono uppercase tracking-wider shadow-xl shadow-white/5"
            >
              <PlusCircle size={16} strokeWidth={2.5} />
              Create Post
            </button>
          )}
        </div>

        {/* Workspace Display */}
        <AnimatePresence mode="wait">
          {activeForm === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {loading ? (
                <div className="text-center py-24">
                  <div className="w-6 h-6 border-2 border-neutral-700 border-t-red-500 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest">Parsing database index...</p>
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center py-20 bg-neutral-950/40 rounded-2xl border border-neutral-900 backdrop-blur-sm">
                  <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest mb-2">No publications found</p>
                  <p className="text-sm text-neutral-600">Your digital writing pipeline is completely empty.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {blogs.map((blog) => (
                    <div
                      key={blog._id}
                      className="group flex flex-col justify-between bg-neutral-950/40 hover:bg-neutral-950/80 rounded-2xl border border-neutral-900 hover:border-neutral-800 overflow-hidden transition-all duration-300 backdrop-blur-md shadow-lg"
                    >
                      <div>
                        {/* Image Layer */}
                        <div className="relative h-48 bg-neutral-900/50 overflow-hidden border-b border-neutral-900">
                          {blog.image ? (
                            <img
                             // src={`http://localhost:5000/uploads/${blog.image}`}
                              src={`/uploads/${blog.image}`}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-700">
                              <ImageIcon size={32} strokeWidth={1} />
                            </div>
                          )}
                          <div className="absolute top-3 left-3">
                            <span className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md border backdrop-blur-md ${
                              blog.isPublished 
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                                : 'bg-neutral-900/80 border-neutral-800 text-neutral-400'
                            }`}>
                              {blog.isPublished ? 'PUBLISHED' : 'DRAFT'}
                            </span>
                          </div>
                        </div>

                        {/* Text Block */}
                        <div className="p-5">
                          <div className="flex items-center gap-3 text-[11px] text-neutral-500 font-mono mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-neutral-800" />
                            <span className="flex items-center gap-1 truncate max-w-[120px]">
                              <User size={12} />
                              {blog.author}
                            </span>
                          </div>

                          <h3 className="font-semibold text-lg text-neutral-100 group-hover:text-white mb-2 line-clamp-2 tracking-tight transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {blog.title}
                          </h3>
                          <p className="text-neutral-400 text-xs leading-relaxed line-clamp-2">{blog.description}</p>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="px-5 pb-5 pt-2 flex items-center gap-2 border-t border-neutral-900/50 mt-auto">
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="flex-1 flex items-center justify-center gap-1.5 text-neutral-400 hover:text-white py-2 rounded-xl border border-neutral-900 bg-neutral-900/20 hover:bg-neutral-900 text-xs font-mono font-medium transition-all"
                        >
                          <Edit2 size={13} />
                          Configure
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog._id)}
                          disabled={deletingBlog === blog._id}
                          className="px-3 flex items-center justify-center h-8 text-neutral-500 hover:text-red-400 rounded-xl hover:bg-red-950/20 transition-all"
                        >
                          {deletingBlog === blog._id ? (
                            <div className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Form Layer */}
          {(activeForm === 'create' || activeForm === 'edit') && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-neutral-950/40 rounded-2xl border border-neutral-900 p-6 md:p-8 backdrop-blur-md shadow-2xl shadow-black/50"
            >
              <div className="mb-8">
                <h2 className="text-xl font-medium text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {activeForm === 'create' ? 'Draft Creative Article' : 'Modify Article Framework'}
                </h2>
                <p className="text-xs text-neutral-500 mt-1 font-mono">Ensure all dynamic paths and imagery match content constraints.</p>
              </div>

              <form onSubmit={activeForm === 'create' ? handleCreateBlog : handleUpdateBlog} className="space-y-6">
                
                {/* Image Upload Area */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold font-mono tracking-wider text-neutral-400 uppercase">Cover Art Representation</label>
                  <div className="border border-neutral-900 bg-neutral-900/20 rounded-xl overflow-hidden transition-colors">
                    {imagePreview ? (
                      <div className="relative h-56 bg-neutral-900">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setBlogForm({ ...blogForm, image: null });
                            setImagePreview(null);
                          }}
                          className="absolute top-3 right-3 bg-black/80 hover:bg-black text-neutral-300 hover:text-white p-1.5 rounded-lg border border-neutral-800 transition-colors"
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center gap-2 py-10 cursor-pointer hover:bg-neutral-900/40 transition-colors">
                        <div className="w-10 h-10 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center text-neutral-400">
                          <ImageIcon size={18} />
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-neutral-300">Upload Featured Image</p>
                          <p className="text-[10px] text-neutral-500 font-mono mt-0.5">Asset limits: PNG, JPG under 5MB</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          required={activeForm === 'create'}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold font-mono tracking-wider text-neutral-400 uppercase">Post Title</label>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    required
                    className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-neutral-700 focus:bg-neutral-900/90 transition-all font-mono placeholder:text-neutral-600"
                    placeholder="Capture reader context..."
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold font-mono tracking-wider text-neutral-400 uppercase">Excerpt / Summary Description</label>
                  <textarea
                    value={blogForm.description}
                    onChange={(e) => setBlogForm({ ...blogForm, description: e.target.value })}
                    required
                    rows={2}
                    className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-neutral-700 focus:bg-neutral-900/90 transition-all resize-none font-mono placeholder:text-neutral-600"
                    placeholder="Short narrative summary for post indexes..."
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold font-mono tracking-wider text-neutral-400 uppercase">Core Content Architecture</label>
                  <textarea
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    required
                    rows={10}
                    className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-neutral-700 focus:bg-neutral-900/90 transition-all font-mono placeholder:text-neutral-600 leading-relaxed"
                    placeholder="Write body data utilizing Markdown strings..."
                  />
                </div>

                {/* Tags Section */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold font-mono tracking-wider text-neutral-400 uppercase block">Metadata Keywords</label>
                    <input
                      type="text"
                      value={blogForm.tags.join(', ')}
                      onChange={handleTagsChange}
                      className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-neutral-700 focus:bg-neutral-900/90 transition-all font-mono placeholder:text-neutral-600"
                      placeholder="e.g., sustainability, tech, runtime"
                    />
                  </div>
                  {/* Dynamic Tag Preview Badges */}
                  {blogForm.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 p-3 bg-neutral-900/20 border border-neutral-900 rounded-xl">
                      {blogForm.tags.map((tag, idx) => (
                        <span key={idx} className="flex items-center gap-1 text-[10px] font-mono bg-neutral-900 text-neutral-400 px-2 py-0.5 border border-neutral-800 rounded">
                          <Tag size={10} className="text-neutral-600" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Author & Visibility Parameters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold font-mono tracking-wider text-neutral-400 uppercase">Author Name</label>
                    <input
                      type="text"
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-neutral-700 transition-all font-mono"
                    />
                  </div>

                  <div className="space-y-2 flex flex-col justify-end">
                    <button
                      type="button"
                      onClick={() => setBlogForm(p => ({ ...p, isPublished: !p.isPublished }))}
                      className="flex items-center justify-between w-full p-3 bg-neutral-900/20 rounded-xl border border-neutral-800 hover:border-neutral-700/80 transition-colors text-left h-[46px]"
                    >
                      <span className="text-[11px] font-bold font-mono tracking-wider text-neutral-400 uppercase">Public Deployment</span>
                      {blogForm.isPublished ? (
                        <ToggleRight className="text-emerald-500 transition-transform" size={32} strokeWidth={1.5} />
                      ) : (
                        <ToggleLeft className="text-neutral-600 transition-transform" size={32} strokeWidth={1.5} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Action Controls */}
                <div className="flex items-center gap-3 pt-6 border-t border-neutral-900">
                  <button
                    type="button"
                    onClick={() => { setActiveForm('list'); resetForm(); }}
                    className="flex-1 py-3 px-6 text-neutral-400 border border-neutral-800 rounded-xl hover:bg-neutral-900 transition-colors text-xs font-bold font-mono uppercase tracking-wider"
                  >
                    Abort Changes
                  </button>
                  <button
                    type="submit"
                    disabled={savingBlog}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-white text-black rounded-xl hover:bg-neutral-200 active:scale-[0.99] transition-all text-xs font-bold font-mono uppercase tracking-wider disabled:opacity-50"
                  >
                    {savingBlog ? (
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 size={14} strokeWidth={2.5} />
                        {activeForm === 'create' ? 'Push Publication' : 'Save Updates'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BlogManagement;