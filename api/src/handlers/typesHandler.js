const { getAllPokemonsByType } = require("../controllers/typesController")


const getAllPokemonsTypesHandler = async (req, res) => {
    try {
        const allTypes = await getAllPokemonsByType();
        
        res.status(200).json(allTypes) 
      } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllPokemonsTypesHandler
}