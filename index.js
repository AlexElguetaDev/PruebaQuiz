"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const z = __importStar(require("zod"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const config = new openai_1.Configuration({
    apiKey: process.env.API_TOKEN
});
const openai = new openai_1.OpenAIApi(config);
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
app.get('/', (req, res) => {
    res.send('Welcome to the LarnU Quiz');
});
app.get('/options', (req, res) => {
    res.send(options);
});
app.post('/generate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = requestSchema.parse(req.body);
        const response = yield openai.createCompletion({
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
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ error: 'An error occurred while generating the quiz. Please try again later.' });
    }
}));
app.listen(3000, () => console.log('Listening on port 3000'));
