<br><h1 align="center">
A Node.js RESTful API with background jobs (queues) using Redis

</h1>

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white"/>

  <img alt="Expressjs" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>

  <img alt="TypeScript" src="https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white"/>

   <img alt="PostgreSQL" src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>

  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />

  <img alt="Redis" src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white" />

  <img alt="Docker" src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" />
</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/EduardoPereiraBoares/linkapi-test?color=7e3ace">

  <a href="https://www.linkedin.com/in/EduardoPereiraBoares/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-Eduardo%20Pereira%20Boares-%23?color=7e3ace">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/EduardoPereiraBoares/linkapi-test?color=7e3ace">

  <a href="https://github.com/EduardoPereiraBoares/linkapi-test/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/EduardoPereiraBoares/linkapi-test?color=7e3ace">
  </a>

   <img alt="GitHub" src="https://img.shields.io/github/license/eduardopereiraboares/linkapi-test?color=7e3ace">
</p>

<h5 align="center">
  <a href="#-introduction">Introduction</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</h5><br>

# 📖 Introduction<br>

This repository is a test for a job selection process at Proz Educação.<br><br>

**OBJECTIVE**

Build a Node.js RESTful API with background job (queues) to consume and process a students spreadsheet.
<br><br>

**REQUIREMENTS**

● Receive a student spreadsheet which must be processed in the background;

● Create an endpoint that informs if the spreadsheet was processed successfully or no;

● Create endpoints to get, update and delete students (can only create new students via spreadsheet).
<br><br>

**Technical Requirements**

● NodeJS;

● Utilização do Docker;

● Testes concluídos;

● Git/Gitlab/Github/Bitbucket;

● Utilização de Fila;

● DESCANSO;

● JSON.
<br><br>

# 🌐 Technologies<br>

Technologies used in development.

-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/pt-br/)
-   [Prisma](https://www.prisma.io/)
-   [TypeORM](https://typeorm.io/#/)
-   [PostgreSQL](https://www.postgresql.org/r)
-   [Redis](https://redis.io/)
-   [Docker](https://www.docker.com/)
-   [Bull](https://www.npmjs.com/package/bull)
-   [Multer](https://www.npmjs.com/package/multer)
-   [xlsx](https://www.npmjs.com/package/xlsx)
-   [Inversify](https://inversify.io/)
-   [Vitest](https://vitest.dev/)
-   [Eslint](https://eslint.org/)
-   [Prettier](https://prettier.io/)
-   [EditorConfig](https://editorconfig.org/)
-   [Husky](https://www.npmjs.com/package/husky)
-   [Commitlint](https://commitlint.js.org/#/)
-   [tsup](https://github.com/egoist/tsup)
-   [tsx](https://www.npmjs.com/package/tsx)
-   [pnpm](https://pnpm.io/pt/)<br><br>

<details><summary>Bull Board (background job queue)</summary><br>
  <p align="center">
    <img height="400" alt="bull-board-printscreen" src=".github\bull-board-printscreen.png">
  </p>
</details><br><br>

# 💻 Getting started<br>

**Clone the project and access the folder**

```bash
$ git clone https://github.com/eduardoboares/proz-educacao-test.git && cd proz-educacao-test
```
<br>

Import the `Insomnia.json` on Insomnia App.
To process students spreadsheet in background job, use `POST create students by spreadsheet` sending the `planilha_alunos.xlsx` in multipart params with `spreadsheet` field name.
<br><br>

### Requirements

-   [Node.js](https://nodejs.org/en/)
-   [pnpm](https://pnpm.io/pt/), [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/) <br><br>

**Follow the steps below**

```bash
# Start development environment
# cd development-environment
$ docker-compose up
# Start docker containers
# cd ..

# Install the dependencies
$ pnpm

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables.
# The aws variables do not need to be filled for dev environment
$ cp .env.example .env

# To configure prisma and execute migrations in database
$ pnpm prisma migrate dev

# To finish, run application and queue
$ pnpm dev

# Well done, project is started!
```
<br>

# 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.<br><br><br><br><br>

<div align="center">
👉🏼  <a href="https://www.linkedin.com/in/eduardo-pereira-boares/">See my Linkedin</a>  👈🏼
<h5 align="center"> 👨🏻‍💻 Developed by Eduardo Pereira Boares. 👨🏻‍💻</h5>
<div>
