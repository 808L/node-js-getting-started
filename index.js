import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from 'axios';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../ReactAppDir/cleaner/build')));

// Handle your routes here, put all API endpoints under '/api/'
app.post('/ask', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).send('Bad Request: message parameter is required');
    }

    // rest of your '/ask' endpoint code
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../ReactAppDir/cleaner/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});