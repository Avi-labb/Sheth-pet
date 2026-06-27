import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Edit2, Trash2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { careerAPI } from '../../services/api';

const CareerManagement = () => {
  const navigate = useNavigate();

  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeForm, setActiveForm] = useState('list');
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    postName: '',
    location: '',
    employmentType: 'Full-time',
    experience: '',
    education: '',
    salary: '',
    isActive: true,
  });

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const res = await careerAPI.getCareers();
      if (res.ok) {
        setCareers(res.data.careers);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      postName: '',
      location: '',
      employmentType: 'Full-time',
      experience: '',
      education: '',
      salary: '',
      isActive: true,
    });
    setSelectedCareer(null);
  };

  const handleCreateCareer = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await careerAPI.createCareer(formData);
      if (res.ok) {
        resetForm();
        fetchCareers();
        setActiveForm('list');
      } else {
        alert(res.data.message || 'Error creating career');
      }
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const handleEditCareer = (career) => {
    setSelectedCareer(career);
    setFormData({
      postName: career.postName,
      location: career.location,
      employmentType: career.employmentType,
      experience: career.experience,
      education: career.education,
      salary: career.salary,
      isActive: career.isActive,
    });
    setActiveForm('edit');
  };

  const handleUpdateCareer = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await careerAPI.updateCareer(selectedCareer._id, formData);
      if (res.ok) {
        resetForm();
        fetchCareers();
        setActiveForm('list');
      } else {
        alert(res.data.message || 'Error updating career');
      }
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const handleDeleteCareer = async (id) => {
    if (window.confirm('Are you sure you want to delete this job opening?')) {
      try {
        const res = await careerAPI.deleteCareer(id);
        if (res.ok) {
          fetchCareers();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="bg-[#050506] text-[#e4e4e7] min-h-screen font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center gap-4 mb-8 border-b border-neutral-800 pb-6">
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 hover:bg-neutral-900 text-neutral-400 transition-all duration-200"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <span className="text-[13px] font-bold tracking-[0.3em] text-red-500 uppercase block mb-1.5">Career Management</span>
            <h1 className="text-2xl sm:text-3xl text-white tracking-tight font-light" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Job Openings
            </h1>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeForm === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <button
                  onClick={() => setActiveForm('create')}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all text-xs font-bold font-mono uppercase tracking-wider shadow-lg shadow-red-500/20"
                >
                  <PlusCircle size={20} />
                  Create New Job Opening
                </button>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <p className="text-neutral-500 text-xs font-mono uppercase tracking-wider">Loading...</p>
                </div>
              ) : careers.length === 0 ? (
                <div className="text-center py-12 bg-neutral-950 rounded-2xl border border-neutral-800">
                  <p className="text-neutral-500 text-xs font-mono uppercase tracking-wider">No job openings yet. Create your first one!</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {careers.map((career) => (
                    <div key={career._id} className="bg-neutral-950 rounded-2xl border border-neutral-800 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                              {career.postName}
                            </h3>
                            <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                              {career.employmentType}
                            </span>
                            {career.isActive ? (
                              <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                                Active
                              </span>
                            ) : (
                              <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                                Inactive
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-neutral-400 grid grid-cols-2 gap-2 mb-3 font-mono">
                            <div className="flex items-center gap-2">
                              <span>📍</span>
                              <span>{career.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>💼</span>
                              <span>{career.experience}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>🎓</span>
                              <span>{career.education}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>💰</span>
                              <span>{career.salary}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEditCareer(career)}
                            className="p-2 hover:bg-neutral-800 rounded-lg transition-colors text-neutral-400 hover:text-white"
                          >
                            <Edit2 size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteCareer(career._id)}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {(activeForm === 'create' || activeForm === 'edit') && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-neutral-950 rounded-2xl border border-neutral-800 p-8"
            >
              <div className="flex items-center justify-between mb-8 border-b border-neutral-800 pb-6">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => { setActiveForm('list'); resetForm(); }}
                    className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 hover:bg-neutral-900 text-neutral-400 transition-all duration-200"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <h2 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {activeForm === 'create' ? 'Create New Job Opening' : 'Edit Job Opening'}
                  </h2>
                </div>
              </div>

              <form onSubmit={activeForm === 'create' ? handleCreateCareer : handleUpdateCareer} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Post Name</label>
                    <input
                      type="text"
                      name="postName"
                      value={formData.postName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-white outline-none focus:border-neutral-700 transition-colors font-mono"
                      placeholder="Job title"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-white outline-none focus:border-neutral-700 transition-colors font-mono"
                      placeholder="City, State"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Employment Type</label>
                    <select
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-white outline-none focus:border-neutral-700 transition-colors font-mono"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-white outline-none focus:border-neutral-700 transition-colors font-mono"
                      placeholder="e.g., 2-5 years"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Education</label>
                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-white outline-none focus:border-neutral-700 transition-colors font-mono"
                      placeholder="Required qualification"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Salary</label>
                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#050506] border border-neutral-800 rounded-xl px-4 py-3 text-white outline-none focus:border-neutral-700 transition-colors font-mono"
                      placeholder="Salary range"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center gap-3 p-3 bg-[#050506] rounded-xl border border-neutral-800 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-red-600"
                      />
                      <span className="text-[13px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Post is active</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => { setActiveForm('list'); resetForm(); }}
                    className="flex-1 py-3 px-6 text-neutral-400 border border-neutral-800 rounded-xl hover:bg-neutral-900 transition-colors text-xs font-bold font-mono uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all text-xs font-bold font-mono uppercase tracking-wider disabled:opacity-50 shadow-lg shadow-red-500/20"
                  >
                    {saving ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 size={20} />
                        {activeForm === 'create' ? 'Create Opening' : 'Update Opening'}
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

export default CareerManagement;
