const { Dogs, Temperaments } = require("../db.js");

const creatDog = async (
  name,
  weight,
  height,
  life_span,
  image,
  origin,
  temperament
) => {
  try {
    if (!temperament.length) {
      throw new Error("you have to choice at least one Temperament");
    }

    const existingDog = await Dogs.findOne({ where: { name } });
    if (existingDog) {
      throw new Error("A dog with the same name already exists");
    }
    
    const temperaments = await Temperaments.findAll({
      where: { name: temperament },
    });

    const newDog = await Dogs.create({
      name,
      weight,
      height,
      life_span,
      image,
      origin,
      temperament,
    });

    await newDog.addTemperament(temperaments);
    return newDog;
  } catch (error) {
    throw new Error("No se pudo crear el perro");
  }
};
module.exports = { creatDog };
