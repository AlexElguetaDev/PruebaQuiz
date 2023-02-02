import { Configuration, OpenAIApi } from 'openai';
import express = require("express");
import bodyparser = require("body-parser");
import cors = require("cors");
import * as z from 'zod';
require('dotenv').config();

const app = express();
app.use(bodyparser.json());
app.use(cors());

const config = new Configuration({ 
    apiKey: process.env.API_TOKEN as string
});

const openai = new OpenAIApi(config);

const options = {
    questions: 5,
    languages: ["English", "Spanish"],
    alternatives: 4,
    difficulty: ["School", "Advanced"]
};

const requestSchema = z.object({
    topics: z.string(),
    numberQuestions: z.number().positive(),
    language: z.enum(["English", "Spanish"]),
    numberOptions: z.number().positive(),
    difficulty: z.enum(["School", "Advanced"]),
    correct: z.string()
}).required();


app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Welcome to the LarnU Quiz');
});

app.get('/options', (req: express.Request, res: express.Response) => {
    res.send(options);
});

app.post('/generate', async (req: express.Request, res: express.Response) => {
    try {
        const data = requestSchema.parse(req.body);

        const response = await openai.createCompletion({ 
            model: 'text-davinci-003', 
            prompt: `Genera ${data.numberQuestions} preguntas sobre ${data.topics} con ${data.numberOptions} opciones de dificultad ${data.difficulty} en el idioma ${data.language}, ${data.correct}, el resultado debe estar en formato JSON con las claves en inglés.`, 
            temperature: 0, 
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 2000
        });

        const message = { message: response.data.choices[0].text };
        res.send(message);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'An error occurred while generating the quiz. Please try again later.' });
    }
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.info(`🚀 Server ready at http://localhost:${port}`);
});

process.on('SIGINT', () => {
  console.info('Shutting down server');
  server.close(() => {
    console.info('Server shut down');
    process.exit(0);
  });
});