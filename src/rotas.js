const express = require("express");

const {
  listarContas,
  criarConta,
  atualizarConta,
  deletarConta,
  exibirSaldo,
  exibirExtrato,
} = require("./controllers/conta");

const { 
    depositar, 
    sacar, 
    transferir 
} = require("./controllers/transacoes");

const {
  validarSenha,
  validarBody,
  validarContaExistente,
  validarDeposito,
  validarExtrato,
  validarNumeroConta,
  validarSaldoParaDeletarConta,
  validarSaque,
  validarTransferencia,
  validarEmitirSaldo,
} = require("./middleware/validators");

const router = express();

router.get("/contas", validarSenha, listarContas);
router.post("/contas", validarBody, validarContaExistente, criarConta);
router.put("/contas/:numeroConta/usuario", validarNumeroConta, validarBody, validarContaExistente, atualizarConta);
router.delete("/contas/:numeroConta", validarNumeroConta, validarSaldoParaDeletarConta, deletarConta);
router.get("/contas/saldo", validarEmitirSaldo, exibirSaldo);
router.get("/contas/extrato", validarExtrato, exibirExtrato);

router.post("/transacoes/depositar", validarDeposito, depositar);
router.post("/transacoes/sacar", validarSaque, sacar);
router.post("/transacoes/transferir", validarTransferencia, transferir);

module.exports = { router };
