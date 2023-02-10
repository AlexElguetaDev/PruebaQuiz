## LarnU Quiz API

Este repositorio contiene una API de preguntas para un cuestionario generado por el modelo de lenguaje de OpenAI. La API está construida con Express y ofrece tres endpoints para generar preguntas y opciones de respuestas.

Requisitos previos

- Tener una cuenta en OpenAI y una clave de API válida
- Tener Node.js y npm instalados en su sistema

Clone este repositorio: 
```sh
git clone https://github.com/esterepo
```
Acceda al directorio clonado:
```sh
cd esterepo
```
Instale las dependencias: 
```sh
npm install
```
Cree un archivo ```.env``` en la raíz del proyecto
```sh
touch .env
```
Modifica tu archivo ```.env``` con ```vim```
```sh
vim .env
```
Entra en modo ```INSERT``` y establezca el API Key de OpenAI como API_TOKEN
```sh
API_TOKEN = tu_api_key
~ 
~ 
-- INSERT --
```
Sal con escape y guarda los cambios con:
```sh
API_TOKEN = sk-OBS45a.....
~ 
~ 
:wq
```
Inicie el servidor:
```sh
npm start
```

## Uso

La API está disponible en ``` http://localhost:8080 ```. Los siguientes endpoints están disponibles:

``` GET / ```
Este endpoint devuelve un mensaje de bienvenida.

``` POST /generate ```
Este endpoint genera preguntas para un cuestionario. Debe enviar una solicitud JSON con los siguientes campos:

| Campos | Contenido |
| ------ | ------ |
| topics | Tema sobre el que se generarán las preguntas. |
| numberQuestions | Número de preguntas a generar. |
| language | Idioma en el que se generarán las preguntas (English o Spanish). |
| numberOptions | Número de opciones para cada pregunta. |
| difficulty | Nivel de dificultad de las preguntas (School o Advanced). |
| correct | Indicación de si se deben incluir las respuestas correctas en el cuestionario. |

``` GET /options ```
Este endpoint genera opciones predeterminadas. Nos entrega los siguientes campos:

    {
    questions: 5,
    languages: ["English", "Spanish"],
    alternatives: 4,
    difficulty: ["School", "Advanced"]
    }

> Note: El puerto en el que se inicia el servidor se puede configurar a través de la constante `PORT`. Si no se establece, se usará el puerto `8080`.

> Note: Recomendacion de la solicitud JSON :
```
{
  "topics" : "chile",
  "numberQuestions": 8,
  "language":"Spanish",
  "numberOptions": 3,
  "difficulty":"School",
  "correct":"incluyendo la respuesta correcta"
}
```
