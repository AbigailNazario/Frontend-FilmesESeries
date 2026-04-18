# App de Mídias (Frontend - PWA)

Este é o frontend da aplicação **App de Mídias**, onde o usuário pode cadastrar, visualizar, atualizar e remover filmes e séries.

A aplicação foi desenvolvida utilizando HTML, CSS e JavaScript puro, com suporte a **PWA (Progressive Web App)**.


## Funcionalidades

* Adicionar mídia (filme ou série)
* istar mídias
* Marcar como assistido / não assistido
* Remover mídia
* Instalar como aplicativo (PWA)


## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla)
* Service Worker (PWA)


## Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/frontend.git
```

2. Acesse a pasta:

```bash
cd frontend
```

3. Abra o arquivo `index.html` no navegador
   ou utilize uma extensão como **Live Server**.


## Configuração da API

No arquivo `App.js`, configure a URL do backend:

```javascript
const API_URL = "http://localhost:3000";
```

Após o deploy, altere para a URL do backend em produção:

```javascript
const API_URL = "https://seu-backend.onrender.com";
```


## Estrutura do projeto

```
frontend/
│── App.js
│── index.html
│── style.css
│── manifest.json
│── service-worker.js
│── icons/
```


## Deploy

O frontend está publicado em:

* Netlify


## Autora

Projeto desenvolvido por Abigail Maria Nazário.
