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
var openai_1 = require("openai"); // importamos las clases Configuration y OpenAIApi desde la librería 'openai'
var express = require("express"); // importamos la clase express
var bodyParser = require("body-parser"); // importamos el middleware body-parser
var cors = require("cors"); // importamos el middleware cors
require('dotenv').config(); // importamos la configuración desde el archivo .env
var app = express(); // inicializamos una instancia de express
app.use(bodyParser.json()); // configuramos body-parser para recibir JSON
app.use(cors()); // habilitamos CORS
var config = new openai_1.Configuration({
    apiKey: process.env.API_TOKEN // obtenemos la API key desde el archivo .env
});
var openai = new openai_1.OpenAIApi(config); // inicializamos una instancia de OpenAIApi con la configuración anterior
app.get('/', function (req, res) {
    res.send('Bienvenido a la Quiz de LarnU'); // enviamos un mensaje de bienvenida
});
app.get('/options', function (req, res) {
    res.send({
        "questions": 5,
        "languages": ["English", "Spanish"],
        "alternatives": 4,
        "difficulty": ["School", "Advanced"] // arreglo de strings que representa la dificultad
    });
});
app.post('/generate', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, message, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, openai.createCompletion({
                        model: 'text-davinci-003',
                        prompt: req.body.message,
                        temperature: 0,
                        top_p: 1,
                        frequency_penalty: 0,
                        presence_penalty: 0,
                        max_tokens: 2000
                    })];
            case 1:
                response = _a.sent();
                message = { message: response.data.choices[0].text };
                res.send(message); // enviamos la respuesta al cliente
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.send(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(3000, function () { return console.log('Escuchando en el puerto 3000'); });
