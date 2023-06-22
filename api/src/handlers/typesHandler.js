const { getAllPokemonsByType } = require("../controllers/typesController")


const getAllPokemonsTypesHandler = async (req, res) => {
    try {
        const allTypes = await getAllPokemonsByType();
        //verificar si tengo que controlar si allTypes es un array vacio
        res.status(200).send("The types have been successfully created in the database")  //.json(allTypes)
      } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllPokemonsTypesHandler
}