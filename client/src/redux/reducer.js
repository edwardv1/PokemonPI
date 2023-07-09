import { GET_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_TYPES, ORDER_BY_NAME,
         ORDER_BY_ATTACK, FILTER_BY_TYPE, FILTER_BY_ORIGIN, CLEAR_DETAIL, REFRESH_POKEMONS, CONTROL_MODAL } from "./actions";
    

const initialState = {
    allPokemons: [],  
    pokemonsFiltered: [],
    pokemonDetail: {},
    types: [],
    filters: false,
    orders: false,
    modal: false
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

        case CLEAR_DETAIL:
            return {
                ...state,
                pokemonDetail: {}
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

        case ORDER_BY_NAME:
            if(state.filters){
                if(payload==="Ascending"){
                    return{
                        ...state,   
                        filters: true,
                        orders: true,
                        pokemonsFiltered: [...state.pokemonsFiltered].sort((prev, next)=>{
                            if(prev.name > next.name) return -1
                            if(prev.name < next.name) return 1
                            return 0
                        })
                    }
                } else if(payload==="Descending"){
                    return{
                        ...state,    
                        filters: true,
                        orders: true,
                        pokemonsFiltered: [...state.pokemonsFiltered].sort((prev, next)=>{
                            if(prev.name > next.name) return 1
                            if(prev.name < next.name) return -1
                            return 0
                        })
                    }
                }    
            } else {
                if(payload==="Ascending"){
                    return{
                        ...state,    
                        filters: true,
                        orders: true,
                        pokemonsFiltered: [...state.allPokemons].sort((prev, next)=>{
                            if(prev.name > next.name) return -1
                            if(prev.name < next.name) return 1
                            return 0
                        })
                    }
                } else if(payload==="Descending"){
                    return{
                        ...state,   
                        filters: true,
                        orders: true,
                        pokemonsFiltered: [...state.allPokemons].sort((prev, next)=>{
                            if(prev.name > next.name) return 1
                            if(prev.name < next.name) return -1
                            return 0
                        })
                    }
                }    
            }
        break;

        case ORDER_BY_ATTACK:
            if(state.filters){
                if(payload==="Ascending"){
                    return{
                        ...state,   
                        filters: true,
                        orders: true,
                        pokemonsFiltered: [...state.pokemonsFiltered].sort((a,b) => a.attack - b.attack)
                    }
                } else if(payload==="Descending"){
                    return{
                        ...state,   
                        filters: true,
                        orders: true,
                        pokemonsFiltered: [...state.pokemonsFiltered].sort((a,b) => b.attack - a.attack)
                    }
                }    
            } else {
                if(payload==="Ascending"){
                    return{
                        ...state,
    
                        filters: true,
                        orders: true,
                        pokemonsFiltered: [...state.allPokemons].sort((a,b) => a.attack - b.attack)
                    }
                } else if(payload==="Descending"){
                    return{
                        ...state,  
                        filters: true,
                        orders: true,
                        pokemonsFiltered: [...state.allPokemons].sort((a,b) => b.attack - a.attack)
                    }
                }    
            }
        break;

        case FILTER_BY_TYPE:
            let pokemonFilteredByType;
            pokemonFilteredByType = [...state.allPokemons].filter((pokemon) => pokemon.types.includes(payload));
            return {
                ...state,
                filters: true,
                pokemonsFiltered: pokemonFilteredByType,
            }

        case FILTER_BY_ORIGIN:
            let pokemonsFromApi;
            let pokemonsFromDb;
            const regexUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
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

        case REFRESH_POKEMONS:
            return {
                ...state,
                filters: true,
                pokemonsFiltered: [...state.allPokemons]
            }
        
        case CONTROL_MODAL:
            if(payload === "isOpened"){
                return{
                    ...state,
                    modal: true
                }
            }
            if(payload === "isClosed"){
                return{
                    ...state,
                    modal: false
                }
            }
        break;

        default:
            return {...state}
    }

}

export default reducer;