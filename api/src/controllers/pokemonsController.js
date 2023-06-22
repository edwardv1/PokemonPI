const axios = require('axios');
const { Pokemon, Type } = require('../db');

const getAllPokemons = async(req, res) => {
    
    try {
        const pokemonsDB = await Pokemon.findAll();
        //if(pokemonsDB) return pokemonsDB;
        //si no existe pokemon, hacer el getAll a la API
    
        const infoApi = (await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=5")).data;

        //const arrResults = await infoApi.results;
        
        //creo una funcion que me limpie la info que viene de la API
        const cleanPokemonsApi = await infoApi.results.map( async pokemon => {
            const infoPokemon = (await axios.get(pokemon.url)).data;
            return{
                id: infoPokemon.id,
                name: infoPokemon.name,
                image: infoPokemon.sprites.front_default,
                hp: infoPokemon.stats[0].base_stat,
                attack: infoPokemon.stats[1].base_stat,
                defense: infoPokemon.stats[2].base_stat,
                speed: infoPokemon.stats[5].base_stat,
                height: infoPokemon.height,
                weight: infoPokemon.weight,
                types: infoPokemon.types.map((data) => data.type.name)
            }  
        })
        //const allPokemons = await Promise.all(cleanPokemonsApi);
        //return AllPokemons;
        return [...pokemonsDB, ...cleanPokemonsApi];  //envio un array con todos los pokemones
        //Puedo usar Concat tambien return pokemonsDB.concat(pokemonsApi)
    } catch (error) {
        throw new Error(error.message);
    }
}

//HACER 2 FUNCIONES getPokemonByIdAPI y getPokemonByIdbDD DEPENDIENDO DEL TIPO DE DATO DEL ID
const getPokemonById = async(id) => {
    
    const source = isNaN(id) ? "bdd" : "api";
    
    if(source === "api"){
        const allPokemons = await getAllPokemons();
    
        const pokemonsFilteredById = allPokemons.filter( (pokemon) => pokemon.id === Number(id));
        //console.log(pokemonsFilteredById);
        const pokemonId = [ ...pokemonsFilteredById];   
        //const pokemonId = pokemonDb.concat(pokemonsFilteredById);
        console.log(pokemonId);
    
        if(pokemonId.length === 0) throw new Error(`The pokemon with ID: ${id} was not found`);
        
        return pokemonId; 
    } else {
        const pokemonDb = await Pokemon.findByPk(id);  // [ ]
        if(pokemonDb.length === 0) throw new Error(`The pokemon with ID: ${id} was not found`);
        return pokemonDb;
    }
}

const getPokemonByName = async(name) => { 
    try {
        const pokemonsDbByName = await Pokemon.findAll({ where: { name } });
        
        const allPokemons = await getAllPokemons();
        //console.log(allPokemonsByName);
        const pokemonsFilteredByName = allPokemons.filter( pokemon => pokemon.name === name);
        if(pokemonsFilteredByName.length === 0) throw new Error(`There is no pokemon with the name ${name}`);
        return [...pokemonsDbByName, ...pokemonsFilteredByName];  //devuelve un array, deberia ser OBJ?
        //return allPokemonsByName;   
    } catch (error) {
        throw new Error(error.message);
    }   
}

const createPokemon = async( name, image, hp, attack, defense, speed, height, weight, types ) => {
   try {
        //recibo info de la request del client por body(formulario)
        const [pokemonDb, exists] =  await Pokemon.findOrCreate({
           where: { name },
           defaults: { name, image, hp, attack, defense, speed, height, weight }
        });
       
        if(!exists) throw new Error("The pokemon you are trying to create already exists.")
    
        const type = await Type.findAll({ where: { name: types } }); // Buscar el tipo por nombre, validar con [op.in] si el tipo no se encuentra
        if (!type) throw new Error(`Type '${types}' does not exist.`);
        pokemonDb.setTypes(type); // Establecer la relación entre el pokemon y el tipo

        //VERIFICAR SI RETORNO LOS POKEMONES DE LA BDD AQUI O EN OTRA FUNCION
        //const findpoke = await Pokemon.findOne({where:{name}, include: [Type]});
        //console.log(findpoke);

        return pokemonDb;
   } catch (error) {
        throw new Error(error.message);
   }
}

// Función para obtener la info de la DB
const getPokemonsDb = async () => {
    const allPokemonsDb = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
      },
    });
  
    const pokemones = allPokemonsDb.map( pokemon => {
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        attack: pokemon.attack,
        hp: pokemon.hp,
        defense: pokemon.defense,
        speed: pokemon.speed,
        height: pokemon.height,
        weight: pokemon.weight,
        types: pokemon.Types.map( types => types.name),
      };
    });
    return pokemones;
  };


module.exports = {
    getAllPokemons, getPokemonById, getPokemonByName, createPokemon, getPokemonsDb
}

