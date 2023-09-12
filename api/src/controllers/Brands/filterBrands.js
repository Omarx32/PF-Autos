
// const {Product, Brand, Category}=require("../db")
// const diacriticless = require("diacriticless");

// const filterBrands= async (brandcar)=>{
//     try {
        
//         const carsFilt=[];
//         const B_Car= diacriticless(brandcar.toLowerCase());

//         const cars= await Product.findAll({
//             include:{
//                 model: Category,
//                 attibutes: ["name"],
//                 through:{
//                     attibutes:[]
//                 }
//             }
//         });
//         const brands= await Brand.findAll();

//         for(let i = 0; i < cars.length; i++){
//             for(let j = 0; j < brands.length; j++){
//                 if(cars[i].dataValues.BrandId===brands[j].dataValues.id){
//                     cars[i].dataValues.brandName=brands[j].dataValues.name
//                 }
//             }
//         }

//         for(let i = 0; i < cars.length; i++){
//             // cars[i].dataValues.Categories= cars[i].dataValues.Categories.map((cat)=> cat.name);
//             if(diacriticless(cars[i].dataValues.brandName.toLowerCase())===B_Car){
//                 carsFilt.push(cars[i]);
//             }
//         } 
//         // console.log(cars);
//         // console.log(brands);
//         // console.log(cars[0].dataValues.Categories);

//         if (!carsFilt.length) {
//             return {error: "No hay auto de tal categoría"}
//         }
//         return carsFilt;

//     } catch (error) {
//         console.error(error);
//         throw new Error("No se encontró el auto", error)
//     }
// }

// module.exports= filterBrands;


