let { 
  contas, 
  idConta 
} = require("../bancodedados");

const {
  obterContaPorNumero,
  obterIndiceDaContaPorNumero,
  obterTransferenciasRecebidasPorNumero,
  obterTransferenciasEnviadasPorNumero,
  obterSaldoPorNumero,
  obterDepositosDaContaPorNumero,
  obterSaquesDaContaPorNumero,
} = require("../helpers/utils");

const listarContas = (req, res) => {
  res.send(contas);
};

const criarConta = (req, res) => {
  const usuario = req.body;

  const novaConta = {
    numero: idConta,
    saldo: 0,
    usuario,
  };

  contas.push(novaConta);
  idConta++;

  res.status(204).send();
};

const atualizarConta = async (req, res) => {
  const usuario = req.body;
  const { numeroConta } = req.params;

  const conta = await obterContaPorNumero(numeroConta);

  conta.usuario = usuario;
  res.status(204).send();
};

const deletarConta = async (req, res) => {
  const { numeroConta } = req.params;

  const indiceConta = await obterIndiceDaContaPorNumero(numeroConta);

  contas.splice(indiceConta, 1);

  res.status(204).send();
};

const exibirSaldo = async (req, res) => {
  const { numero_conta } = req.query;

  const saldoConta = await obterSaldoPorNumero(numero_conta);

  res.status(200).send({ saldo: saldoConta });
};

const exibirExtrato = async (req, res) => {
  const { numero_conta } = req.query;

  const transferenciasEnviadas = await obterTransferenciasEnviadasPorNumero(numero_conta);
  const transferenciasRecebidas = await obterTransferenciasRecebidasPorNumero(numero_conta);
  const depositosDaConta = await obterDepositosDaContaPorNumero(numero_conta);
  const saquesDaConta = await obterSaquesDaContaPorNumero(numero_conta);

  const novoExtrato = {
    depositos: depositosDaConta,
    saques: saquesDaConta,
    transferenciasEnviadas,
    transferenciasRecebidas,
  };

  res.status(200).send(novoExtrato);
};

module.exports = {
  listarContas,
  criarConta,
  atualizarConta,
  deletarConta,
  exibirSaldo,
  exibirExtrato,
};
