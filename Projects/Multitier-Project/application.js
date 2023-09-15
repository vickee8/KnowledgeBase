const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'your-mysql-hostname-or-ip',
    user: 'your-mysql-username',
    password: 'your-mysql-password',
    database: 'poll_db'
});

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable CORS for your frontend domain
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://your-frontend-domain');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Handle form submissions
app.post('/submit', (req, res) => {
    const { name, animal } = req.body;
    const sql = 'INSERT INTO poll (name, animal) VALUES (?, ?)';
    
    // Use the connection pool to execute the query
    pool.query(sql, [name, animal], (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err.message);
            res.status(500).send('Error submitting data.');
        } else {
            console.log(`Inserted ${result.affectedRows} record`);
            res.status(200).send('Data submitted successfully.');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

