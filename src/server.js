import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import knex from 'knex';
import cors from 'cors';



// Initialize knex for database connection
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'loginforrestaurant'
    }
});

// Create Express app
const app = express();
app.use(cors());

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Determine build path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.join(__dirname, 'client/build');

// Serve static files from the React app
app.use(express.static(buildPath));

// Endpoint to register a user
app.post('/register-user', (req, res) => {
    const { name, email, password } = req.body;
    if (!name.length || !email.length || !password.length) {
        return res.json('All fields are required');
    }
    db("users").insert({ name, email, password })
        .returning(["name", "email"])
        .then(data => {
            res.json(data[0]);
        })
        .catch(err => {
            if (err.detail && err.detail.includes('already exists')) {
                res.json('Email already exists');
            } else {
                res.status(500).json('An error occurred while registering the user');
            }
        });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});