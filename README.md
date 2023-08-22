# Practice project from Freshcode: Fullstack web application

## What the project does

This project consists of the following parts:

- **frontend** (a.k.a. client),
- **backend** (a.k.a. server), and
- **databases** (both SQL and NO-SQL).

It utilizes *Docker* compose to combine these individual parts together.

Client serves single-page application, written using *React* library/framework. Navigation between pages is powered using `react-router-dom` dependency. Frontend also makes use of *SASS*, the CSS preprocessor. Client can send requests to server to load data present in database(s). Additionally, client's codebase is written in *Typescript*, a superset of Javascript that allows writing type-safe code and can be incrementally adopted. Frontend uses *Babel* under the hood to transpile JSX and TS code into JS.

Server is run in *Node.js* runtime environment. Node.js allows running JS files as individual scripts and, for the current project, it allows us to create server to process requests from the client, interact with database(s) and send responses. Just like frontend, backend makes use of *Typescript*. Likewise, it utilizes *Babel* to transpile written Typescript code into Javascript.

Lastly, this project uses *PostgreSQL* as relational database and *MongoDB* as a non-relational database. However, due to project's migration to SQL usage of the NO-SQL database is marked as deprecated. Overall, the databases are used to store data about registered users, their contests, messages and much more. In relational databases, relations between tables are referenced via foreign keys. Such relations are also possible in non-relational databases. However, non-relational DBs allow more complex database structures to be implemented more easily.

In general, this web application demonstrates skills I have obtained while studying fullstack JS programming. In this project work has been done in separate git branches, ultimately merging them into a single one. `dev` branch contains code in its original state. Other branches contain changes made by me, starting with `bugfix` branch, which stems from the `dev` branch. All other commits are based on the `bugfix` branch, since major part of coding was done there, partially due to migration to Typescript.

## How to get started using the project

### Docker *(recommended)*

Running the project in Docker container environment is simple. Assuming you have Docker installed, all you need is:

1. Clone the repo:

```bash
git clone https://github.com/U3erKa/fe2022-1-practice-project.git
```

2. Navigate to the cloned directory:

```bash
cd fe2022-1-practice-project
```

3. Copy file with environment variables for server:

```bash
cp server/.env.example server/.env
```

4. *(Optional)* Edit the `.env` file in your favourite text editor.
5. Ensure that startup script is executable:

```bash
chmod +x start-dev.sh
```

6. Run the script:

```bash
./start-dev.sh
```

And then wait until the required containers are created. This will take a while.\
*Note: `start.sh` is meant for production environment. To run project locally use `start-dev.sh` instead.*

When containers are built, they can be accessed via the following links:

- client: `http://localhost:5000`
- server: `http://localhost:3000`
- PostgreSQL database: `http://localhost:5432`
- MongoDB database: `http://localhost:27017`

### Node.js

Both client and server can be run from Node.js outside Docker containers. However, you need to have PostgreSQL and MongoDB installed. Additionally, client requires Node.js v16.x, whereas server can be run using either Node.js v16.x, v18.x or v20.x. With that in mind, here's how to get the project up and running:

1. Clone the repo:

```bash
git clone https://github.com/U3erKa/fe2022-1-practice-project.git
```

2. Navigate to the cloned directory:

```bash
cd fe2022-1-practice-project
```

3. Copy file with environment variables for server:

```bash
cp server/.env.example server/.env
```

4. *(Optional)* Edit the `.env` file in your favourite text editor.
5. Navigate to client subdirectory:

```bash
cd client
```

6. Install Node.js dependencies for client:

```bash
npm i
```

7. Navigate to server subdirectory:

```bash
cd ../server
```

8. Install Node.js dependencies for server:

```bash
npm i
```

9. Edit `mongoConfig.json` and `postgresConfig.json` inside `config` folder on the server by changing "host" field to "localhost":

```diff
{
  "development": {
    /* ... */
-    "host": "db-dev",
+    "host": "localhost",
    /* ... */
  },
  /* ... */
}
```

10. Start the server:

```bash
npm start
```

*Note: it is important that the server runs on port `3000` to be accesible for the client. For that we start the server before the client*

11. In another terminal navigate back to client subdirectory:

```bash
cd ../client
```

12. Start the client:

```bash
npm start
```

*Note: You should receive the following prompt: `Would you like to run the app on another port instead? › (Y/n)`. Press `Y` or `Enter` to proceed.*

Assuming you have done everything correctly, web app can be accessed via the following links:

- client: `http://localhost:3001`
- server: `http://localhost:3000`
- PostgreSQL database: `http://localhost:5432`
- MongoDB database: `http://localhost:27017`

## What was made in the project

- `bugfix` branch starts off of `dev` branch. All other branches start from this branch. It contains:
  - many bug fixes,
  - significant code refactoring,
  - migration of the codebase to Typescript,
  - update of dependencies to their newer version.
- `sql-query` contains SQL queries to interact with PostgreSQL database. Specifically, it allows us to:
  - Count users by role,
  - Send 10% cashback for customers' contests made during holidays,
  - Add $10 for top 3 rated creators.
- `nosql-query` branch adds single query to MongoDB NO-SQL database which allows us to count how many messages contain a specific word.
- `how-it-works` branch adds page on the client at '/how-it-works' route. This page explains how contests work and has a QnA section.
- `error-logger` branch implements saving error messages into *.log files. This allows for easier troubleshooting.
- `error-mailer` branch stems from `error-logger` branch and adds sending daily error logs to a certain email address. It also saves logs to separate files on the server to allow further inspection.
- `nosql-to-sql` branch defines SQL database queries required to migrate from MongoDB to PostgreSQL. It also has visual representation of table relations that were modified during migration.
- `mongoose-to-sequelize` branch expands the idea of migration to SQL even further. For that, new Sequelize models and migrations were created and Mongoose models were marked as deprecated to discourage their further usage in favour of newly created Sequelize ones.
- `button-group` branch add simple `<ButtonGroup />` React component to '/startContest' page. This component allows customer to choose if they want to have their domain match the name in the name contest.
- `dynamic-branding` branch adds '/events' page which allows logged in users to schedule their events. Created events are then sent to server which then stores them in the database. The user also can choose whether they want to get notified when an event is about to start.
- `moderation` branch adds new user role - `moderator`. User with this role can view creators' offers and choose to either approve or discard them. Since moderator is very responsible role, user with this role cannot be created through '/register' page. Instead, it's added via Sequelize's seeder. Customer cannot see non-approved or discarded offers. Creator can see if their offer have been moderated and thay receive emails when they do.
- `main` branch combines all of the above branches' work together and adds a little extra. Apparently, it contains few fixes and reformats everything with Prettier.
