



// add address: /api/address/add

export const addAddress = async (req, res) => {
    try {
      const { address, userId } = req.body;
  
      // Combine all fields into one object
      await Address.create({ ...address, userId });
  
      res.json({ success: true, message: "Address Added" });
    } catch (error) {
      console.log(error.message);
      res.json({ success: false, message: error.message });
    }
  };

//get address: /api/address/get
export const getAddress=async(req,res)=>{
    try {
        const {userId}=req.body;
        const addresses=await Address.find({userId})
        res.json({success:true,addresses});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}