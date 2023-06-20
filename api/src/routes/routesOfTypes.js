const { Router } = require('express');
const router = Router();
const { getAllPokemonsTypesHandler } = require("../handlers/typesHandler.js");

router.get('/', getAllPokemonsTypesHandler);

module.exports = router;