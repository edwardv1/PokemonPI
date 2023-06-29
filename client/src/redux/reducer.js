import { GET_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_TYPES, CREATE_POKEMON, 
        ORDER_BY_NAME, ORDER_BY_ATTACK, FILTER_BY_TYPE, FILTER_BY_ORIGIN } from "./actions";

const initialState = {
    allPokemons: [],   //Array de objetos(pokemon)
    pokemonsFiltered: [],
    pokemonDetail: {},
    types: [],
    filters: false
};

const reducer = (state= initialState, {type, payload}) => {
    switch (type) {

        case GET_POKEMONS:
            return {
                ...state,
                allPokemons: payload,
                pokemonsFilter: payload,
            }

        case GET_POKEMON_BY_ID:
            return {
                ...state,
                pokemonDetail: payload,
            }

        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                filters: true,
                pokemonsFiltered: payload,  
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
            }

        case ORDER_BY_NAME:
            if(payload==="Ascending"){
                const allPokemonsCopy = [...state.allPokemons];
                return{
                    ...state,
                    filters: true,
                    pokemonsFiltered: allPokemonsCopy.sort((prev, next)=>{
                        if(prev.name > next.name) return -1
                        if(prev.name < next.name) return 1
                        return 0
                    })
                }
            } else if(payload==="Descending"){
                const allPokemonsCopy = [...state.allPokemons];
                return{
                    ...state,
                    filters: true,
                    pokemonsFiltered: allPokemonsCopy.sort((prev, next)=>{
                        if(prev.name > next.name) return 1
                        if(prev.name < next.name) return -1
                        return 0
                    })
                }
            }    
        break;

        case ORDER_BY_ATTACK:
            if(payload==="Ascending"){
                const allPokemonsCopy = [...state.allPokemons];
                return{
                    ...state,
                    filters: true,
                    pokemonsFiltered: allPokemonsCopy.sort((a,b) => a.attack - b.attack)
                }
            } else if(payload==="Descending"){
                const allPokemonsCopy = [...state.allPokemons];
                return{
                    ...state,
                    filters: true,
                    pokemonsFiltered: allPokemonsCopy.sort((a,b) => b.attack - a.attack)
                }
            }    
        break;

        case FILTER_BY_TYPE:
            let pokemonFilteredByType;
            if (payload === "all") {
                pokemonFilteredByType = [...state.allPokemons];
            } else {
                pokemonFilteredByType = [...state.allPokemons].filter((pokemon) => pokemon.types.includes(payload));
            }
            return {
                ...state,
                filters: true,
                pokemonsFiltered: pokemonFilteredByType,
            }

        case FILTER_BY_ORIGIN:
            let pokemonsFromApi;
            let pokemonsFromDb;
            const regexUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
            if (payload === "all") {
                return {
                    ...state,
                    filters: true,
                    pokemonsFiltered: [...state.allPokemons]
                }
            } 
            if(payload === "api"){
                pokemonsFromApi = [...state.allPokemons].filter((pokemon) => typeof(pokemon.id) === "number");
                return {
                    ...state,
                    filters: true,
                    pokemonsFiltered: pokemonsFromApi
                }
            } 
            if(payload === "bdd"){
                pokemonsFromDb = [...state.allPokemons].filter((pokemon) => regexUUID.test(pokemon.id));
                return {
                    ...state,
                    filters: true,
                    pokemonsFiltered: pokemonsFromDb
                }
            }
        break;

        default:
            return {...state}
    }

}

export default reducer;