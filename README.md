📚 Biblioteca – Projeto FIAP

Este projeto foi desenvolvido para atender ao desafio do módulo de TypeScript do curso de Pós-Graduação em Desenvolvimento Fullstack da FIAP.

O sistema implementa uma biblioteca digital com gerenciamento de dados através de uma API REST e uma interface web.

🏗️ Arquitetura do Sistema

O projeto é dividido em duas aplicações independentes.

Frontend (TypeScript + Express)
        │
        ▼
Backend API (Spring Boot)
        │
        ▼
PostgreSQL Database

🧩 Tecnologias Utilizadas
Backend

Java 17

Spring Boot

Spring Data JPA

Hibernate

Flyway (versionamento de banco)

PostgreSQL

Docker

Docker Compose

Maven

O backend expõe uma API REST responsável pelo gerenciamento da biblioteca.

Frontend

TypeScript

Express

Node.js

O frontend consome a API do backend e disponibiliza a interface da aplicação.

A aplicação roda em:

http://localhost:3000

📂 Estrutura do Projeto
Backend
biblioteca-backend
 ├─ src
 ├─ Dockerfile
 ├─ docker-compose.yml
 ├─ pom.xml
Frontend
biblioteca-frontend
 ├─ src
 ├─ package.json
 ├─ tsconfig.json
⚙️ Executando o Backend
📋 Pré-requisitos

Antes de iniciar, certifique-se de possuir:

Docker Desktop instalado
https://docs.docker.com/desktop/setup/install/windows-install/

Java 17+

Maven

IDE Java (ex: IntelliJ IDEA)

📥 Clonar o projeto
git clone https://github.com/ChristianSpinelli/biblioteca-backend.git

Entrar na pasta:

cd biblioteca-backend

🐳 Executando com Docker Compose (Mais simples)

O projeto possui um docker-compose.yml que sobe automaticamente:

PostgreSQL

Backend Spring Boot

Execute:

docker compose up -d

O Docker irá:

Baixar as imagens necessárias

Criar o container do PostgreSQL

Construir a imagem do backend

Iniciar ambos os serviços

Containers criados:

Serviço	Container	Porta
PostgreSQL	biblioteca-db	5432
Backend API	biblioteca-backend	8080

Após iniciar, a API estará disponível em:

http://localhost:8080

O Flyway executará automaticamente as migrations, criando as tabelas necessárias no banco de dados.

💻 Executando o Backend pela IDE (IntelliJ)

Para desenvolvimento, também é possível executar o backend diretamente pela IDE.

Nesse caso você pode subir apenas o banco com Docker.

1️⃣ Subir somente o PostgreSQL
docker compose up postgres -d

2️⃣ Compilar o projeto
No terminal da IDE execute:

mvn clean install

Esse comando:

Compila o projeto

Resolve dependências

Verifica erros de build

Remove builds anteriores

3️⃣ Executar a aplicação
mvn spring-boot:run

Isso irá:

Iniciar o Spring Boot

Executar as migrations do Flyway

Disponibilizar a API REST na porta 8080

http://localhost:8080
🔄 Após alterações no código

Sempre que alterar o código execute novamente:

mvn clean install
mvn spring-boot:run
💻 Executando o Frontend
📥 Clonar o projeto
git clone https://github.com/ChristianSpinelli/biblioteca-frontend.git

Entrar na pasta:

cd biblioteca-frontend
📦 Instalar dependências
npm install
🔨 Build do projeto
npm run build
▶️ Executar aplicação
npm start

Abrir no navegador:

http://localhost:3000
🔄 Após alterações no frontend

Sempre que fizer alterações:

1️⃣ Pare a aplicação
2️⃣ Execute novamente:

npm run build
npm start
🚀 Resultado Final

Com backend e frontend em execução, o sistema estará disponível em:

Serviço	URL
Backend API	http://localhost:8080

Frontend	http://localhost:3000
🗄️ Banco de Dados

Banco utilizado:

PostgreSQL

Gerenciamento de migrations:

Flyway

O Flyway executa automaticamente os scripts ao iniciar o backend.

📂 Repositórios
Backend

https://github.com/ChristianSpinelli/biblioteca-backend

Frontend

https://github.com/ChristianSpinelli/biblioteca-frontend

💡 Projeto desenvolvido para fins acadêmicos no curso de Pós-Graduação em Desenvolvimento Fullstack – FIAP
