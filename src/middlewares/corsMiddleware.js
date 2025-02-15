const CorsMiddleware = (req, res, next) => {
    const allowedOrigins = process.env.NODE_ENV === 'production' 
      ? ['https://nuestrodom.com'] 
      : ['http://localhost:4200'];
  
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      // Permitir el origen específico del frontend (Angular)
      res.set({
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true'
      });
    }
  
    if (req.method === 'OPTIONS') {
      return res.status(200).end(); // Responde inmediatamente a preflight requests
    }
  
    next();
  };
  
  export default CorsMiddleware;
  