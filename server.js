import express from "express";
import cookieParser from "cookie-parser";
import routerCarrito from "./controllers/carritosController.js";
import routerProductos from "./controllers/productosController.js";
import { router, passport } from "./controllers/sessionController.js";
import { createOnMongoStore } from "./services/UtilsSession.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// Public statement
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/public/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(createOnMongoStore());

// MIDDLEWARE PASSPORT
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/sessions/", router);

app.use((req, res, next) => {
  if (req.session.passport && req.session.passport.user) {
    res.cookie("userEmail", req.session?.passport.user);
    res.cookie("userInfo", true);
    next();
  } else {
    res.cookie("userEmail", `Aun no ha ingresado`);
    res.cookie("userInfo", false);
    next();
  }
});

// RUTAS PRODUCTOS Y CARRITOS
app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

// ARCHIVOS PUBLICOS, VISTAS HTML
app.get("/:file", (req, res) => {
  res.sendFile(__dirname + `/public/${req.params.file}.html`);
});

app.all("*", (req, res) => {
  res.status(404).send({
    error: -2,
    descripcion: `Ruta '${req.originalUrl}' no implementada`,
  });
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
