const {
  banco,
  contas,
  transferencias,
  depositos,
  saques,
} = require("../bancodedados");

const obterSenhaBanco = async () => {
  return await banco.senha;
};

const obterContaPorNumero = async (numero_conta) => {
  return await contas.find((conta) => conta.numero === Number(numero_conta));
};

const obterContaPorCpf = async (cpf) => {
  return await contas.find((conta) => conta.usuario.cpf === cpf);
};

const obterContaPorEmail = async (email) => {
  return await contas.find((conta) => conta.usuario.email === email);
};

const obterIndiceDaContaPorNumero = async (numero_conta) => {
  return await contas.findIndex((conta) => conta.numero === Number(numero_conta));
};

const obterDepositosDaContaPorNumero = async (numero_conta) => {
  return await depositos.filter((deposito) => deposito.numero_conta === numero_conta);
};

const obterSaquesDaContaPorNumero = async (numero_conta) => {
  return await saques.filter((saque) => saque.numero_conta === numero_conta);
};

const obterTransferenciasRecebidasPorNumero = async (numero_conta) => {
  return await transferencias.filter((transferencia) => transferencia.numero_conta_destino === numero_conta);
};

const obterTransferenciasEnviadasPorNumero = async (numero_conta) => {
  return await transferencias.filter((transferencia) => transferencia.numero_conta_origem === numero_conta);
};

const obterSaldoPorNumero = async (numero_conta) => {
  return await contas.find((conta) => conta.numero === Number(numero_conta)).saldo;
};

const obterSenhaPorNumero = async (numero_conta) => {
  return await contas.find((conta) => conta.numero === Number(numero_conta)).usuario.senha;
};

module.exports = {
  obterSenhaBanco,
  obterContaPorNumero,
  obterContaPorCpf,
  obterContaPorEmail,
  obterIndiceDaContaPorNumero,
  obterDepositosDaContaPorNumero,
  obterSaquesDaContaPorNumero,
  obterTransferenciasRecebidasPorNumero,
  obterTransferenciasEnviadasPorNumero,
  obterSaldoPorNumero,
  obterSenhaPorNumero,
};
