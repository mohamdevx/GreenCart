import jwt from 'jsonwebtoken'; // Import jwt (make sure the package is installed)

const authUser = async (req, res, next) => {
  // 1. Get token from cookies
  const { token } = req.cookies;

  // 2. If token is missing, block access
  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Check if user ID exists in payload
    if (decoded.id) {
      req.user = decoded.id; // Attach user ID to request object
      next(); // Allow request to proceed
    } else {
      return res.json({ success: false, message: "Not Authorized" });
    }

  } catch (error) {
    // 5. If token is invalid/expired, block access
    return res.json({ success: false, message: "Not Authorized" });
  }
};

export default authUser;
