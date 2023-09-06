const {Category} =require("../../db") 

async function getCategorys(req, res) {
    try {
        const category = await Category.findAll()
        
        res.status(200).json(category)
    } catch (error) {

        res.status(500).json({message: 'Theres a Error'})
    }
}


module.exports = getCategorys