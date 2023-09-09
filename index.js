const express = require("express");
const app = express();
const { router } = require("./src/rotas");

app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});

app.use(router);
