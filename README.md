# Frontend Challenge

## Estrutura do projeto

`/server`

API pronta para para requisições.
Para subir a API, entre na pasta e instale as dependências com `npm install` e depois `npm start`.

Informações necessárias para interação com a API em `http://localhost:9004/`.

`/client`

Para rodar o client, entre na pasta e instale as dependências com `npm install` e depois `npm start`.

## Funcionamento

### '/' (home)

Na pagina inicial, rota `'/'` estarão listados todos os usuários cadastrados na API.
As informações dos usuários são exibidas em um card, contendo a foto de avatar, nome, nome de usuário, e-mail e telefone.

É possível excluir um usuário clicando no botão da lixeira e clicando em `'Confirmar'` na tela de alerta que será exibida. Ao confirmar, o usuário será excluído da API e uma mensagem de `'Usuário excluído!'` será exibida na parte inferior da tela.

Ao clicar no botão `'Cadastre um novo usário'`, será redirecionado para a página contendo o formulário para o cadastro de usuário.

### '/create-user'

Na página de cadastro de usuário, rota `'/create-user'` terá os campos de avatar, nome, nome de usuário, e-mail e telefone de preenchimento obrigatório para cadastro.

Após o preenchimento de todos os campos, ao clicar no botão `'Cadastrar usuário'` será salvo na API o registro e uma mensagem de `'Usuário criado!'` será exibida na parte inferior da tela.

Após a criação do usuário, será feito o redirecionamento para a página inicial.