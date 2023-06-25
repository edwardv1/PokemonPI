import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const ADD_POKEMON = "ADD_POKEMON";
export const FILTER = "FILTER";
export const ORDER = "ORDER";
//export const REMOVE_POKEMON = "REMOVE_POKEMON";
//export const ERROR = "ERROR";


export const getAllPokemons = () => {
    let endpoint = "http://localhost:3001/pokemons";  //asi puede coincidir con el endpoint del backend
    return async (dispatch) => {
       try {
          const { data } = await axios.get(endpoint);
          return dispatch({
             type: GET_POKEMONS,
             payload: data,
          });
       } catch (error) {
            window.alert("An error has occurred while getting pokemons!");
            //HACER EL CONTROL DEL ERROR CON UN DISPATCH
       }
    };
 };

 export const getPokemonById = (id) => {
   let endpoint = `http://localhost:3001/pokemons/${id}`;  //asi puede coincidir con el endpoint del backend 
   return async (dispatch) => {
      try {
         const { data } = await axios.get(endpoint);
         return dispatch({
            type: GET_POKEMON_BY_ID,
            payload: data,
         });
      } catch (error) {
           window.alert("An error has occurred while getting a pokemon by ID!");
           //HACER EL CONTROL DEL ERROR CON UN DISPATCH
      }
   };
 }
 