const {Dogs} = require("../db")


 async function deletDog (name)  {
    try {
     await Dogs.destroy({where : { name }})

    } catch (error) {
        throw new Error (" we can't found the name")
    }

}

module.exports = {deletDog}