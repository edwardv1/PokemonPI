const { getAllPokemons, getPokemonById, createPokemon, deletePokemon } = require('../controllers/pokemonsController.js')


const getAllPokemonsHandler = async (req, res) => {
    const { name } = req.query;
    if(name === "") return res.status(400).json({error: "You must enter the name of a pokemon."});
    try {
        if(name){
            const pokemonByName = await getAllPokemons(name.toLowerCase());
            return res.status(200).json(pokemonByName)  
        }else {  
            const allPokemons = await getAllPokemons();
            return res.status(200).json(allPokemons)
        }
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}

const getPokemonsByIdHandler = async (req, res) => {
    const {id} = req.params  // UUUID: hjfe43-2574kl-564sdfg-7564f o id: 2 
    try {
        const pokemonsId = await getPokemonById(id)
        res.status(200).json(pokemonsId)        
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

const createPokemonsHandler = async (req,res) => {  
    const { name, image, hp, attack, defense, types } = req.body;
    let { speed, height, weight} = req.body;
    
    if(speed === "" || speed === undefined) speed = 0;
    if(height === "" || height === undefined) height = 0;
    if(weight === "" || weight === undefined) weight = 0;
   
    if(!name || !image || !hp || !attack || !defense) return res.status(400).send("Mandatory data is missing.")
    try {
        await createPokemon(name.toLowerCase(), image, hp, attack, defense, speed, height, weight, types)
        return res.status(200).send("The pokemon has been created successfully")
   } catch (error) {
        return res.status(400).json({error: error.message}) 
   }
}

const deletePokemonsHandler = async (req,res) => {  
    const {id} = req.params;
    
    try {
        const pokemonDeleted = await deletePokemon(id);
        return res.status(200).send(`The pokemon ${pokemonDeleted.name.charAt(0).toUpperCase() + pokemonDeleted.name.slice(1)} has been deleted successfully`)
   } catch (error) {
        return res.status(400).json({error: error.message}) 
   }
}


module.exports = {
    getAllPokemonsHandler,
    getPokemonsByIdHandler,
    createPokemonsHandler,
    deletePokemonsHandler
}