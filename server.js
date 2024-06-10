import express from 'express';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE_PATH = 'data.json';

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.get('/api/users', (req, res) => {
    try {
        // Read data from the JSON file
        const data = JSON.parse(fs.readFileSync(DATA_FILE_PATH, 'utf-8'));
        res.json(data);
    } catch (err) {
        console.error('Error reading data file:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/users', (req, res) => {
    try {
        // Read data from the JSON file
        const data = JSON.parse(fs.readFileSync(DATA_FILE_PATH, 'utf-8'));

        // Add new user
        const newUser = req.body;
        data.users.push(newUser);

        // Write data back to the JSON file
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data));

        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error reading or writing data file:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { app };
