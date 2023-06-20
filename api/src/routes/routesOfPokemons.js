const { Router } = require('express');
const router = Router();
const {getAllPokemonsHandler, getPokemonsByIdHandler, createPokemonsHandler } = require("../handlers/pokemonsHandler.js");


router.get('/', getAllPokemonsHandler);

router.get('/:id',getPokemonsByIdHandler);

router.post('/', createPokemonsHandler);


module.exports = router;