import express from "express";
import userAuth from "../middleware/userAuth.js"; // ✅ Ensure this path is correct
import User from "../models/userModel.js";
 // ✅ Import your User model

const router = express.Router();

/**
 * @route   GET /api/user/data
 * @desc    Get logged-in user's data (Protected)
 * @access  Private
 */
router.get("/data", userAuth, async (req, res) => {
  try {
    // ✅ Fetch actual user details from DB using token user ID
    const user = await User.findById(req.user.id).select("name email isAccountVerified");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // ✅ Send user data in expected format for frontend
    res.json({
      success: true,
      message: "User data fetched successfully",
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching user data:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/**
 * @route   GET /api/user/profile
 * @desc    Example protected profile route
 * @access  Private
 */
router.get("/profile", userAuth, (req, res) => {
  res.json({
    success: true,
    message: "User profile accessed",
    userId: req.user.id,
  });
});

/**
 * @route   POST /api/user/logout
 * @desc    Logout user (Clear cookie)
 * @access  Private
 */
router.post("/logout", userAuth, (req, res) => {
  res.clearCookie("token"); // ✅ Clear JWT cookie
  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

export default router;
