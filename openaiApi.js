import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const gpt3ApiCall = async (prompt) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            { prompt, max_tokens: 60 },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            },
        );
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default gpt3ApiCall;