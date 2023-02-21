# Northcoders News API

## Readme

Your database will be PSQL, and you will interact with it using [node-postgres](https://node-postgres.com/).

Set your env files to the following:
.env.test to point to PGDATABASE=nc_news_test
.env.development to point to PGDATABASE=nc_news

Project uses the following scripts:

npm install husky --save-dev // dont think I needed to action myself in the end will ask

npm i express // server module
npm i jest
npm install --save-dev jest-sorted
npm install dotenv --save
npm i -D supertest

    "setup-dbs": "psql -f ./db/setup.sql",
    "seed": "node ./db/seeds/run-seed.js",
