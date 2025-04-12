const config = {
  API_URL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8080/api'
    : 'https://netflix-dmqv.onrender.com'
};

export default config;