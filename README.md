# Exercicios-backend-autenticacao-criptografia-Pokemons
Aplicação-backend-autenticacao-criptografia

# Exercício 01

## Criação de API com autenticação

Você acaba de receber uma proposta como freelancer para construir uma API que irá catalogar **Pokemons**. Entretanto, não se trata de uma simples API, pois ela possuirá autenticação para que cada usuario logado possa catalogar seus **Pokemons**.

Sendo assim, vamos aos requisitos proposto pelo contratante.

1 - Deverá existir um banco de dados chamado `catalogo_pokemons` com as tabelas descritas abaixo e todo código de criação das tabelas deverá se colocado no arquivo `dump.sql`

a) Tabela `usuarios` com os campos:

- id - identificador único do usuário como chave primaria e auto incremento;
- nome - (obrigatório)
- email - (obrigatório e único)
- senha - (obrigatório)

b) Tabela `pokemons` com os campos

- id - identificador único do pokemon como chave primaria e auto incremento;
- usuario_id - (obrigatório)
- nome - (obrigatório)
- habilidades - (obrigatótio)
- imagem
- apelido

2 - Para a entidade `usuarios` deverá ser implementado as seguintes funcionalidades.

a) Cadastro de usuário

- A senha do usuário deverá ser criptografada usando a biblioteca `bcrypt` antes de salvar o cadastro.

b) Login de usuário

- Validar as credenciais do usuário usando a biblioteca `bcrypt`.
- Gerar o token de autenticação com a biblioteca `jsonwebtoken`.

3 - Para a entidade `pokemons` deverá ser implementado as seguintes funcionalidades.

a) Cadastro do pokemons

b) Atualização apenas do apelido do pokemon

c) Listagem completa dos pokemons

d) Listagem de apenas um pokemon filtrado pelo seu id

e) Exclusão do pokemon

É obrigatório para as funcionalidades da entidade `pokemons`:

- Receber o token do header da requisição (_authorization_) no formato `Bearer Token` e validar o usuário logado em todos os endpoints.
- O campo `usuario_id` não deve ser capturado do body da requisição. Deve ser obtido do token recebido no header.
- No cadastro de pokemon, o campo `habilidades` deverá receber apenas uma string de habilidades separadas por vírgulas.
- Na listagem de pokemons o campo `habilidades` deverá retornar um array de habilidades.

_Obs.: É preciso realizar todas as validações necessárias para evitar erros no banco de dados_

Exemplo do body para cadastro do pokemon:

```
{
    "nome": "Pikachu",
    "apelido": "pikachu",
    "habilidades": "static, lightning-rod",
    "imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
}
```

Exemplo de retorno na listagem de pokemons:

```
[
    {
        "id": 1,
        "usuario": "Nome do usuário responsável"
        "nome": "Pikachu",
        "apelido": "pikachu",
        "habilidades": ["static", "lightning-rod"],
        "imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
    },
    {
        "id": 2,
        "usuario": "Nome do usuário responsável"
        "nome": "Bulbasaur",
        "apelido": "bulbasaur",
        "habilidades": ["overgrow", "chlorophyll"],
        "imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
    }
]
```

![image](https://github.com/yago-maker/Exercicios-backend-autenticacao-criptografia-Pokemons/assets/87579180/5e6b6b2b-31e7-4b4f-9817-909ee8ba2cc1)
![image](https://github.com/yago-maker/Exercicios-backend-autenticacao-criptografia-Pokemons/assets/87579180/b8610224-6f4c-4a10-be60-85ea5662c5bc)
![image](https://github.com/yago-maker/Exercicios-backend-autenticacao-criptografia-Pokemons/assets/87579180/1e29d5d4-7040-4e56-a8a2-913cc05456c4)
![image](https://github.com/yago-maker/Exercicios-backend-autenticacao-criptografia-Pokemons/assets/87579180/64d46ac3-047e-47cf-9385-3caa8bf77093)





###### tags: `exercícios` `lógica` `banco de dados` `sql` `postgres`
