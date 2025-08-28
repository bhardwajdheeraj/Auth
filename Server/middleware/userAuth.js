import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
  try {
    let token;

    // ✅ 1. Check Cookie
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // ✅ 2. Fallback — Authorization Header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // ❌ No Token Found
    if (!token) {
      console.warn("⚠️ No token found in request");
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // ✅ Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id }; // You can attach other decoded values if needed

    next();

  } catch (error) {
    console.error("❌ JWT Verification Failed:", error.message);
    return res.status(401).json({
      success: false,
      message: `Unauthorized: ${error.message}`,
    });
  }
};

export default userAuth;
