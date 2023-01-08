// USO DE EXPRESS-SESSION
import express from "express";
const router = express.Router();
import { isValidPassword } from "../services/UtilsSession.js";
import SessionService from "../services/Session.js";
const sessionService = new SessionService();
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { enviarEmailRegistro } from "../services/Nodemailer.js";
import upload from "./multerController.js";

// LOGIN STRATEGY
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "emailUser",
      passwordField: "passwordUser",
      passReqToCallback: true,
    },
    async (req, emailUser, passwordUser, done) => {
      const usuario = await sessionService.buscarUsuarioPorEmail(emailUser);
      if (!usuario) return done(null, false);
      if (!isValidPassword(usuario, passwordUser)) return done(null, false);
      return done(null, usuario);
    }
  )
);

// Serialize
passport.serializeUser((user, done) => {
  done(null, user.email);
});

// Deserialize
passport.deserializeUser(async (email, done) => {
  const user = await sessionService.buscarUsuarioPorEmail(email);
  done(null, user);
});

//Logueo y seteo cookie con logueo exitoso
router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/login-error",
    passReqToCallback: true,
  })
);

// REGISTRO
router.post("/register", upload.single("image"), async (req, res) => {
  const registerData = {
    email: req.body.registerEmail,
    password: req.body.registerPassword,
    nombre: req.body.registerNombre,
    direccion: req.body.registerDireccion,
    edad: req.body.registerEdad,
    contacto: req.body.registerContacto,
  };

  const response = await sessionService.registrarUsuario(registerData);
  if (response) {
    enviarEmailRegistro(registerData);
    res.redirect("/login");
  } else {
    res.redirect("/register-error");
  }
});
// ELIMINAR SESSION
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
  });
  res.redirect("/login");
});

export { router, passport };
