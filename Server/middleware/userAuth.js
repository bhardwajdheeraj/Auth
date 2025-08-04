import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
  try {
    let token;

    // 1. Try Authorization header first
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const bearerToken = authHeader.split(' ')[1];
      if (bearerToken && bearerToken !== 'null' && bearerToken !== 'undefined') {
        token = bearerToken;
      }
    }

    // 2. Fallback to cookies
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    // 3. No token? Reject
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // 4. Verify and decode
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };

    return next();

  } catch (error) {
    const msg =
      error.name === 'TokenExpiredError'
        ? 'Token expired'
        : error.message || 'Token verification failed';

    return res.status(401).json({
      success: false,
      message: `Unauthorized: ${msg}`,
    });
  }
};

export default userAuth;
