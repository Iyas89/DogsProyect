const { getAllDogs, getDogByName } = require("../controllers/getDogs.js");

const getDogsHandler = async (req, res) => {
  try {
    const response = await getAllDogs();
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getDogByNameHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const dogByName = await getDogByName(name);
      res.status(200).json(dogByName);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { getDogsHandler, getDogByNameHandler };
