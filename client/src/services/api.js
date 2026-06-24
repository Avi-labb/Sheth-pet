
//const ADMIN_API_BASE_URL = "http://localhost:5000/api/admin";
//const PRODUCT_API_BASE_URL = "http://localhost:5000/api/products";

const ADMIN_API_BASE_URL = "/api/admin";
const PRODUCT_API_BASE_URL = "/api/products";
// Helper function for API calls
const apiRequest = async (baseUrl, endpoint, options = {}) => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // Important for cookies
      ...options,
    });

    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    return { ok: false, data: { message: "Network error. Please try again." } };
  }
};

// Admin API functions
export const adminAPI = {
  // Login
  login: async (email, password) => {
    return apiRequest(ADMIN_API_BASE_URL, "/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  // Send OTP for password reset
  sendOtp: async (email) => {
    return apiRequest(ADMIN_API_BASE_URL, "/send-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  // Verify OTP
  verifyOtp: async (email, otp) => {
    return apiRequest(ADMIN_API_BASE_URL, "/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
  },

  // Reset password
  resetPassword: async (email, otp, newPassword) => {
    return apiRequest(ADMIN_API_BASE_URL, "/reset-password", {
      method: "POST",
      body: JSON.stringify({ email, otp, newPassword }),
    });
  },

  // Logout
  logout: async () => {
    return apiRequest(ADMIN_API_BASE_URL, "/logout", { method: "POST" });
  },
};

// Product API functions
export const productAPI = {
  getProducts: async (category) => {
    const queryParams = category ? `?category=${encodeURIComponent(category)}` : "";
    return apiRequest(PRODUCT_API_BASE_URL, queryParams, { method: "GET" });
  },

  getCategories: async () => {
    return apiRequest(PRODUCT_API_BASE_URL, "/categories", { method: "GET" });
  },

  addCategory: async (category) => {
    return apiRequest(PRODUCT_API_BASE_URL, "/add-category", {
      method: "POST",
      body: JSON.stringify({ category }),
    });
  },

  addProduct: async (formData) => {
    try {
      const response = await fetch(`${PRODUCT_API_BASE_URL}/add-product`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await response.json();
      return { ok: response.ok, data };
    } catch (error) {
      return { ok: false, data: { message: "Network error. Please try again." } };
    }
  },

  bulkUploadProducts: async (formData) => {
    try {
      // If a single file is passed (backwards compatibility), wrap it in FormData
      if (!(formData instanceof FormData)) {
        const data = new FormData();
        data.append("file", formData);
        formData = data;
      }
      
      const response = await fetch(`${PRODUCT_API_BASE_URL}/bulk-upload`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await response.json();
      return { ok: response.ok, data };
    } catch (error) {
      return { ok: false, data: { message: "Network error. Please try again." } };
    }
  },

  updateProduct: async (id, formData) => {
    try {
      console.log('updateProduct called with id:', id);
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(`  ${key}:`, value);
      }
      const response = await fetch(`${PRODUCT_API_BASE_URL}/update-product/${id}`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await response.json();
      console.log('updateProduct response:', data);
      return { ok: response.ok, data };
    } catch (error) {
      console.error('updateProduct error:', error);
      return { ok: false, data: { message: "Network error. Please try again." } };
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await fetch(`${PRODUCT_API_BASE_URL}/delete-product/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      return { ok: response.ok, data };
    } catch (error) {
      return { ok: false, data: { message: "Network error. Please try again." } };
    }
  }
};

export default apiRequest;
