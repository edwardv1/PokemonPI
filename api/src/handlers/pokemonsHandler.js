const { getAllPokemons, getPokemonById, createPokemon } = require('../controllers/pokemonsController.js')

//En estas funciones obtengo y extraigo info que viene de la request del client

// Recibe la info por query
const getAllPokemonsHandler = async (req, res) => {
    const { name } = req.query;
    try {
        if(name){
            const pokemonByName = await getAllPokemons(name.toLowerCase());
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
        res.status(200).json(pokemonsId)        
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}



// Recibe la info por body, me llega en forma de un json

const createPokemonsHandler = async (req,res) => {  
    const { name, image, hp, attack, defense, types } = req.body;
    let { speed, height, weight} = req.body;
    
    if(speed === "" || speed === undefined) speed = 0;
    if(height === "" || height === undefined) height = 0;
    if(weight === "" || weight === undefined) weight = 0;
   
    if(!name || !image || !hp || !attack || !defense) return res.status(400).send("Faltan datos obligatorios.")
    try {
        const newPokemon = await createPokemon(name.toLowerCase(), image, hp, attack, defense, speed, height, weight, types)
        return res.status(200).json("The pokemon has been created successfully") //"The pokemon has been created successfully"
   } catch (error) {
        return res.status(400).json({error: error.message}) //ESTA ENTRANDO EN ESTE ERROR
   }
}


module.exports = {
    getAllPokemonsHandler,
    getPokemonsByIdHandler,
    createPokemonsHandler
}