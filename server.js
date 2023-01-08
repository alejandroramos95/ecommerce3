import express from "express";
import cookieParser from "cookie-parser";
import routerCarrito from "./controllers/carritosController.js";
import routerProductos from "./controllers/productosController.js";
import { router, passport } from "./controllers/sessionController.js";
import { createOnMongoStore } from "./services/UtilsSession.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import { createServer } from "http";
import { Server as IOServer } from "socket.io";

const app = express();
const httpServer = new createServer(app);
const io = new IOServer(httpServer);

// Public statement
app.use(express.static("public"));

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

// WEBSOCKET

// Refresh Vista Productos
import ContenedorProductosDaos from "./DAOs/Producto.dao.js";
const contenedorProductos = new ContenedorProductosDaos();

export async function refreshProducts() {
  io.sockets.emit("lista-productos", await contenedorProductos.leerProductos());
}
io.on("connection", async () => {
  io.sockets.emit("lista-productos", await contenedorProductos.leerProductos());
});

// Refresh Vista Carrito
import ContenedorCarritosDaos from "./DAOs/Carrito.dao.js";
const contenedorCarritos = new ContenedorCarritosDaos();

export async function refreshCarrito(idCarr) {
  io.sockets.emit("carrito", await contenedorCarritos.obtenerCarrito(idCarr));
}
io.on("connection", async () => {
  io.sockets.emit("carrito", await contenedorProductos.leerProductos());
});

const PORT = 8080;

httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${httpServer.address().port}`
  );
});
httpServer.on("error", (error) => console.log(`Error en servidor ${error}`));
