const { Router } = require("express");
const {
  getDogsHandler,
  getDogByNameHandler,
} = require("../Handlers/getDogsHandler.js");
const { getDetailByIdHandler } = require("../Handlers/getDetailByIdHandler.js");
const { createDogHandler } = require("../Handlers/CreatDogHandler.js");
const { getTemperamentsHandler } = require("../Handlers/getTemperamentsHandler.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", getDogsHandler);
router.get("/dogs/:id", getDetailByIdHandler);
router.post("/dogs", createDogHandler);
router.get("/temperaments", getTemperamentsHandler);
router.get("/dogname", getDogByNameHandler);
module.exports = router;
