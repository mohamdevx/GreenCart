import User from "../models/User.js";



//update user cart data
export const updateCart = async (req, res) => {
    try {
        const {userId,cartItems}=req.body;
        await User.findByIdAndUpdate(
            userId,
          {cartItems})
        res.json({ success: true, message: 'Cart updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: 'Failed to update cart' });
    }
}