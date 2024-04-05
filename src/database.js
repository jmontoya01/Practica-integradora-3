const mongoose = require("mongoose"); //llamamos a mongoose 


mongoose.connect("mongodb+srv://jeffquetas:jeff1302@cluster0.zqiftye.mongodb.net/coderest")//con el modulo mongoose y el metodo connect hacemos la conexion, entre parentesis va el localhost por defecto de mongo y el nombre de la colección
    .then(() => console.log("Conectado a MongoDB"))//con la nueva actualizacion ponemos .then() para confirmar que todo salio bien  
    .catch(error => console.log(error)) //.catch() por si sale un error

