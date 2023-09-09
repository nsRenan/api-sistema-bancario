const { 
    saques, 
    depositos, 
    transferencias 
} = require("../bancodedados");

const getData = require("../helpers/dateFormat");
const { obterContaPorNumero } = require("../helpers/utils");

const depositar = async (req, res) => {
  const { numero_conta, valor } = req.body;
  const data = await getData();

  const conta = await obterContaPorNumero(numero_conta);

  conta.saldo += valor;

  const novoDesposito = {
    data,
    numero_conta,
    valor,
  };

  depositos.push(novoDesposito);

  res.status(204).send();
};

const sacar = async (req, res) => {
  const { numero_conta, valor } = req.body;
  const data = await getData();

  const conta = await obterContaPorNumero(numero_conta);

  conta.saldo -= valor;

  const novoSaque = {
    data,
    numero_conta,
    valor,
  };

  saques.push(novoSaque);

  res.status(204).send();
};

const transferir = async (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor } = req.body;
  const data = await getData();

  const contaOrigem = await obterContaPorNumero(numero_conta_origem);
  const contaDestino = await obterContaPorNumero(numero_conta_destino);

  contaOrigem.saldo -= valor;
  contaDestino.saldo += valor;

  const novaTransferencia = {
    data,
    numero_conta_origem,
    numero_conta_destino,
    valor,
  };

  transferencias.push(novaTransferencia);

  res.status(204).send();
};

module.exports = {
  depositar,
  sacar,
  transferir,
};
