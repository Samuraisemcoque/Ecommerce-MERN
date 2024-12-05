# Nome do Projeto
Ecommerce-MERN

## Descrição

Este projeto é uma aplicação de e-commerce desenvolvida como parte do TCC, com um backend robusto utilizando Node.js, Express, e MongoDB, e um frontend moderno desenvolvido com React, Vite, e Tailwind CSS. O objetivo é proporcionar uma experiência completa de compra online, desde a navegação por produtos, adição ao carrinho, finalização de compras com pagamento via PayPal, até o gerenciamento de avaliações e endereços.

## Tecnologias Utilizadas

### Backend
- **Node.js**: Plataforma de desenvolvimento server-side baseada em JavaScript.
- **Express**: Framework web minimalista para Node.js.
- **MongoDB**: Banco de dados NoSQL orientado a documentos.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB.
- **Cloudinary**: Serviço de gerenciamento de mídia para armazenamento e entrega de imagens.
- **PayPal SDK**: Integração para processamento de pagamentos.
- **JWT (JSON Web Token)**: Autenticação e autorização de usuários.
- **Multer**: Middleware para manipulação de arquivos multipart/form-data.
- **cookie-parser**: Middleware para análise de cookies.
- **CORS**: Middleware para habilitar o compartilhamento de recursos entre diferentes origens.

### Frontend
- **React**: Biblioteca principal para construção da interface de usuário.
- **Vite**: Ferramenta de build e desenvolvimento para projetos frontend.
- **Tailwind CSS**: Framework CSS utilitário que facilita o estilo dos componentes.
- **Redux**: Biblioteca para gerenciamento de estado global da aplicação.
- **React Router**: Biblioteca para navegação e roteamento das páginas.
- **Axios**: Cliente HTTP para comunicação com a API backend.
- **Componentes Reutilizáveis**: Estrutura modular para construção de componentes reutilizáveis.
- **Variáveis de Ambiente**: Configuração da URL da API e outras variáveis.
- **GitHub Actions**: Para CI/CD e deploy automático.

## Estrutura do Projeto

### Backend
- **Controllers**: Lógica de negócio para cada funcionalidade.
- **Models**: Esquemas de dados utilizando Mongoose.
- **Routes**: Definição das rotas da aplicação.

### Frontend
- **src**: Contém todos os componentes, páginas e arquivos de configuração do frontend.
- **public**: Contém arquivos estáticos públicos.

## Instalação

### Backend

1. Clone o repositório:
    ```bash
    git clone https://github.com/Samuraisemcoque
    cd seu-projeto/backend
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente:
    Crie um arquivo `.env` na pasta `backend` com as seguintes variáveis:
    ```plaintext
    MONGO_URI=seu-mongo-uri
    JWT_SECRET=sua-chave-secreta
    PAYPAL_MODE=sandbox
    PAYPAL_CLIENT_ID=seu-paypal-client-id
    PAYPAL_CLIENT_SECRET=seu-paypal-client-secret
    CLOUD_NAME=seu-cloudinary-nome
    CLOUD_API_KEY=seu-cloudinary-api-key
    CLOUD_API_SECRET=seu-cloudinary-api-secret
    ```

4. Inicie o servidor:
    ```bash
    npm start
    ```

### Frontend

1. Navegue para a pasta do frontend:
    ```bash
    cd frontend
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente:
    Crie um arquivo `.env` na pasta `frontend` com as seguintes variáveis:
    ```plaintext
    VITE_API_URL=http://localhost:5000/api
    ```

4. Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```

## Acesso à Aplicação

Você pode acessar a aplicação do e-commerce através do seguinte link: [http://localhost:3000](http://localhost:3000)

## Funcionalidades

- Cadastro e login de usuários
- Navegação por produtos
- Adição de produtos ao carrinho
- Finalização de compras com pagamento via PayPal
- Avaliação de produtos
- Gerenciamento de endereços de entrega
- Painel administrativo para gerenciamento de produtos e pedidos

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Para isso, faça um fork, crie uma branch e envie um pull request. 