const axios = require("axios");
const { Dogs, Temperaments } = require("../db.js");
require('dotenv').config();
const API_KEY = process.env.API_KEY;

async function getDetailById(id, source) {
  try {
    let response;

    if (source === "api") {
      response = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`);
    } else {
      response = await Dogs.findByPk(id, {
        include: [
          {
            model: Temperaments,
            attributes: ["name"]
          }
        ]
      });
    }

    if (!response) {
      throw new Error("Dog Information not found");
    } else {
      const data = source === "api" ? response.data : response.toJSON();
      const weightInfo = data.weight.metric ? data.weight.metric : data.weight;
      const heightInfo = data.height.metric ? data.height.metric : data.height;

      const dogDetail = {
        id: data.id,
        name: data.name,
        origin: data.origin,
        life_span: data.life_span,
        image: source === "api" ? `https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg` : data.image,
        height: heightInfo,
        weight: weightInfo,
        temperament: source === "api" ? data.temperament : data.Temperaments.map(temp => temp.name),
      };
      return dogDetail;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = getDetailById;


