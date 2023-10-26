const express = require('express');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST_URL,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_USER
});

export {pool};