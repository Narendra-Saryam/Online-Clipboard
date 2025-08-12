// Configuration for API endpoints
const config = {
  // Development environment
  development: {
    API_BASE_URL: 'http://localhost:5000'
  },
  // Production environment (Render)
  production: {
    API_BASE_URL: process.env.REACT_APP_API_URL || 'https://online-clipboard-8gkc.onrender.com'
  }
};

// Get current environment
const env = process.env.NODE_ENV || 'development';

// Export the appropriate configuration
export const API_BASE_URL = config[env].API_BASE_URL;
