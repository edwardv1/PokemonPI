const axios = require("axios");
const { Type } = require("../db");

const getAllPokemonsByType = async () => {
  try {
    //Obtengo los types de la API
    const infoApi = (await axios.get("https://pokeapi.co/api/v2/type")).data;
    //console.log(infoApi);
    let arrayTypes = infoApi.results.map(type => type.name);
    //console.log(arrayTypes);

   //PROBAR SIN EL PROMISE ALL... si incluyo exists me devuelve undefined
   //Guardo los types a la DB
    await arrayTypes.map((type) => {
      Type.findOrCreate({
        where: { name: type }, defaults: { name: type }
      });
    })


   //if(!arrayTypes) throw new Error("These types already exist in the database.")

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