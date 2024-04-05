const passport = require("passport");
const local = require("passport-local");
const UserModel = require("../models/user");
const {createHash, isValidPassword} = require("../utils/hashbcrypt");

const LocalStrategy = local.Strategy;

const initilizePassport = () => {
    passport.use("register", new LocalStrategy({
        //le decimos q queremos acceder al objeto request
        passReqToCallback: true,
        usernameField: "email"
    }, async (req, username, password, done) => {
        const {first_name, last_name, age, email} = req.body;
        try {
            //verificamos si ya existe resgitro con ese email
            let user = await UserModel.findOne({email});
            if (user) return done(null, false)
            let newUser = {//lo creamos si no lo encontramos
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)               
            };
            let result = await UserModel.create(newUser);
            return done(null, result);
        } catch (error) {
            return done(error)
        }
    }));

    //estrategia login
    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        //verificar si existe el usuariocon el email
        try {
            const user = await UserModel.findOne({email});
            if(!user) {
                console.log("No se encontro el recurso solicitado");
                return done(null, false);
            }
    
            //si existe verificamos la constraseña
            if (!isValidPassword(password, user)) {
                return done(null, false)
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        };
    }));

    //proceso de serialización: se encarga de convertir elobjeto de usuario en una cadena q se puede almacenar en la session 
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    //proceso de descerialización 
    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById({_id:id});
        done(null, user);
    })
}

module.exports = initilizePassport;