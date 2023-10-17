const axios = require("axios");
const { Dogs, Temperaments } = require("../db.js");
const { Op } = require("sequelize");
require("dotenv").config();
const API_KEY = process.env.API_KEY;
const { infoClean } = require("../utiles/infoClean.js");

const getAllDogs = async () => {
  try {
    const dogsDb = await Dogs.findAll();
    const infoApi = (
      await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    ).data;

    const dogsApi = infoClean(infoApi);
    return [...dogsApi, ...dogsDb];
  } catch {
    throw new Error("no information");
  }
};

const getDogByName = async (name) => {
  try {
    const infoApi = (
      await axios.get(
        `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`
      )
    ).data;
    const dogsApi = infoClean(infoApi);

    const filterNameApi = dogsApi.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase())
    );

    const filterNameDb = await Dogs.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      limite: 15,
      include: {
        model: Temperaments,
        attributes: ["name"],
      },
    });

    return [...filterNameApi, ...filterNameDb];
  } catch (error) {
    throw new Error("no information");
  }
};

module.exports = { getAllDogs, getDogByName };
