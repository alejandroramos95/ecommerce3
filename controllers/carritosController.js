import express from "express";
import ContenedorCarritosDaos from "../DAOs/Carrito.dao.js";
import { errorFound } from "../services/LoggerPino.js";
import { validarUsuario } from "../services/ValidarLogin.js";
import SessionService from "../services/Session.js";

const router = express.Router();

const contenedorCarritos = new ContenedorCarritosDaos();
const sessionService = new SessionService();

// Crear carrito http://localhost:8080/api/carrito/ DB OKok
router.post(
  "/",
  /* validarUsuario, */ async (req, res) => {
    const carritoCreado = await contenedorCarritos.crearCarritoEnDB();
    res.cookie("idCarritoNuevo", carritoCreado);
    res.redirect("/api/carrito");
  }
);

// Eliminar carrito http://localhost:8080/api/carrito/1 DB OKok
router.delete(
  "/:id",
  /* validarUsuario, */ async (req, res) => {
    const carritoBorrado = await contenedorCarritos.borrar(req.params.id);
    res.send(carritoBorrado);
  }
);

// Listar todos los carritos http://localhost:8080/api/carrito/ DB OKok
router.get(
  "/",
  /* validarUsuario, */ async (req, res) => {
    let response;
    const listaCarritos = await contenedorCarritos.leerCarritos();
    if (listaCarritos.length) {
      response = listaCarritos;
    } else {
      response = { error: "No hay carritos cargados." };
      errorFound(response);
    }
    res.render("carrito", {
      response,
      email: req.cookies.userEmail,
      carrito: req.cookies.idCarritoNuevo,
    });
  }
);

// Listar productos dentros del carrito por ID http://localhost:8080/api/carrito/1/productos DB OKok
router.get(
  "/:id/productos",
  /* validarUsuario, */ async (req, res) => {
    const carrito = await contenedorCarritos.obtenerCarrito(req.params.id);
    let response;
    if (!carrito) {
      response = { error: "No existe el carrito." };
      errorFound(response);
    } else if (!carrito.productos.length) {
      response = { error: "Este carrito no tiene productos." };
      errorFound(response);
    } else {
      response = carrito;
    }
    res.send(response);
  }
);

// Ingresar productos por ID al carrito por su ID http://localhost:8080/api/carrito/1/productos/1 DB OKok
router.post(
  "/:id/productos/:idPrd",
  /* validarUsuario, */ async (req, res) => {
    const response = await contenedorCarritos.guardarProductoEnCarrito(
      req.params.id,
      req.params.idPrd
    );
    res.send(response);
  }
);

// Eliminar un producto del carrito por ID http://localhost:8080/api/carrito/1/productos/1 DB
router.delete(
  "/:id/productos/:idPrd",
  /* validarUsuario, */ async (req, res) => {
    const response = await contenedorCarritos.eliminarProductoDeCarrito(
      req.params.id,
      req.params.idPrd
    );
    res.send(response);
  }
);

export default router;
