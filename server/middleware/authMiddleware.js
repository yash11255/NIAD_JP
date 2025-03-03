import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

// Middleware (Protect Company Routes)
export const protectCompany = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token (remove "Bearer " prefix)
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find company by ID, exclude password
      req.company = await Company.findById(decoded.id).select("-password");

      if (!req.company) {
        return res
          .status(401)
          .json({ success: false, message: "Company not found" });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token, authorization failed",
      });
    }
  }

  // If no token is found
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, Login Again" });
  }
};

// export const authenticate = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ success: false, message: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = { id: decoded.userId };

//     next();
//   } catch (error) {
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };

export const authenticate = (req, res, next) => {
  // 1. Get token from cookies
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user info to req
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
