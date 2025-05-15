import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext';

const SellerLogin = () => {
    const {isSeller,setIsSeller} = useAppContext();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    



    useEffect(() => {
        if(isSeller){
            navigate("/seller/");
        }

    }, [isSeller]);
  return !isSeller && (
    <>
        <form onSubmit={onSubmitHandler}> 
            
        </form>

        <div>
        
        </div>
    </>
  )
}

export default SellerLogin