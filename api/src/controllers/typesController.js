const axios = require("axios");
const { Type } = require("../db");

const getAllPokemonsByType = async () => {
  try {
  
    const infoApi = (await axios.get("https://pokeapi.co/api/v2/type")).data;
    
    let arrayTypes = infoApi.results.map(type => type.name);

    await arrayTypes.map((type) => {
      Type.findOrCreate({
        where: { name: type }, defaults: { name: type }
      });
    })

   //Retorno los types al front
   const allTypes = await Type.findAll();
   return allTypes;

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllPokemonsByType
};