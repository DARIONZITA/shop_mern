# Goodal (Shop MERN)

[Live Site](https://good-goodal.netlify.app/)

Aplicação e-commerce construída com arquitetura MERN, separada em frontend (`client`) e backend (`server`).

## Arquitetura do projeto

### 1) Frontend (`/client`)
- **React + Vite** para a SPA.
- **React Router** para roteamento (incluindo área pública e área de admin).
- **Redux Toolkit** para gestão de estado global (autenticação, produtos, carrinho, sliders, marcas).
- **Tailwind CSS + MUI** para interface e componentes visuais.
- Consome a API REST do backend para produtos, clientes, autenticação, pedidos e marcadores no mapa.

Estrutura principal:
- `src/app/store.js`: configuração da store Redux.
- `src/features/*`: slices e lógica por domínio.
- `src/routes` e `src/pages`: composição de layouts e páginas.

### 2) Backend (`/server`)
- **Node.js + Express** para API REST.
- **MongoDB + Mongoose** para persistência.
- Organização por camadas:
  - `routes/`: definição dos endpoints.
  - `controllers/`: regras de negócio das rotas.
  - `models/`: schemas Mongoose.
  - `middleware/`: autenticação/autorização (cliente, admin, pedidos).
  - `servers/` e `utils/`: serviços auxiliares (email, upload, utilitários).

Endpoints são expostos com prefixo:
- `/api/products`
- `/api/admin`
- `/api/customer`
- `/api/orders`
- `/api/marks`

### 3) Fluxo de dados (alto nível)
1. Cliente interage com a SPA React.
2. Frontend envia requisições HTTP para a API Express.
3. Controllers validam dados, aplicam regras de negócio e usam Models/Services.
4. Dados são persistidos no MongoDB e retornados em JSON para o frontend.

## Tecnologias utilizadas

### Frontend
- React 18
- Vite
- Redux Toolkit + React Redux
- React Router DOM
- Tailwind CSS
- Material UI (MUI)
- Axios
- React Hot Toast
- Leaflet / React Leaflet (mapa)

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcrypt
- nodemailer
- Cloudinary
- CORS
- dotenv
- validator

## Como executar localmente

### Pré-requisitos
- Node.js instalado
- MongoDB acessível (local ou remoto)

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## Observações
- O projeto depende de variáveis de ambiente para base de dados, autenticação e serviços externos (email/upload).
- A separação `client` e `server` permite evolução independente de interface e API.
