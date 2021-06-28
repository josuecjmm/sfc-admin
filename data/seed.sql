-- CREATE DATABASE
CREATE DATABASE GYM;

USE GYM;

CREATE TABLE User
(
    id                     INT AUTO_INCREMENT PRIMARY KEY,
    personalId             VARCHAR(255) NOT NULL,
    password               VARCHAR(255) NOT NULL,
    fullName               VARCHAR(255) NOT NULL,
    reset_token            TEXT,
    reset_token_expiration DATETIME
);


CREATE TABLE Error
(
    id    INT AUTO_INCREMENT PRIMARY KEY,
    date  DATE NOT NULL,
    error TEXT NOT NULL
);


CREATE TABLE Monday
(
    id    INT AUTO_INCREMENT PRIMARY KEY,
    hour VARCHAR(55) NOT NULL,
    total INT NOT NULL
);

CREATE TABLE Tuesday
(
    id    INT AUTO_INCREMENT PRIMARY KEY,
    hour VARCHAR(55) NOT NULL,
    total INT NOT NULL
);

CREATE TABLE Wednesday
(
    id    INT AUTO_INCREMENT PRIMARY KEY,
    hour VARCHAR(55) NOT NULL,
    total INT NOT NULL
);

CREATE TABLE Thursday
(
    id    INT AUTO_INCREMENT PRIMARY KEY,
    hour VARCHAR(55) NOT NULL,
    total INT NOT NULL
);

CREATE TABLE Friday
(
    id    INT AUTO_INCREMENT PRIMARY KEY,
    hour VARCHAR(55) NOT NULL,
    total INT NOT NULL
);

CREATE TABLE Saturday
(
    id    INT AUTO_INCREMENT PRIMARY KEY,
    hour  VARCHAR(55) NOT NULL,
    total INT         NOT NULL
);
