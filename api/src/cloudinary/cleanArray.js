


const cleanArray = async (array) => {
    try {
    
        
        return array.map((element) => {
          
            return {
              
                name: element.name,
                category: element.category,
                brand: element.brand,
                description: element.description,
                price: element.price,
                stock: element.stock,
                maker: element.maker,
                model: element.model,
                color: element.color,
                kilometraje: element.kilometraje,
                direccion: element.direccion,
                image: element.image,
            };
        });
    } catch (error) {
        console.error("Error in cleanArray:", error);
        return [];
    }
};

module.exports = cleanArray;
