const {Reviews, Users, UsersGoogle, Product}= require("../../db")

const createReview= async (title, description, rating, product, email, password)=>{
    try {
        if(!title || !description){
          throw new Error("Falta contenido")  
        }
        const review= await Reviews.create({title, description, rating, product, email, password})

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

        if(email && !password){
            const userGoogle= await UsersGoogle.findOne({
                where: {email}
            });
            if(userGoogle){
                await review.setUsersGoogle(userGoogle);
            } else{
                throw new Error("Esta revisión no pertenece a ningún usuario")
            }
        }
        if(email && password){
            const user= await Users.findOne({
                where: {email, password}
            });
            if(user){
                await review.setUser(user);             
            } else{
                throw new Error("Esta revisión no pertenece a ningún usuario")
            }
        }


        return review;

    } catch (error) {
        console.error(error);
        throw new Error("Error al crear review", error);
    }
}

module.exports= createReview;