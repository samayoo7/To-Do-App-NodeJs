<p align="center">
  <img src="./src/assets/logo/Prisma_Node.png" alt="Logo" style="min-width: 100px; max-width: 500px; width: 100%;" />
</p>

# To-Do-App-NodeJs
PostgreSql with Prisma

Steps to Installation:

1. Install the NodeJs and create a project.

2. Install the PostgreSQL into your system.
https://www.postgresql.org/download/

There are many ways to install it but I prefer PostgreSql installation using brew.
- brew install postgresql@17

After that create a database and make sure to setup it correct.

3. Setup the env file in your nodejs project. Initially it includes following data:
PORT=YOUR_PORT_NUMBER
DATABASE_URL="postgres://YourUserName:YourPassword@localhost:5432/YourDatabaseName"

Note: 5432 is default PostgreSQL port number.

4. Setup the Prisma.
- Install Prisma client *npm install @prisma/client*

- Install prisma as a dev dependency
*npm install prisma -D*

- Initialize Prisma
*npx prisma init*

This will generate a prisma folder with a file called prisma.schema inside of it. This file is where we will create our database models.


General Notes:

1. npx prisma generate

Run above command in every scenario mentioned below.
- ✅ After modifying schema.prisma (e.g., adding new models, fields, or relations).
- ✅ After running migrations (npx prisma migrate dev).
- ✅ After changing the DATABASE_URL.
- ✅ If Prisma Client is missing or outdated.

2. To View your database run following command
*npx prisma studio*



