const getBrands=require("../controllers/Brands/getBrands")

const brandHandler= async (req,res)=>{
    try{
        const response= await getBrands();
        res.status(200).json(response);
    } catch(error){ 
        res.status(400).json({error:error.message});
        
    }
}

module.exports= brandHandler;