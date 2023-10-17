const infoClean = (arr) => {
    return arr.map((peri) => ({
      id:  peri?.id,
      name:  peri?.name,
      life_span: peri?.life_span,
      height:  peri.height.metric,
      weight:  peri.weight.metric,
      image: peri.image ? `https://cdn2.thedogapi.com/images/${peri.reference_image_id}.jpg` : peri.image,
      temperament: peri.temperament,
      created: false
  })
  )};

  module.exports = {infoClean}