📚 Biblioteca – Projeto FIAP

Este projeto foi desenvolvido para atender ao desafio do módulo de TypeScript do curso de Pós-Graduação em Desenvolvimento Fullstack da FIAP.

O sistema é dividido em duas partes:

Backend: API REST desenvolvida em Java com Spring Boot

Frontend: aplicação em TypeScript puro executada com Express

🧱 Arquitetura do Projeto
Backend

Java

Spring Boot

Hibernate

Flyway

PostgreSQL

Docker / Docker Compose

O backend executa uma API REST responsável pelo gerenciamento dos dados da biblioteca.

Frontend

TypeScript

Express

Node.js

O frontend consome a API do backend e roda localmente na porta 3000.

⚙️ Executando o Backend
📋 Pré-requisitos

Antes de iniciar, certifique-se de possuir:

Docker Desktop instalado
https://docs.docker.com/desktop/setup/install/windows-install/

Uma IDE para desenvolvimento Java (ex: IntelliJ IDEA)

📥 Baixar o projeto

Clone o repositório:

git clone https://github.com/ChristianSpinelli/biblioteca-backend.git

Entre na pasta do projeto:

cd biblioteca-backend
🐳 Subir o banco de dados

Execute o comando abaixo na raiz do projeto:

docker compose up -d

O Docker irá:

Baixar as imagens necessárias

Criar o container do PostgreSQL

Iniciar o banco de dados

▶️ Executar a API

Abra o projeto na IDE (IntelliJ ou similar) e execute os seguintes comandos Maven.

1️⃣ Compilar o projeto
mvn clean install

Esse comando:

Compila o projeto

Verifica erros de build

Remove arquivos temporários de builds anteriores

2️⃣ Rodar a aplicação
mvn spring-boot:run

Esse comando irá:

Executar a aplicação Spring Boot

Criar as tabelas automaticamente utilizando Flyway

Iniciar a API REST em:

http://localhost:8080
🔄 Após alterações no código

Sempre que modificar o código do backend, execute novamente:

mvn clean install
mvn spring-boot:run
💻 Executando o Frontend
📋 Pré-requisitos

Visual Studio Code ou outra IDE para TypeScript

Node.js

Backend em execução

📥 Baixar o projeto

Clone o repositório:

git clone https://github.com/ChristianSpinelli/biblioteca-frontend.git

Entre na pasta do projeto:

cd biblioteca-frontend

Abra a pasta no VS Code.

📦 Instalar dependências

No terminal do VS Code execute:

npm install
🔨 Build do projeto
npm run build
▶️ Executar aplicação
npm start

Após iniciar, abra o navegador em:

http://localhost:3000
🔄 Após alterações no código

Sempre que fizer alterações no frontend:

Pare a aplicação

Execute novamente:

npm run build
npm start
🚀 Resultado

Com o backend e frontend em execução, o sistema estará disponível em:

Serviço	URL
Backend API	http://localhost:8080

Frontend	http://localhost:3000
📂 Repositórios

Backend
https://github.com/ChristianSpinelli/biblioteca-backend

Frontend
https://github.com/ChristianSpinelli/biblioteca-frontend
