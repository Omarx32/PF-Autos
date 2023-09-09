const {Product, Brand}= require("../db")

const getBrands=async ()=>{
    try{
        const brands=["Chevrolet","Toyota"]

        for(let i = 0; i < brands.length; i++){
            let name=brands[i]
            const category=await Brand.create({name})
        }
        return brands;
    } catch(error){
        console.log(error);
        throw new Error("Error al obtener marcas", error)
    }
}

module.exports= getBrands