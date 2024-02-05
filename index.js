const express = require('express');
const path = require('path');
const openai = require('openai');

const PORT = process.env.PORT || 5001;

openai.apiKey = process.env.OPENAI_API_KEY;

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get('/cool', async (req, res) => {
        try {
            const gptResponse = await openai.Completion.create({
                engine: "davinci-codex",
                prompt: "Translate the following English text to French: '{}'",
                maxTokens: 60,
            });

            res.send(gptResponse.data.choices[0].text.strip());
        } catch (error) {
            res.status(500).send(error.message);
        }
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));