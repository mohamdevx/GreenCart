
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type: String, required: true},
    description:{type:Array,required:true},
    price:{type:Number,required:true},
    offerPrice:{type:Number,requried:true},
    image:{type:Array,requried:true},
    category:{type:String,requried:true},
    inStock: {type: Boolean, default: true},

},{timestamps: true});


const Product=mongoose.models.product || mongoose.model('product',productSchema);

export default Product;