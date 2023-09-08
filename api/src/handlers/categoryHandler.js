const getCategories=require("../controllers/Categorys/getCategorysCon")

const categoryHandler= async (req,res)=>{
    try{
        const response= await getCategories();
        res.status(200).json(response);
    } catch(error){ 
        res.status(400).json({error:error.message});
        
    }
}

module.exports= categoryHandler;