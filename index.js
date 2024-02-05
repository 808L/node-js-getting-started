const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const openai = require('openai');

const PORT = process.env.PORT || 5001;

openai.apiKey = process.env.OPENAI_API_KEY;


const app = express();

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));

app.post('/ask', async (req, res) => {
    const userQuestion = req.body.message; // User's question
    try {
        const gptResponse = await openai.Completion.create({
            engine: "davinci-codex",
            prompt: userQuestion,
            maxTokens: 60
        });
        res.send(gptResponse.data.choices[0].text.strip());
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

import 'bootstrap/dist/css/bootstrap.min.css';