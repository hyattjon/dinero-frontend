const getConfig = () => {
  const isProduction = window.location.hostname !== 'localhost';
  return {
    BACKEND_URL: isProduction 
      ? 'https://dinero-backend-deeac4fe8d4e.herokuapp.com'
      : 'http://localhost:5001',
    ENVIRONMENT: isProduction ? 'production' : 'development'
  };
};

const CONFIG = getConfig();