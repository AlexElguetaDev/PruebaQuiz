import { Configuration, OpenAIApi } from 'openai'; // importamos las clases Configuration y OpenAIApi desde la librería 'openai'
import express = require('express'); // importamos la clase express
import bodyParser = require('body-parser'); // importamos el middleware body-parser
import cors = require('cors'); // importamos el middleware cors
require('dotenv').config(); // importamos la configuración desde el archivo .env

const app = express(); // inicializamos una instancia de express
app.use(bodyParser.json()); // configuramos body-parser para recibir JSON
app.use(cors()); // habilitamos CORS

const config = new Configuration({
    apiKey: process.env.API_TOKEN // obtenemos la API key desde el archivo .env
});

const openai = new OpenAIApi(config); // inicializamos una instancia de OpenAIApi con la configuración anterior

app.get('/', (req: express.Request, res: express.Response) => { // manejamos la ruta principal
    res.send('Bienvenido a la Quiz de LarnU') // enviamos un mensaje de bienvenida
})

app.get('/options', (req: express.Request, res: express.Response) => { // manejamos la ruta '/options'
    res.send({ // emviamos las options en un objeto JSON
        "questions": 5, // valor entero que representa el numero de opciones
        "languages": ["English", "Spanish"], // arreglo de strings que representa los languages
        "alternatives": 4, // valor entero que representa el numero de alternativas por question
        "difficulty": ["School", "Advanced"] // arreglo de strings que representa la dificultad
    });
});

app.post('/generate', async (req: express.Request, res: express.Response) => { // manejamos la ruta '/generate'
    try {
        const response = await openai.createCompletion({ // llamamos al método createCompletion de la instancia de OpenAIApi
            model: 'text-davinci-003', // especificamos el modelo a utilizar
            prompt: req.body.message, // obtenemos el mensaje a completar desde el cuerpo de la petición
            temperature: 0,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 2000
        });
        const message = { message: response.data.choices[0].text }; // obtenemos el texto completado
        res.send(message); // enviamos la respuesta al cliente
    } catch (err) { // manejamos cualquier error
        res.send(err);
    }
});

app.listen(3000, () => console.log('Escuchando en el puerto 3000'));