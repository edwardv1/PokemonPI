import { GET_POKEMONS, GET_POKEMON_BY_ID, ADD_POKEMON, FILTER, ORDER } from "./actions";

const initialState = {
    allPokemons: [],   //Array de objetos(ppokemon)
    pokemonsFilter: [],
    pokemonDetail: {},
    types: []
};

const reducer = (state= initialState, {type, payload}) => {
    switch (type) {
        case GET_POKEMONS:
            return {
                ...state,
                allPokemons: payload,
                pokemonsFilter: payload,
            };
        case GET_POKEMON_BY_ID:
            return {
                ...state,
                pokemonDetail: payload,
            };
            
           
    
        default:
            return {...state}
    }

}

export default reducer;