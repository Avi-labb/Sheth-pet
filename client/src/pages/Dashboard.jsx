import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Users, Package, Activity, Settings, BarChart3, ShoppingCart, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin-login');
      return;
    }

    // Verify token with backend
    const fetchDashboard = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
        } else {
          localStorage.removeItem('token');
          navigate('/admin-login');
        }
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/admin-login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin-login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const stats = [
    { title: 'Total Products', value: '124', icon: Package, color: 'from-blue-500 to-blue-600' },
    { title: 'Total Users', value: '3,456', icon: Users, color: 'from-green-500 to-green-600' },
    { title: 'Total Sales', value: '$45,678', icon: ShoppingCart, color: 'from-purple-500 to-purple-600' },
    { title: 'Growth', value: '+12.5%', icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-red-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Admin Dashboard
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Welcome Back!
          </h2>
          <p className="text-slate-600">{message}</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</h3>
              <p className="text-sm text-slate-500 font-medium">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts & Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="text-red-600" size={24} />
              <h3 className="text-xl font-bold text-slate-800">Sales Overview</h3>
            </div>
            <div className="h-64 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center">
              <p className="text-slate-500">Chart will be displayed here</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Activity className="text-red-600" size={24} />
              <h3 className="text-xl font-bold text-slate-800">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"></div>
                  <div>
                    <p className="text-sm text-slate-800 font-medium">New order received</p>
                    <p className="text-xs text-slate-500">2 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Settings className="text-red-600" size={24} />
            <h3 className="text-xl font-bold text-slate-800">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Add New Product', 'Manage Users', 'View Reports'].map((action, i) => (
              <button
                key={i}
                className="p-4 border-2 border-slate-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all text-left"
              >
                <p className="font-semibold text-slate-800">{action}</p>
                <p className="text-sm text-slate-500 mt-1">Click to manage</p>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
