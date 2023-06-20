const axios = require('axios');
const { Pokemon } = require('../db');

const getAllPokemons = async(req, res) => {
    try {
        const pokemons = await Pokemon.findAll();
        return pokemons;
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}


const getPokemonById = async(req, res) => {
    try {
        const { id } = req.params;
        
    } catch (error) {
        
    }
}

const getPokemonByName = async(req, res) => {
    
}

const createPokemon = async(req, res) => {
    
}

module.exports = {
    getAllPokemons, getPokemonById, getPokemonByName, createPokemon
}