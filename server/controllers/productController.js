import {v2 as cloudinary} from 'cloudinary';
import Product from '../models/Product';

//add product : /api/product/add
export const addProduct = async (req, res) => {
    try {
      // Parse the product data sent in the request body
      let productData = JSON.parse(req.body.productData);
  
      // Access uploaded image files from the request
      const images = req.files;
  
      // Upload all images to Cloudinary and get secure URLs
      let imageUrls = await Promise.all(
        images.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
  
      // Save the product to the database with image URLs
      await Product.create({ ...productData, images: imageUrls });
  
      // Send success response
      res.json({ success: true, message: "Product Added" });
    } catch (error) {
      console.log(error.message);
      res.json({ success: false, message: error.message });
    }
  };
  


//get product: /api/product/add
export const proudctList=async (req, res) => {
    try {
        const products=await Product.find({});
        res.json({success:true,products});

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}


//get single prouduct : /api/prouduct/id

export const productById=async (req, res) =>{
    try {
        const{id}=req.body
        const product=await Product.findById(id);
        res.json({success:true,product});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
        
    }

}



//change product instock : /api/product/stock

export const changeStock=async (req, res) =>{
    try {
        const {id,inStock} =req.body;
        await Product.findByIdAndUpdate(id,{inStock})
        res.josn({success:true,message:"Stock Updated"});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }

}