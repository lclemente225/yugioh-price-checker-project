const express = require('express');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST_URL,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_USER
});

async function mysqlConnection(req, res, next) {
    try {
            req.db = await pool.getConnection();

            req.db.connection.config.namedPlaceholders = true;
        
            // Traditional mode ensures not null is respected for unsupplied fields, ensures valid JavaScript dates, etc.
            await req.db.query('SET SESSION sql_mode = "TRADITIONAL"');
            await req.db.query(`SET time_zone = '-8:00'`);

        
            await next();
            req.db.release();
            
    } catch (err) {
    // If anything downstream throw an error, we must r elease the connection allocated for the request
    
            console.log(err)
            if (req.db){
                req.db.release();
                }

            throw err;
    }
}

export {pool, mysqlConnection};