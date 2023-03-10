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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var openai_1 = require("openai");
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var z = require("zod");
require('dotenv').config();
var app = express();
app.use(bodyparser.json());
app.use(cors());
var config = new openai_1.Configuration({
    apiKey: process.env.API_TOKEN
});
var openai = new openai_1.OpenAIApi(config);
var options = {
    questions: 5,
    languages: ["English", "Spanish"],
    alternatives: 4,
    difficulty: ["School", "Advanced"]
};
var requestSchema = z.object({
    topics: z.string(),
    numberQuestions: z.number().positive(),
    language: z["enum"](["English", "Spanish"]),
    numberOptions: z.number().positive(),
    difficulty: z["enum"](["School", "Advanced"]),
    correct: z.string()
}).required();
app.get('/', function (req, res) {
    res.send('Welcome to the LarnU Quiz');
});
app.get('/options', function (req, res) {
    res.send(options);
});
app.post('/generate', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, response, message, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                data = requestSchema.parse(req.body);
                return [4 /*yield*/, openai.createCompletion({
                        model: 'text-davinci-003',
                        prompt: "Por favor, genera para m\u00ED ".concat(data.numberQuestions, " preguntas sobre ").concat(data.topics, " y enumerame cada pregunta, cada una con ").concat(data.numberOptions, " opciones. Me gustar\u00EDa que las preguntas sean de diferentes tipos (verdadero o falso, selecci\u00F3n m\u00FAltiple, preguntas cerradas y abiertas) y que la cantidad de cada tipo sea aleatoria. Adem\u00E1s, me gustar\u00EDa que tengan un nivel de dificultad ").concat(data.difficulty, ", ").concat(data.correct, ". Por favor, env\u00EDame el resultado en formato JSON."),
                        temperature: 0,
                        top_p: 1,
                        frequency_penalty: 0,
                        presence_penalty: 0,
                        max_tokens: 2000
                    })];
            case 1:
                response = _a.sent();
                message = { message: response.data.choices[0].text };
                res.send(message);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).send({ error: 'An error occurred while generating the quiz. Please try again later.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
var port = process.env.PORT || 8080;
var server = app.listen(port, function () {
    console.info("\uD83D\uDE80 Server ready at http://localhost:".concat(port));
});
process.on('SIGINT', function () {
    console.info('Shutting down server');
    server.close(function () {
        console.info('Server shut down');
        process.exit(0);
    });
});
