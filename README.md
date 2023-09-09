# API de Banco Digital

Esta é uma API para um banco digital que permite a gestão de contas bancárias, depósitos, saques, transferências e consulta de saldo e extrato. A API foi construída usando Node.js, JavaScript, Express.

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

## Principais Funções

1. Gerenciamneto de contas, Criar, Atualizar e Deletar.
2. Saques, Depositos e Tranferências.
3. Exibir Saldo e Extrato.


## Como Usar

1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Inicie o servidor com `npm run dev`.
4. Acesse `http://localhost:3000/`



## EndPoints


**Listar Contas**
```http
GET /contas?senha_banco=Cubos123Bank
```
É obrigatório a senha do banco para a listagem das contas cadastradas.

![Listar Contas](https://github.com/nsRenan/api-sistema-bancario/blob/master/screenshots/listarContas.png)


**Criar Conta**
```http
POST /contas
```
Exemplo de requisição:
```json
{
    "nome": "Renan",
    "cpf": "12345565",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "Renan@b.comm",
    "senha": "12345"
}
```


**Atualizar Dados**
```http
PUT /contas/:numeroConta/usuario
```
Exemplo de requisição:
```http
PUT /contas/1/usuario
```
```json
{
    "nome": "Reinan",
    "cpf": "123456",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "Rei@bar.com",
    "senha": "1234665"
}
```


**Deletar Conta**
```http
DELETE /contas/:numeroConta
```
Exemplo de requisição:
```http
DELETE /contas/1
```
![Deletar Conta](https://github.com/nsRenan/api-sistema-bancario/blob/master/screenshots/deletarConta.png)

**Depositar**
```http
POST /transacoes/depositar
```
Exemplo de requisição:
```json
{
	"numero_conta": "1",
	"valor": 30000
}
```


**Sacar**
```http
POST /transacoes/sacar
```
Exemplo de requisição:
```json
{
	"numero_conta": "1",
	"valor": 1000,
    	"senha": "1234665"
}
```
![Sacar](https://github.com/nsRenan/api-sistema-bancario/blob/master/screenshots/sacar.png)

**Transferir**
```http
POST /transacoes/transferir
```
Exemplo de requisição:
```json
{
	"numero_conta_origem": "2",
	"numero_conta_destino": "1",
	"valor": 200,
	"senha": "12345"
}
```
![Transferir](https://github.com/nsRenan/api-sistema-bancario/blob/master/screenshots/transferir.png)

**Exibir Saldo**
```http
GET /contas/saldo?numero_conta&senha
```
Exemplo de requisição:
```http
GET /contas/saldo?numero_conta=1&senha=12345
```
![Saldo](https://github.com/nsRenan/api-sistema-bancario/blob/master/screenshots/exibirSaldo.png)

**Exibir Extrato**
```http
GET /contas/extrato?numero_conta&senha
```
Exemplo de requisição:
```http
GET /contas/extrato?numero_conta=1&senha=12345
```
![Extrato](https://github.com/nsRenan/api-sistema-bancario/blob/master/screenshots/exibirExtrato.png)


---
