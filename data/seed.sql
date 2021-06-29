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

CREATE TABLE DaySchedule
(
    id    INT AUTO_INCREMENT PRIMARY KEY,
    day   VARCHAR(255) NOT NULL,
    hour VARCHAR(55) NOT NULL,
    total INT NOT NULL
);

CREATE TABLE Appointment
(
    id    INT AUTO_INCREMENT PRIMARY KEY,
    dayScheduleId   INT,
    userId INT,
    FOREIGN KEY( dayScheduleId) REFERENCES DaySchedule(id),
    FOREIGN KEY( userId) REFERENCES User(id)
);
