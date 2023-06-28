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
        const infoApi = (await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=10")).data;
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
         //Puedo usar Concat tambien return   pokemonsDb.concat(pokemonsApi);
        console.log(allPokemons);
         
        let pokemonByName;
        if(name){
            pokemonByName = allPokemons.filter( pokemon => pokemon.name === name );
            if(pokemonByName.length)  return pokemonByName;
            throw new Error(`There is no pokemon with the name ${name}`); 
           
        }
        return allPokemons;  //envio un array con todos los pokemones

    } catch (error) {
        throw new Error(error.message);
    }
}

/*
const getPokemonByName = async(name) => { 
    try {
        //const pokemonsDbByName = await Pokemon.findAll({ where: { name } });
        
        const allPokemons = await getAllPokemons();
        console.log(allPokemons);

        const pokemonsFilteredByName = allPokemons.filter( pokemon => pokemon.name === name);
        console.log(pokemonsFilteredByName);

        if(pokemonsFilteredByName.length === 0) throw new Error(`There is no pokemon with the name ${name}`);
        return [...pokemonsFilteredByName];  //devuelve un array, deberia ser OBJ?
        //return allPokemonsByName;   
    } catch (error) {
        throw new Error(error.message);
    }   
}
*/



//HACER 2 FUNCIONES getPokemonByIdAPI y getPokemonByIdbDD DEPENDIENDO DEL TIPO DE DATO DEL ID

const getPokemonById = async(id) => {
    
    const source = isNaN(id) ? "bdd" : "api";
    
    if(source === "api"){
        const allPokemons = await getAllPokemons();
    
        const pokemonById = allPokemons.filter( (pokemon) => pokemon.id === Number(id));
        //console.log(pokemonsFilteredById);
        //const pokemonId = [ ...pokemonsFilteredById];   
        //const pokemonId = pokemonDb.concat(pokemonsFilteredById);
        //console.log(pokemonById);
    
        if(pokemonById) return pokemonById; 
        throw new Error(`The pokemon with ID: ${id} was not found`);
        
        
    } else {
        const pokemonDb = await getPokemonsDb(); 
        const pokemonById = pokemonDb.filter( (pokemon) => pokemon.id === id);

        if(pokemonById.length) return pokemonById;
        throw new Error(`The pokemon with ID: ${id} was not found`);
        
    }
}
/*
const getPokemonById = async (id) => {
    const pokemonsInfo = await getAllPokemons();
    const pokemonsById = pokemonsInfo.filter((pokemon) => pokemon.id == id);
    if (pokemonsById.length) return pokemonsById;
    throw new Error(`No se encontró el pokemon con ID: ${id}`);
  };
*/

const createPokemon = async( name, image, hp, attack, defense, speed, height, weight, types ) => {
   try {
        //recibo info de la request del client por body(formulario)
        const [pokemonDb, exists] =  await Pokemon.findOrCreate({
           where: { name },
           defaults: { name, image, hp, attack, defense, speed, height, weight }
        });
        if(!pokemonDb.name) throw new Error("Missing required data.")
        if(!exists) throw new Error("The pokemon you are trying to create already exists.")
    
        const type = await Type.findAll({ where: { name: types } }); // Buscar el tipo por nombre, validar con [op.in] si el tipo no se encuentra
        if (!type) throw new Error(`Type '${types}' does not exist.`);
        pokemonDb.setTypes(type); // Establecer la relación entre el pokemon y el tipo

        //VERIFICAR SI RETORNO LOS POKEMONES DE LA BDD AQUI O EN OTRA FUNCION
        //const findpoke = await Pokemon.findOne({where:{name}, include: [Type]});
        //console.log(findpoke);

        //return pokemonDb;
   } catch (error) {
        throw new Error(error.message);
   }
}

/*
const createPokemon = async (
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    types
  ) => {
    const [pokemon, created] = await Pokemon.findOrCreate({
      where: { name },
      defaults: {
        name,
        image,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
      },
    });
  
    if (!created) throw new Error("Este pokemon ya existe en la DB");
  
    const typesDb = await Type.findAll({ where: { name: types } });
    pokemon.addType(typesDb);
  };
*/

module.exports = {
    getAllPokemons, getPokemonById, createPokemon, getPokemonsDb
}

