import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import knex from 'knex';
import cors from 'cors';
import bcrypt from 'bcrypt';

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
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.join(__dirname, 'client/build');
app.use(express.static(buildPath));

// Endpoint to register a user
app.post('/register-user', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name.length || !email.length || !password.length) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db('users').insert({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully!' });
    } catch (err) {
        if (err.detail && err.detail.includes('already exists')) {
            res.status(409).json({ message: 'Email already exists' });
        } else {
            res.status(500).json({ message: 'An error occurred while registering the user' });
        }
    }
});

// Endpoint to login a user
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email.length || !password.length) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await db('users').where('email', email).first();
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.json({ message: 'Login successful', success: true, user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'An error occurred while logging in' });
    }
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