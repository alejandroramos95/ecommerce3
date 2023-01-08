import pino from "pino";

const loggerError = pino("error.log");
const loggerWarn = pino("warning.log");
const loggerInfo = pino("Info.log");

loggerError.level = "error";
loggerWarn.level = "warn";
loggerInfo.level = "info";

export function routeAndMethodsInfo(req) {
  loggerInfo.info(
    `Petición entrante -----> Ruta: ${req.url}, method: ${req.method}`
  );
}

export function routeNonExistWarn() {
  loggerWarn.warn("Ruta incorrecta");
  loggerInfo.warn("Ruta incorrecta");
}

export function errorFound(error) {
  loggerError.error(error);
}
