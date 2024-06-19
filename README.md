
Como Rodar o Projeto
Siga os passos abaixo para configurar e executar o projeto localmente.

Pré-requisitos
Certifique-se de ter o Node.js e o Docker instalados em seu sistema.

Instalação
Para instalar as dependências do projeto, execute o seguinte comando na raiz do projeto:

npm install

Configuração do Banco de Dados
Este projeto utiliza o Prisma para lidar com o banco de dados. Certifique-se de configurar e aplicar as migrações necessárias antes de iniciar o servidor.

Configuração do arquivo .env:
Crie um arquivo .env na raiz do projeto com as variáveis necessárias, como as credenciais do banco de dados e outras configurações específicas que estão no .env.example.

Subir Container Docker
Para subir o container docker com o banco de dados execute o seguinte comando: 

docker compose up -d 

Certifique-se de ter configurado as credeciais do banco de dados no .env 

Aplicação de Migrações:
Execute o seguinte comando para aplicar as migrações do banco de dados:

npx prisma migrate dev

Isso garantirá que seu banco de dados esteja atualizado com o esquema definido pelo Prisma.

Executando o Servidor em Desenvolvimento
Para iniciar o servidor em modo de desenvolvimento, utilize o seguinte comando:

npm run start:dev

Este comando iniciará o servidor Fastify utilizando ts-node-dev para recarregar automaticamente o servidor quando arquivos são modificados.

Testes
Os testes são executados utilizando vitest. Para rodar os testes, utilize o seguinte comando:

npm run test

