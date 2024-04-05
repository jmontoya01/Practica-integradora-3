const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs = require("express-handlebars");
const multer = require("multer");
const passport = require("passport");//modulo passport
const session = require("express-session");
const initilizePassport = require("./config/passport.config.js");//modulo de inicializacion de passport
const imagenRouter = require("./routes/imagen.router.js"); //llamamos a imagenRouter para usar las rutas
const viewsRouter = require("./routes/views.router.js");//importamos el router de las vistas
const sessionRouter = require("./routes/session.router.js");
require("../src/database.js");//requerimos database.js con la configuración para conectar mongoose

//Handlebars
//acá le decimos a express queda cada vez que encuentre una extensión handlebars trae el modulo exphbs y usa el metodo engine()
app.engine("handlebars", exphbs.engine());
//acá le decimos q la vista sea con handlebars
app.set("view engine", "handlebars");
//y acá en que carpeta buscar esas vistas
app.set("views", "./src/views");


//Midlewares
//Midlewares para poder usar json
app.use(express.json());
//para manejar datos complejos
app.use(express.urlencoded({extended:true}));
//acá le decimos a express que tenemos una carpeta para archivos estaticos que estan en la carpeta public
app.use(express.static("./src/public"));

// configuramos multer creando el storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/img") //acá configuramos la ruta donde multer guardara las imagenes                                                                                                              
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname) // acá configuramos que los archivos se guarden con el nombre original
    }
});
//ya que tenemos el storage podemos configurar multer
app.use(multer({storage}).single("image"));

//session
app.use(session({
    secret: "secretcoder",
    resave: false,
    saveUninitialized: false
}));

//passport
app.use(passport.session());
initilizePassport();

//rutas
app.use("/", imagenRouter); //acá deciemos que en el index usa imagenRouter
app.use("/", viewsRouter);
app.use("/", sessionRouter);



//iniciamos el servidor con el listen
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
});

