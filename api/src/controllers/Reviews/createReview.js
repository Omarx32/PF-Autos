const {Reviews, Users, UsersGoogle, Product}= require("../../db")

const createReview= async (title, description, rating, product, user)=>{
    try {
        if(!title || !description){
          throw new Error("Falta contenido")  
        }
        const review= await Reviews.create({title, description, rating, product, user})

        const productID= review.ProductId;
        const productMatch= await Product.findOne({
            where: {
                id: product
            }
        });
        if(!productMatch){
            throw new Error("Esta revisión no corresponde a ningún producto") 
        } else{
            await review.setProduct(productMatch);
        }

        if(!user){throw new Error("Esta revisión no pertenece a ningún usuario")
        } else if(user==="google"){
            const userGoogleID= review.UsersGoogleId;
            const userGoogle= await UsersGoogle.findOne({
                where: {
                    id: userGoogleID
                }
            });
                await review.setUsersGoogle(userGoogle);
        } else{
            const userID= review.UserId;
            const user= await Users.findOne({
                where: {
                    id: userID
                }
            });
            await review.setUser(user);
        }

        return review;

    } catch (error) {
        console.error(error);
        throw new Error("Error al crear review", error);
    }
}

module.exports= createReview;