// PARA EJECUTAR LOS METHODS DESDE EL NAVEGADOR LA CONDICION NO DEBE ESTAR NEGADA

// ATENCION, SI VALIDAR USUARIO ESTA NEGADO ES PARA PODER UTILIZAR POSTMAN
// SIN TENER PROBLEMAS DE VALIDACION DE LOGIN

// CONDICION SIN NEGAR, USO COMPLETO DE NAVEGADOR - POSTMAN NO FUNCIONA
// CONDICION NEGADA, USO DE POSTMAN - FRONT NAVEGADOR NO FUNCIONA

export function validarUsuario(req, res, next) {
  console.log(req.cookies.userInfo);
  if (req.cookies.userInfo === "true") {
    next();
  } else {
    res.send("Usted no tiene acceso.");
  }
}

export function validarAdmin(req, res, next) {
  if (req.query.admin) {
    next();
  } else {
    res.send("Usted no tiene acceso.");
  }
}

// REVISAR DOCUMENTACION POSTMAN PARA USO DE COOKIES ?
