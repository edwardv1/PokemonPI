import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_TYPES = "GET_TYPES";
export const CREATE_POKEMON = "CREATE_POKEMON";
// export const ADD_POKEMON = "ADD_POKEMON";
// export const FILTER = "FILTER";
// export const ORDER = "ORDER";
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
 export const getPokemonByName = (name) => {
   let endpoint = `http://localhost:3001/pokemons/?name=${name}`;  //asi puede coincidir con el endpoint del backend 
   return async (dispatch) => {
      try {
         const { data } = await axios.get(endpoint);
         return dispatch({
            type: GET_POKEMON_BY_NAME,
            payload: data,
         });
      } catch (error) {
           window.alert("An error has occurred while getting a pokemon by name!");
           //HACER EL CONTROL DEL ERROR CON UN DISPATCH
      }
   };
 }

 export const getTypes = () => {
   let endpoint = `http://localhost:3001/types/`;  //asi puede coincidir con el endpoint del backend 
   return async (dispatch) => {
      try {
         const { data } = await axios.get(endpoint);
         return dispatch({
            type: GET_TYPES,
            payload: data,
         });
      } catch (error) {
           window.alert("An error has occurred while getting types!");
           //HACER EL CONTROL DEL ERROR CON UN DISPATCH
      }
   };
 }

 export const createPokemon = (payload) => {
   let endpoint = `http://localhost:3001/pokemons/create`;  //asi puede coincidir con el endpoint del backend 
   return async (dispatch) => {
      try {
         const response = await axios.post(endpoint, payload);
         console.log(response);
         window.alert("The pokemon has been created successfully");
         return response;
      } catch (error) {
         window.alert("The pokemon already exists!");
      }
   };
 }

