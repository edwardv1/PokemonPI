import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_TYPES = "GET_TYPES";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const CLEAR_DETAIL = "CLEAR_DETAIL";

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

 export const clearDetail=() => {
   return {
     type: CLEAR_DETAIL
   }
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
         //console.log(response); me muestra el mensaje
         window.alert(response.data);
         return response;
      } catch (error) {
         window.alert("An error occurred while creating the pokemon! try again!");
      }
   };
}

 export const orderByName = (order) => {
    return (dispatch) => {
       return dispatch({
         type: ORDER_BY_NAME,
         payload: order
       })
    }
 }

export const orderByAttack = (order) => {
   return (dispatch) => {
      return dispatch({
        type: ORDER_BY_ATTACK,
        payload: order
      })
   }
}

export const filterByType = (type) => {
   return (dispatch) => {
      return dispatch({
        type: FILTER_BY_TYPE,
        payload: type
      })
   }
}

export const filterByOrigin = (origin) => {
   return (dispatch) => {
      return dispatch({
        type: FILTER_BY_ORIGIN,
        payload: origin
      })
   }
}