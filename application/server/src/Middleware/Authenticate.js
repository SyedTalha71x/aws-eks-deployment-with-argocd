import jwt from 'jsonwebtoken'

export const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"]; 
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "No token provided or invalid format" });
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      console.error("JWT Error:", err.message);
      return res
        .status(401)
        .json({ error: "Invalid or expired token" });
    }
  };

 