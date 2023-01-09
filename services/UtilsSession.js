import session from "express-session";
import MongoStore from "connect-mongo";
import bCrypt from "bcrypt";

export function createOnMongoStore() {
  const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
  return session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://coderBackend:coderBackendPW@clustercoderbackend.tct9by1.mongodb.net/ProyectoFinal?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
      ttl: 60,
      collectionName: "sessions",
    }),
    secret: "sh21501295asdjk",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000000 },
  });
}

export function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

export function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}
