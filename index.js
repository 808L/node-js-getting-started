import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import gpt3ApiCall from './openaiApi.js'; // importing gpt3ApiCall

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/ask', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).send('Bad Request: message parameter is required');
    }

    try {
        const gpt3Response = await gpt3ApiCall(message);
        res.json({ response: gpt3Response });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing your request.')
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});