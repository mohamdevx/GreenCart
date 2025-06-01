import jwt from 'jsonwebtoken';

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check credentials
    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ){
      // Create JWT token
      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Set HTTP-only cookie
      res.cookie('sellerToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.json({
        success: true,
        message: 'Seller logged in successfully',
      });
    } else {
      return res.json({
        success: false,
        message: 'Invalid credentials',
      });
    }

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//seller isAuth :/api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        return res.json({ success: true});
    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

//Logout Seller : /api/seller/logout
export const SellerLogout = async (req, res) => {
  try {
    res.clearCookie('sellerToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });
    return res.json({ success: true, message: 'Seller logged out successfully' });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

//6:55