const { creatDog } = require("../controllers/CreatDog");

const createDogHandler = async (req, res) => {
  const { name, weight, height, life_span, image, origin, temperament } =
    req.body;
  try {
    const response = await creatDog(
      name,
      weight,
      height,
      life_span,
      image,
      origin,
      temperament
    );
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { createDogHandler };
