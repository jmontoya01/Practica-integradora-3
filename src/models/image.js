const mongoose = require("mongoose"); //acá trabajaremos con mongoose entonces lo importamos

const imagenSchema = new mongoose.Schema({ //acá creamos el esquema que va a tener las imagenes
    title: String,
    description: String, //estos son los datos con su tipo de dato, si fuera numero serian Number, si fuera bolean seria Bolean etc..
    filename: String,
    path: String // guardamos el path que es la ubicacion donde se va a guardar el archivo
});


const imagenModel = mongoose.model("imagenes", imagenSchema) //acá creamos el modelo de la imagen con el nombre de la colección "imagenes" y el schema "imagenSchema"

module.exports = imagenModel;

