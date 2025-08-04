// controllers/userController.js

import userModel from '../models/userModel.js';

export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Fix: Correct way to access user ID from middleware

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: No user ID',
      });
    }

    const user = await userModel.findById(userId).select('name email isAccountVerified');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};
