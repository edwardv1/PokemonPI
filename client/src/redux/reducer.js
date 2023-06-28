import { GET_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_TYPES, CREATE_POKEMON } from "./actions";

const initialState = {
    allPokemons: [],   //Array de objetos(pokemon)
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
        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                allPokemons: payload,  //[ {pokemon} ]
                //pokemonsFilter: payload,
                //allPokemons: state.allPokemons.filter((pokemon)=> pokemon.name === payload)
            }
        case GET_TYPES:
            return {
                ...state,
                types: payload
            }
            //no es necesario hacer cambios ya que se crea en la DB
        case CREATE_POKEMON:
            return {
                ...state,
            };    
           
    
        default:
            return {...state}
    }

}

export default reducer;