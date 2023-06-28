const { getAllPokemonsByType } = require("../controllers/typesController")


const getAllPokemonsTypesHandler = async (req, res) => {
    try {
        const allTypes = await getAllPokemonsByType();
        //verificar si tengo que controlar si allTypes es un array vacio
        res.status(200).json(allTypes)  // "The types have been successfully created in the database"
      } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllPokemonsTypesHandler
}