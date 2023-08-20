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
export const REFRESH_POKEMONS = "REFRESH_POKEMONS";
export const CONTROL_MODAL = "CONTROL_MODAL";
export const ERROR = "ERROR";
export const CONTROL_MODAL_ERROR = "CONTROL_MODAL_ERROR";
export const REMOVE_POKEMON = "REMOVE_POKEMON";


export const getAllPokemons = () => {
    let endpoint = "/pokemons"; 
    return async (dispatch) => {
       try {
          const { data } = await axios.get(endpoint);
          return dispatch({
             type: GET_POKEMONS,
             payload: data,
          });
       } catch (error) {
         //window.alert(error.message);  //"An error has occurred while getting pokemons!"
         return dispatch({
            type: "ERROR",
            payload: "An error has occurred while getting pokemons!"
         })
       }
    };
 };

 export const getPokemonById = (id) => {
   let endpoint = `/pokemons/${id}`;  
   return async (dispatch) => {
      try {
         const { data } = await axios.get(endpoint);
         return dispatch({
            type: GET_POKEMON_BY_ID,
            payload: data,
         });
      } catch (error) {
         //window.alert(error.message); //"An error has occurred while getting a pokemon by ID!"
         return dispatch({
            type: "ERROR",
            payload: "An error has occurred while getting a pokemon by ID!"
         })
      }
   };
 }

 export const clearDetail=() => {
   return {
     type: CLEAR_DETAIL
   }
 }

 export const getPokemonByName = (name) => {
   let endpoint = `/pokemons/?name=${name}`;  
   return async (dispatch) => {
      try {
         const { data } = await axios.get(endpoint);
         
         return dispatch({
            type: GET_POKEMON_BY_NAME,
            payload: data,
         });
      } catch (error) {
         //window.alert(error.message);  //"An error has occurred while getting a pokemon by name!"
         return dispatch({
            type: "ERROR",
            payload: "Pokemon not found! Try again!"
         })
      }
   };
 }

export const getTypes = () => {
   let endpoint = `/types`; 
   return async (dispatch) => {
      try {
         const { data } = await axios.get(endpoint);
         return dispatch({
            type: GET_TYPES,
            payload: data,
         });
      } catch (error) {
         //window.alert(error.message);  //"An error has occurred while getting types!"
         return dispatch({
            type: "ERROR",
            payload: "An error has occurred while getting types!"
         })
      }
   };
 }

export const createPokemon = (payload) => {
   let endpoint = `/pokemons/create`; 
   return async (dispatch) => {
      try {
         const response = await axios.post(endpoint, payload);
         //window.alert(response.data);
         return dispatch({
            type: "CREATE_POKEMON",
            payload: response.data
         })
      } catch (error) {
         //window.alert(error.message); //"An error occurred while creating the pokemon! try again!"
         return dispatch({
            type: "ERROR",
            payload: "The pokemon you tried to create already exists! Try again!"
         })
      }
   };
}

export const removePokemon = (id) => {
   let endpoint = `/pokemons/${id}`; 
   return async (dispatch) => {
      try {
         const response = await axios.delete(endpoint);
         //window.alert(response.data);
         return dispatch({
            type: REMOVE_POKEMON,
            payload: response.data
         });  
      } catch (error) {
         //window.alert(error);
         return dispatch({
            type: "ERROR",
            payload: "An error occurred while deleting the pokemon! try again!"
         })
      }
   };
 }

export const successModal = (payload) => {
   return (dispatch) => {
      return dispatch({
        type: CREATE_POKEMON,
        payload: payload
      })
   }
}

export const successModalRemove = (payload) => {
   return (dispatch) => {
      return dispatch({
        type: REMOVE_POKEMON,
        payload: payload
      })
   }
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

export const refreshPokes = () => {
   return (dispatch) => {
      return dispatch({
        type: REFRESH_POKEMONS
      })
   }
}

export const handlerModal = (payload) => {
   return (dispatch) => {
      return dispatch({
        type: CONTROL_MODAL,
        payload: payload
      })
   }
}

export const errorModal = (payload) => {
   return (dispatch) => {
      return dispatch({
        type: ERROR,
        payload: payload
      })
   }
}

export const hanlderErrorModal = (payload) => {
   return (dispatch) => {
      return dispatch({
        type: CONTROL_MODAL_ERROR,
        payload: payload
      })
   }
}
