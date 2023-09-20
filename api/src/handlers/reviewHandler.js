const createReview= require("../controllers/Reviews/createReview");

const createReviewHandler= async (req, res)=>{
    try {
        const {title, description, rating, product, email,password}= req.body;
        const response= await createReview(title, description, rating, product, email, password);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports= createReviewHandler;