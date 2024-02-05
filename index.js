import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from 'axios'; // Add this line
import dotenv from 'dotenv'; // And add this line

// Get directory of current module file in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config(); // Add this line to load environment variables

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (_, res) => {
    res.render('pages/index');
});

// Replace your original '/ask' endpoint with this
app.post('/ask', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).send('Bad Request: message parameter is required');