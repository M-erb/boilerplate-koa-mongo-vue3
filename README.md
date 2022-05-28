# Boilerplate Koa Mongodb Vue3

A boilerplate with basic setup.

## Dev Features

- Koa server
- MongoDB with Mongoose
- MongoDB migrations
- `dontenv` for enviorment variables + simple casting utility
- API validation with joi
- URL parameter/query based filtering with mongoose-string-query
- Auto reload dev env using supervisor (server)
- helmet
- dotEnv + centeralized config frozen global + env helpers
- Users auth (JWT for now) and password hashing (argon2)
- PM2 for production
- Vue3

## Code Style

Using [StandardJS](https://standardjs.com/)

## Getting Started

1. Clone this repo

```bash
git clone <ssh or https repo url>
```

2. Set up DB

This uses mongodb so you can set one up/ provision your own, or a `docker-compose.yml` file is provided. To use docker you must have it installed on the system you want to run the database.

3. Create `.env` file

Copy the `.env-example` file to get started and put in your project's values. Then consult the `server/config.js` file and use the `env()` for casting your variables to the types you would like. This file is a central place for your configs and env variables. It is included in the server start up process, the `mongo migrations` utility, and Koa's context via `ctx.config`.

More on casting below.

4. Install dependencies and start app

```bash
npm i

# Run in development
npm run dev

# Run development and link with chrome browser dev tools for debugging
npm run dev-console

# Run for production (remove more below about deploying)
npm run pm2-start
```

For the Vue3 frontend (It is currently configured to only be available via `<your web host>/app/*`, but this can be changed easily in the `server/routes/pages.js` and also changing the `baseUrl` in `client/src/router.js`)

```bash
cd client
npm i
npm start
```

## Env Casting Types

A simple util is included to help use the values provided by the `.env` file. The src can be found in `server/utils/env-cast.js` AND allows passing a default value. Using [dotenv-cast](https://www.npmjs.com/package/dotenv-cast).

```javascript
// string
env('NODE_ENV', 'development') // Trys to find 'NODE_ENV' var but if it cannot or it is empty then it uses 'development'

// Integer
int('PORT', 5000) // Is just expected to be a whole number, runs through parseInt()

// Float
float('FLOAT_VAR', 23.05) // runs it through parseFloat()

// Boolean
bool('USE_CACHE', true) // only is truthy when env value is 'true', no quotes needed in .env file

// JSON
json('VAR_OBJ', { msg: 'nothing here' }) // runs it through JSON.parse() so make sure it is a valid JSON string, default is standard js object

// Array
array('CATS_VAR', ['Tom', 'Willey']) // in .env file just add '[]' and values separated by commas: ex CATS_VAR=[Victor,Sassy]

// Date
date('START_DATE', new Date()) // Just passes it to new Date(var), so must be a valid date string
```

## Deployment

A simple CLI for deploying via rsync if you would like. For set up:

1. First set up the `.env` vars

`SHIP` is intended for your testing/ staging enviornment. Where `SHIP_PROD` is for your production. You would enter the destination path into these values. Since rsync supports `ssh` we can deploy to remote servers easily.

For example:

```bash
SHIP=ssh user@123.123.0.1/path/to/site/html/

# Or if you have a hostname set up in your ~/.ssh/config then you can do something like this:
SHIP=yourhostname:/path/to/site/
```

*NOTE* Also if you have included any extra directories or files outside of the ones this repo starts with and you need them in your deployment then add them to the `BUILD_LIST` array env variable.

2. Run command

```bash
npm run ship
```

It will ask you if you want to `build`, this will copy all of the nessesary files into a `.server-ready-build` directory. Almost always answer yes or `y` or just press `enter`.

Then it will ask which `env` you want to ship to, `staging` or `production`. This will correspond to the `.env` variables above.
