import "dotenv/config";
import cors from "cors";
import express from "express";

import models, { sequelize } from "./models/index.js";
import * as routes from "./routes/index.js";
import authMiddleware from "./middlewares/auth.js";

const app = express();
app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});

app.use(authMiddleware);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use("/session", routes.sessionRoute);
app.use("/users", routes.userRoute);
app.use("/messages", routes.messageRoute);
app.use("/tarefas", routes.tarefaRoute);

app.get("/", (req, res) => {
  res.send(
    "Received a GET HTTP method\nServidor rodando!\n" + process.env.MESSAGE,
  );
});

app.use((err, req, res, next) => {
  console.error("Erro capturado pelo Middleware:", err.name);

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).send({ error: "Este registro já existe (conflito de dados)." });
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).send({ error: "Dados inválidos ou incompletos." });
  }

  return res.status(500).send({ error: "Erro interno do servidor." });
});

const port = process.env.PORT ?? 3000;
const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {

  app.listen(port, () =>
    console.log(
      "Express-01 app listening on port " + port + "!\n" + process.env.MESSAGE,
    ),
  );
}).catch(err => console.error('Erro no sync:', err));;

export default app;