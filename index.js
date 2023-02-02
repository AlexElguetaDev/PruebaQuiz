"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai"); // importamos la configuración de OpenAI Api
const express = require("express"); // importamos express
const bodyParser = require("body-parser"); // importamos middleware bodyParser
const cors = require("cors"); // importamos middleware cors
require('dotenv').config(); // importamos dotenv y su configuración
const app = express(); // express
app.use(bodyParser.json()); // añadimos bodyParser a la app
app.use(cors()); // añadimos middleware cors
const config = new openai_1.Configuration({
    apiKey: process.env.API_TOKEN // proporcionamos un api key
});
const openai = new openai_1.OpenAIApi(config); // instanciamos OpenAI
// objeto que almacena las opciones predeterminados
const options = {
    questions: 5,
    languages: ["English", "Spanish"],
    alternatives: 4,
    difficulty: ["School", "Advanced"]
};
// ruta raiz que nos da la bienvenida
app.get('/', (req, res) => {
    res.send('Welcome to the LarnU Quiz');
});
// ruta que responde con las opciones predeterminadas
app.get('/options', (req, res) => {
    res.send(options);
});
// ruta que nos genera preguntas
app.post('/generate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // desustructuramos el cuerpo de la solicitud
    const { topics, numberQuestions, language, numberOptions, difficulty, correct } = req.body;
    const languages = ["English", "Spanish"];
    const difficulties = ["School", "Advanced"];
    // validamos que nos proporcionen todos los datos
    if (!topics || !numberQuestions || !language || !numberOptions || !difficulty || !correct) {
        res.status(400).send({ error: 'All fields are required.' });
        return;
    }
    // validamos que lenguaje sea "English" o "Spanish"
    if (!languages.includes(language)) {
        res.status(400).send({ error: 'Invalid language, must be "English" or "Spanish".' });
        return;
    }
    // validamos que lenguaje sea "School" o "Advanced"
    if (!difficulties.includes(difficulty)) {
        res.status(400).send({ error: 'Invalid difficulty, must be "School" or "Advanced".' });
    }
    // validar que "topics", "language", "correct" sean string
    if (typeof topics !== 'string' || typeof language !== 'string' || typeof correct !== 'string') {
        res.status(400).send({ error: 'Topics, Language and Correct fields must be strings.' });
        return;
    }
    // validar que "numberQuestions" y "numberOptions" sean number
    if (typeof numberQuestions !== 'number' || typeof numberOptions !== 'number') {
        res.status(400).send({ error: 'Number Questions and Number Options fields must be numbers.' });
        return;
    }
    // validamos que "numberQuestions" y "numberOptions" sean numeros enteros
    if (!Number.isInteger(numberQuestions) || !Number.isInteger(numberOptions)) {
        res.status(400).send({ error: 'Number Questions and Number Options fields must be integers.' });
        return;
    }
    // validamos que "numberQuestions" y "numberOptions" sean mayores que 0
    if (numberQuestions <= 0 || numberOptions <= 0) {
        res.status(400).send({ error: 'Number Questions and Number Options fields must be greater than 0.' });
        return;
    }
    try {
        const response = yield openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Genera ${numberQuestions} preguntas sobre ${topics} con ${numberOptions} opciones de dificultad ${difficulty} en el idioma ${language}, ${correct}, el resultado debe estar en formato JSON con las claves en inglés.`,
            temperature: 0,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 2000
        });
        const message = { message: response.data.choices[0].text };
        res.send(message);
    }
    catch (err) { // manejo de errores
        console.error(err);
        res.status(500).send({ error: 'An error occurred while generating the quiz. Please try again later.' });
    }
}));
app.listen(3000, () => console.log('Listening on port 3000'));
