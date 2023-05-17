# Roundforest backend assignment

## Description

In roundforest we have sellers that collaborate with us, in order to promote their products on our platforms.

Their seller_product structure goes as the following:

```ts
- ASIN (Amazon Id: string)
- Locale (string)
- seller_name (string)
- availability (boolean)
- price (float) *price is always in USD currency regardless of Locale*
- product_name (name: string)
- product_link (string)
```

1. CRUD - Create a NodeJS server with crud (create, read, update, delete) functionality using an SQLite DB (or any other DB, not JSON or CSV)

- create (gets the seller product structure and insert it to the DB)
- read (gets <ASIN, Locale> and returns the seller_product if exists)
- update (updates a seller product data by the product identifiers)
- delete (can delete a bulk of products by <ASIN, Locale>[])
- readBySeller (gets a seller_name and returns all available products)
- getAnalysis (get the amount of available products, unavailable products, average
  price per each seller + locale.

2. Upload - Our sellers work with CSVs with the format of

- ASIN
- Locale
- price (float)
- product_name (name: string)
- product_link (string)
  Sellers tend to send us their <seller_name>\_products.csv and we need to have the ability to upload it into our DB in order we could use it later in production.
  Write an endpoint that is able to receive the csv path (in your local environment), and upload it to our sellers_product DB.
- It is given that all the products that are found in the CSV have availability = true - Max size of the CSV is only 100 rows
- If a seller_product already exists (locale + ASIN) we should perform no updates.

## Table of Contents (Optional)

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

### Prerequisites

- npm,nodeJS,Docker,Docker-compose installed.

```shell
npm install npm@latest -g
```

## Installation

```shell
git clone git@github.com:kartowka/roundforest-assignment.git
npm install
```

deploy postgresql with admin panel via docker compose file.

```shell
docker-compose up -d
```

env.example provided

```js
PORT = 3000

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings


DATABASE_URL="postgresql://admin:admin@localhost:5432/roundforest?schema=public"

DATABASE_URL contains the postgresql://<USER>:<PASSWORD>@<POSTGRESQL_URL>:<PORT>/<DB_SCHEME>?schema=public
```

## Usage

to migrate the scheme to db use as follow:

```shell
npx prisma migrate dev
```

that action will create the scheme inside the db.

at the end you can run

```shell
npm run dev
```

alternative

```shell
npm run build
npm start
```
