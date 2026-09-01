# Frontend do site ChinesOnline

## Sobre o Projeto
Repositório contendo o código-fonte do Frontend do site oficial do [ChinesOnline](https://chinesonline.com.br). O projeto é uma Single Page Application (SPA) projetada para ser rápida, responsiva e de fácil manutenção, com foco em uma experiência de usuário premium.

## Stack do Frontend
Este projeto foi desenvolvido utilizando as seguintes tecnologias:
- **React** (v19)
- **TypeScript**
- **Vite** (Build Tool e Dev Server)
- **Tailwind CSS** (Estilização)
- **SCSS** (Estilos globais e complementares)

## Como fazer o setup local do projeto

Siga os passos abaixo para rodar o projeto localmente em sua máquina.

### Pré-requisitos
- **Node.js** (versão 22 ou superior recomendada)
- **npm** (gerenciador de pacotes padrão)

### Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone <URL-DO-REPOSITORIO>
   cd siteprincipal
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   O servidor iniciará localmente (normalmente em `http://localhost:5173`).

### Build para Produção
Para compilar o projeto para produção (gerando os arquivos estáticos na pasta `dist/`), execute:
```bash
npm run build
```
