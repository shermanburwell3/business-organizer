DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

\c company_db

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL,
);

