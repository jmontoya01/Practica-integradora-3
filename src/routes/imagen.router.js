const express = require("express");//requerimos express
const router = express.Router(); //creamos el rauter
const imagenModel = require("../models/image.js") //traemos el modelo de la imagen
const fs = require("fs").promises //requerimos fire sistem con .promises para manejar promesas
const path = require("path") //requerimos el path para saber que archivo borrar con la ruta 


//Routes
//configuramos las rutas, nos traemos la ruta que configuramos en la app.js anteriormente para el index

//esta es la primer ruta q creamos la traemos desde app.js cambia el app.get por router.get ya que app acá no esta instanciado
//ruta raiz
router.get("/", async (req, res) => {
    
    const imagenes = await imagenModel.find();//llamos el modelo de la imagen con el metodo find() para buscar las imagenes
    //La data que rercibimos no la podemos utilizar directamente en el render, primero toca mapear y luego se lo pasamos al render, si no hacemos esto nos saldra un error de handlebars
    const nuevoArrayImagenes = imagenes.map(imagen => {
        return {
        id: imagen._id,
        title: imagen.title,
        description: imagen.description,
        filename: imagen.filename,
        path: imagen.path
        }
    });
    res.render("index", {imagenes: nuevoArrayImagenes, user: req.session.user});
});

//creamos una ruta para cargar un formulario
router.get("/upload", (req, res) => {
    res.render("upload");
});

//creamos el post para enviar 
router.post("/upload", async (req, res) => {//usamos async por ser una operacion asincrona
    const imagen = new imagenModel()//creamos una imagen apartir del modelo
    //ahora le pasamos las propiedadesd de la imagen
    imagen.title = req.body.title //titulo viene del body con la propiedad tittle
    imagen.description = req.body.description //tambien viene del body con la propiedad description
    imagen.filename = req.file.filename 
    imagen.path = "/img/" + req.file.filename //para crear el path ponemos la ruta y lo concatenamos con el filename
    //ahora guardamos en la base de datos con el metodo await por ser asincrona
    await imagen.save();
    //si todo sale bien redirigimos a la raiz de la app
    res.redirect("/");
});

const requireAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/login");
    };
};

//creamos una ruta para borrar una imagen
//recibimos la ruta con el id de los params y el delete
router.get("/image/:id/delete", requireAuth, async (req, res) => {
    const {id} = req.params //pedimos el id de los params
    //borramos de la base de datos y gurado una referencia
    const imagen = await imagenModel.findByIdAndDelete(id) // llamamos el modelo y con el metodo de mongoose findByIdAndDelete borramos la imagen fisicamente
    await fs.unlink(path.resolve("./src/public" + imagen.path))//ahora para decirle que lo borre necesitamos el path requierimos el path tambien, con la ruta donde esta el archivo concatenamos con imagen.path
    //redireccionamos
    res.redirect("/")
})

//si borramos de la base de datos tambien tenemos que borrarlo donde lo estamos cargando para eso requerimos fs fire sistem



//exportamos 
module.exports = router;