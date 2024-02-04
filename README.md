# Practice project from Freshcode: Fullstack web application

## What the project does

This project consists of the following parts:

- **frontend** (a.k.a. client),
- **backend** (a.k.a. server), and
- **databases** (both SQL and NO-SQL).

The application is written using *Next.js* framework. It allows us to leverage server-side rendering (SSR for short). The project also makes use of *SASS*, the CSS preprocessor. The client part of the app runs in the browser and can send requests to server to load data present in database(s). Additionally, code is written using *Typescript*, a superset of Javascript that allows writing type-safe code and can be incrementally adopted. The server part is run in *Node.js* runtime environment. Node.js allows running JS files as individual scripts and, for the current project, it allows us to create server to process requests from the client, interact with database(s) and send responses.

Lastly, this project uses *PostgreSQL* as relational database. Previously, it also used *MongoDB* as a non-relational database. Currently, all *MongoDB* related code, config and dependencies are left for reference. Overall, the databases are used to store data about registered users, their contests, messages and much more. In relational databases, relations between tables are referenced via foreign keys. Such relations are also possible in non-relational databases. However, non-relational DBs allow more complex database structures to be implemented more easily.

In general, this web application demonstrates skills I have obtained while studying fullstack JS programming. In this project work has been done in separate git branches, ultimately merging them into a single one. `dev` branch contains code in its original state. Other branches contain changes made by me, starting with `bugfix` branch, which stems from the `dev` branch. All other commits are based on the `bugfix` branch, since major part of coding was done there, partially due to migration to Typescript.

## How to get started using the project

### Node.js

The Next.js app can be run from Node.js using `pnpm` as package manager. You'll also need to have PostgreSQL installed and running. Here's how to get the project up and running:

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
cp .env.example .env
```

4. *(Optional)* Edit the `.env` file in your favourite text editor.
5. Install Node.js dependencies:

```bash
pnpm i
```

6. Start PostgreSQL database. Here's how it can be run using *Docker*, assuming `POSTGRES_DB_STRING` environment variable is set to `postgres://postgres:password@localhost:5432/todo-dev`:

```bash
docker run --name postgres-alpine -e POSTGRES_PASSWORD=password -e POSTGRES_USER=postgres -e POSTGRES_DB=todo-dev -p 5432:5432 postgres:alpine
```

7. Start the app:

```bash
pnpm dev
```

Assuming you have done everything correctly, web app can be accessed via `http://localhost:3000` url.

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
- `dependencies` branch updates all depencencies on the server and most of them on the client. This allows us to mitigate many security issues.
- `swc-compiler` branch replaces `babel` with `swc` on the server. `swc` is a lot faster compiler than `babel` and supports Typescript out of the box.
- `vite-bundler` branch replaces inherently bulky and vulnerable `react-scripts` installed by `create-react-app` with `vite` on the client. `vite` is faster and more modern than `webpack` and it can use `swc` under the hood.
- `hook-form` branch replaces `formik` with `react-hook-form` across all forms. It also replaces legacy `react-input-mask` with more modern `@react-input/mask`.
- `nextjs` branch contains complete rewrite of the app, utilizing `Next.js`, a `React` framework. Among other things, it includes migration from `npm` to `pnpm`.
- `main` branch basically combines all of the above branches' work together.
