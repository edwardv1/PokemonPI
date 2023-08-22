const axios = require('axios');
const { Pokemon, Type } = require('../db');


// Función para obtener pokemones de la DB
const getPokemonsDb = async () => {
    try {
        const allPokemonsDb = await Pokemon.findAll({
            include: {
              model: Type,
              attributes: ["name"],
            },
          });
        
          const pokemons = allPokemonsDb?.map( pokemon => {
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
              types: pokemon.types.map( types => types.name),
            };
          });
          return pokemons;   
    } catch (error) {
        throw new Error(error.message)
    }   
};

// Función para obtener pokemones de la API
const getPokemonsApi = async () => {
    try {
        const infoApi = (await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=100")).data;

        //Funcion que limpia la info que viene de la API
        const cleanPokemonsApi = await infoApi.results.map( async (pokemon) => {
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
        const allPokemons = await Promise.all(cleanPokemonsApi);
        return allPokemons; 
    } catch (error) {
        throw new Error(error.message);
    }
}

// Función para enviar respuesta al Front, ya sea 1 pokemon (por su nombre) o todos los pokemones
const getAllPokemons = async(name) => {
    try {
        let pokemonsDb = await getPokemonsDb();
        let pokemonsApi = await getPokemonsApi();
        let allPokemons = [...pokemonsDb, ...pokemonsApi];
         
        let pokemonByName;
        if(name){
            pokemonByName = allPokemons.filter( pokemon => pokemon.name === name );
            if(pokemonByName.length)  return pokemonByName;
            throw new Error(`There is no pokemon with the name ${name}.`); 
           
        }
        return allPokemons;  

    } catch (error) {
        throw new Error(error.message);
    }
}

//Funcion que retorna un pokemon buscado por id
const getPokemonById = async(id) => {
    
    const source = isNaN(id) ? "bdd" : "api";
    
    if(source === "api"){
        const allPokemons = await getAllPokemons();
        const pokemonById = allPokemons.filter( (pokemon) => pokemon.id === Number(id));
    
        if(pokemonById) return pokemonById; 
        throw new Error(`The pokemon with ID: ${id} was not found`);   
    } else {
        const pokemonDb = await getPokemonsDb(); 
        const pokemonById = pokemonDb.filter( (pokemon) => pokemon.id === id);

        if(pokemonById.length) return pokemonById;
        throw new Error(`The pokemon with ID: ${id} was not found`);
    }
}


const createPokemon = async( name, image, hp, attack, defense, speed, height, weight, types ) => {
   try {
        const [pokemonDb, created] =  await Pokemon.findOrCreate({
           where: { name },
           defaults: { name, image, hp, attack, defense, speed, height, weight }
        });
        
        if(!created) throw new Error("The pokemon you are trying to create already exists.")
        
        // Establece la relación entre el pokemon y el tipo
        const type = await Type.findAll({ where: { name: types } });
        if (!type) throw new Error(`Type '${types}' does not exist.`);
        pokemonDb.setTypes(type); 

   } catch (error) {
        throw new Error(error.message);
   }
}

const deletePokemon = async(id) => {
    try {
        const pokemonDeleted = await Pokemon.findByPk(id);  //findOne({where:{id: id}})
        if(pokemonDeleted) {
            let pokeAux = pokemonDeleted;
            await Pokemon.destroy({where: {id}});
            return pokeAux;
        }
        throw new Error(`The pokemon with id ${id} doesnt exists`);
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getAllPokemons, getPokemonById, createPokemon, getPokemonsDb, deletePokemon
}

