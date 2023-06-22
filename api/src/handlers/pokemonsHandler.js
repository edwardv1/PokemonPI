const { getAllPokemons, getPokemonById, getPokemonByName, createPokemon } = require('../controllers/pokemonsController.js')

//En estas funciones obtengo y extraigo info que viene de la request del client

// Recibe la info por query
const getAllPokemonsHandler = async (req, res) => {
    const { name } = req.query;

    try {
        if(name){
            const pokemonByName = await getPokemonByName(name.toLowerCase());
            return res.status(200).json(pokemonByName)
        }else {
            //si invoco la misma ruta pokemons/ pero en este caso no viene con ningun query, traigo todos los pokes  
            const allPokemons = await getAllPokemons();
            return res.status(200).json(allPokemons)
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

// Recibe la info por params

const getPokemonsByIdHandler = async (req, res) => {
    const {id} = req.params  // UUUID: hjfe43-2574kl-564sdfg-7564f o id: 2 
    try {
        const pokemonsId = await getPokemonById(id)
        res.status(200).send(pokemonsId)        
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}



// Recibe la info por body, me llega en forma de un json

const createPokemonsHandler = async (req,res) => {  
    const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;
    
    if(!name || !image || !hp || !attack || !defense) return res.status(400).send("Faltan datos obligatorios.")
    try {
        const newPokemon = await createPokemon(name, image, hp, attack, defense, speed, height, weight, types)
        return res.status(200).send("The pokemon has been created successfully")
   } catch (error) {
        return res.status(400).json({error: error.message}) //ESTA ENTRANDO EN ESTE ERROR
   }
}


module.exports = {
    getAllPokemonsHandler,
    getPokemonsByIdHandler,
    createPokemonsHandler
}