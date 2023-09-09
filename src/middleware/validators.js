const {
  obterContaPorCpf,
  obterContaPorEmail,
  obterContaPorNumero,
  obterSenhaPorNumero,
  obterSaldoPorNumero,
  obterSenhaBanco,
} = require("../helpers/utils");

const validarSenha = async (req, res, next) => {
  const senhaBanco = await obterSenhaBanco();
  const { senha_banco } = req.query;

  if (!senhaBanco) {
    return res
    .status(400)
    .send({ mensagem: "A senha do banco é obrigatória" });
  }

  if (senhaBanco !== senha_banco) {
    return res
      .status(401)
      .send({ mensagem: "A senha do banco informada é inválida!" });
  }

  next();
};

const validarBody = (req, res, next) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome) {
    return res
    .status(400)
    .send({ message: "O nome é obrigatório" });
  } else if (!cpf) {
    return res
    .status(400)
    .send({ message: "O cpf é obrigatório" });
  } else if (!data_nascimento) {
    return res
      .status(400)
      .send({ message: "A data de nascimento é obrigatório" });
  } else if (!telefone) {
    return res
    .status(400)
    .send({ message: "O telefone é obrigatório" });
  } else if (!email) {
    return res
    .status(400)
    .send({ message: "O email é obrigatório" });
  } else if (!senha) {
    return res
    .status(400)
    .send({ message: "A senha é obrigatório" });
  }

  next();
};

const validarContaExistente = async (req, res, next) => {
  const { cpf, email } = req.body;

  const cpfCadastrado = await obterContaPorCpf(cpf);
  const emailCadastrado = await obterContaPorEmail(email);

  if (cpfCadastrado || emailCadastrado) {
    return res
      .status(400)
      .send({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" });
  }
  next();
};

const validarDeposito = async (req, res, next) => {
  const { numero_conta, valor } = req.body;

  if (!numero_conta || !valor) {
    return res
      .status(400)
      .send({ mensagem: "O número da conta e o valor são obrigatórios!" });
  }

  const conta = await obterContaPorNumero(numero_conta);

  if (!conta) {
    return res
    .status(404)
    .send({ message: "Usuário não encontrado" });
  }

  if (valor <= 0) {
    return res
      .status(400)
      .send({ message: "O valor não pode ser negativo ou zerado" });
  }

  next();
};

const validarExtrato = async (req, res, next) => {
  const { numero_conta, senha } = req.query;

  if (!numero_conta || !senha) {
    return res
    .status(404)
    .send({ message: "Conta bancária não encontada!" });
  }

  const conta = await obterContaPorNumero(numero_conta);

  if (!conta) {
    return res
    .status(404)
    .send({ message: "Conta bancária não encontada!" });
  }

  const senhaCorreta = await obterSenhaPorNumero(numero_conta);

  if (senhaCorreta !== senha) {
    return res
    .status(404)
    .send({ message: "Conta bancária não encontada!" });
  }

  next();
};

const validarNumeroConta = async (req, res, next) => {
  const { numeroConta } = req.params;

  const numeroCadastrado = await obterContaPorNumero(numeroConta);

  if (!numeroCadastrado) {
    return res
    .status(404)
    .send({ message: "Usuário não encontrado" });
  }
  next();
};

const validarSaldoParaDeletarConta = async (req, res, next) => {
  const { numeroConta } = req.params;

  const saldo = await obterSaldoPorNumero(numeroConta);

  if (saldo !== 0) {
    return res
      .status(400)
      .send({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
  }

  next();
};

const validarEmitirSaldo = async (req, res, next) => {
  const { numero_conta, senha } = req.query;

  const conta = await obterContaPorNumero(numero_conta);

  if (!conta) {
    return res
    .status(404)
    .send({ message: "Conta bancária não encontada!" });
  }

  const senhaCorreta = await obterSenhaPorNumero(numero_conta);

  if (senhaCorreta !== senha) {
    return res
    .status(404)
    .send({ message: "Conta bancária não encontada!" });
  }

  next();
};

const validarSaque = async (req, res, next) => {
  const { numero_conta, valor, senha } = req.body;

  if (!numero_conta || !valor) {
    return res
      .status(400)
      .send({ mensagem: "O número da conta e o valor são obrigatórios!" });
  }

  const conta = await obterContaPorNumero(numero_conta);
  let senhaCorreta = null;

  if (conta) {
    senhaCorreta = await obterSenhaPorNumero(numero_conta);
  }

  if (!conta || senhaCorreta !== senha) {
    return res
      .status(400)
      .send({ message: "Numero da conta ou senha incorreto" });
  }

  if (valor <= 0) {
    return res
      .status(400)
      .send({ mensagem: "O valor não pode ser menor que zero!" });
  }

  const saldoConta = await obterSaldoPorNumero(numero_conta);

  if (valor > saldoConta) {
    return res
    .status(400)
    .send({ mensagem: "Valor para saque insuficiente" });
  }

  next();
};

const validarTransferencia = async (req, res, next) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
    return res
    .status(400)
    .send({ message: "Todos os dados são obrigatórios" });
  }

  const contaOrigem = await obterContaPorNumero(numero_conta_origem);
  const contaDestino = await obterContaPorNumero(numero_conta_destino);

  if (!contaDestino) {
    return res
    .status(400)
    .send({ message: "A conta destino não existe" });
  }

  if (!contaOrigem) {
    return res
    .status(400)
    .send({ message: "A conta origem não existe" });
  }

  if (contaOrigem === contaDestino) {
    return res
    .status(400)
    .send({
      message: "A conta destino e a conta origem se tratam da mesma conta",
    });
  }

  const senhaCorreta = await obterSenhaPorNumero(numero_conta_origem);

  if (senha !== senhaCorreta) {
    return res
    .status(400)
    .send({ message: "Dados fornecidos incorretos" });
  }

  const saldoconta = await obterSaldoPorNumero(numero_conta_origem);

  if (saldoconta < valor) {
    return res
      .status(400)
      .send({ message: "Valor para transferencia insuficiente" });
  }

  next();
};

module.exports = {
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
};
