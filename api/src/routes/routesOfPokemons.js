const { Router } = require('express');
const router = Router();
const {getAllPokemonsHandler, getPokemonsByIdHandler, createPokemonsHandler, deletePokemonsHandler } = require("../handlers/pokemonsHandler.js");


router.get('/', getAllPokemonsHandler);  

router.get('/:id', getPokemonsByIdHandler);

router.post('/create', createPokemonsHandler);

router.delete('/:id', deletePokemonsHandler);



module.exports = router;