# API Delivery

Este projeto é uma API de Delivery desenvolvida em Node.js utilizando Express e PostgreSQL. A API permite o gerenciamento de usuários, restaurantes, produtos e pedidos, além de enviar notificações via WhatsApp.

## Estrutura do Projeto

```
api-delivery
├── src
│   ├── app.js                  # Ponto de entrada da aplicação
│   ├── config
│   │   └── database.js         # Configuração do banco de dados PostgreSQL
│   ├── controllers
│   │   ├── userController.js   # Gerenciamento de usuários
│   │   ├── restaurantController.js # Gerenciamento de restaurantes
│   │   ├── productController.js # Gerenciamento de produtos
│   │   └── orderController.js   # Gerenciamento de pedidos
│   ├── models
│   │   ├── user.js             # Modelo de usuário
│   │   ├── restaurant.js        # Modelo de restaurante
│   │   ├── product.js           # Modelo de produto
│   │   └── order.js             # Modelo de pedido
│   ├── routes
│   │   ├── userRoutes.js       # Rotas de usuários
│   │   ├── restaurantRoutes.js  # Rotas de restaurantes
│   │   ├── productRoutes.js     # Rotas de produtos
│   │   └── orderRoutes.js       # Rotas de pedidos
│   ├── services
│   │   └── whatsappService.js   # Serviço de notificações via WhatsApp
│   └── middlewares
│       └── authMiddleware.js    # Middleware de autenticação
├── package.json                 # Configuração do npm
└── README.md                    # Documentação do projeto
```

## Instalação

1. Clone o repositório:

   ```
   git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue até o diretório do projeto:

   ```
   cd api-delivery
   ```

3. Instale as dependências:

   ```
   npm install
   ```

4. Configure o banco de dados no arquivo `src/config/database.js`.

## Uso

Para iniciar a aplicação, execute o seguinte comando:

```
npm start
```

A API estará disponível em `http://localhost:3000`.

## Funcionalidades

- **Gerenciamento de Usuários**: Cadastro, login e atualização de informações.
- **Gerenciamento de Restaurantes**: CRUD de restaurantes.
- **Gerenciamento de Produtos**: CRUD de produtos e associação a restaurantes.
- **Gerenciamento de Pedidos**: Criação, atualização de status e notificação via WhatsApp.

## Notificações via WhatsApp

A API integra-se com um serviço externo para enviar notificações via WhatsApp. A lógica está implementada no arquivo `src/services/whatsappService.js`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

# ideias 
- chat de conversas 