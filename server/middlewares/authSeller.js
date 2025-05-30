import jwt from 'jsonwebtoken';

const authSeller=async(req,res,next)=>{
    const {sellerToken}=req.cookies;

    if(!sellerToken){
        return res.json({success:false,message:'not authorized'});
    }
    try{
        const tokenDecode=jwt.verify(sellerToken,process.env.JWT_SECRET);
        if(tokenDecode.email===proces.env.SELLER_EMAIL){
            next();

        }else{
            return res.json({success:false,message:'not authorized'});

        }
       
    }
    catch(error){
        console.error(error.message);
        return res.json({success:false,message:'not authorized'});
    }
}
export default authSeller;