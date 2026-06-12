const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock admin user (in production, use a database)
const adminUser = {
  email: process.env.ADMIN_EMAIL,
  passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10)
};

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== adminUser.email) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, adminUser.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: 'Login successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Forgot password endpoint (mock)
app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;
  
  if (email === adminUser.email) {
    // In production, send an actual email here
    res.json({ message: 'Password reset link sent to your email!' });
  } else {
    res.json({ message: 'If this email exists, a reset link has been sent.' });
  }
});

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Protected route example
app.get('/api/dashboard', verifyToken, (req, res) => {
  res.json({ 
    message: 'Welcome to the dashboard!',
    user: req.user
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
