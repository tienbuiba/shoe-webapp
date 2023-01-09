# Shoe Web - Graduation Project

## Technology

    - Frontend: ReactJS
    - Backend: NestJS + Mysql

## Shoe Server

Shoe script to run server:

```
$ cd ./shoe-server

# Install modules
$ yarn

# Create database and table
$ yarn prisma db push

# Generate sample data
$ yarn prisma db seed

# Start server for develop environment
$ yarn start:dev
# Or production environment:
$ yarn start

# Build
$ yarn build

```

## Shoe Customer and Shoe Admin

Shoe script to run client:

```
$ cd ./shoe-customer
# Or cd ./shoe-admin

# Install modules
$ yarn

# Start client
$ yarn start

# Build client
$ yarn build

```
