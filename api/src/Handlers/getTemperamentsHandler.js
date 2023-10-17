const axios = require("axios");
const { Temperaments } = require("../db.js");
require("dotenv").config();
const API_KEY = process.env.API_KEY;

async function getTemprementos() {
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    const dogTemprement = response.data;

    const uniqueTemp = new Set();

    dogTemprement.forEach((dog) => {
      if (dog.temperament) {
        const breedTemperaments = dog.temperament
          .split(",")
          .map((t) => t.trim());
        breedTemperaments.forEach((temperament) => {
          uniqueTemp.add(temperament);
        });
      }
    });

    return Array.from(uniqueTemp);
  } catch (error) {
    throw new Error(
      "Error al obtener los temperamentos de la API: " + error.message
    );
  }
}

async function getTemprementDataBase() {
  try {
    const temperaments = await Temperaments.findAll();
    return temperaments.map((temperament) => temperament.name);
  } catch (error) {
    throw new Error(
      "Error al obtener los temperamentos de la base de datos: " + error.message
    );
  }
}

async function guardarTemperaments(temperamentsArray) {
  const existingTemperament = await getTemprementDataBase();

  const uniqueNewTemperaments = temperamentsArray.filter(
    (temperament) => !existingTemperament.includes(temperament)
  );

  try {
    if (uniqueNewTemperaments.length > 0) {
      await Temperaments.bulkCreate(
        uniqueNewTemperaments.map((temperament) => ({
          name: temperament,
        }))
      );

      console.log(
        "Temperamentos nuevos guardados con éxito en la base de datos."
      );
    } else {
      console.log(
        "No hay nuevos temperamentos para guardar en la base de datos."
      );
    }
  } catch (error) {
    throw new Error(
      "Error al guardar los temperamentos en la base de datos: " + error.message
    );
  }
}

const getTemperamentsHandler = async (req, res) => {
  try {
    const temperamentsArray = await getTemprementos();
    await guardarTemperaments(temperamentsArray);

    const allTemperaments = await Temperaments.findAll();

    res.status(200).json(allTemperaments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTemperamentsHandler };
