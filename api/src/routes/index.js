const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routesOfPokemons = require('./routesOfPokemons');
const routesOfTypes = require('./routesOfTypes');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//index.js es mi ruta intermedia (modulariza)
router.use("/pokemons", routesOfPokemons);

router.use("/types", routesOfTypes);


module.exports = router;
