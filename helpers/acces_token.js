

const axios = require('axios');
require('dotenv').config();


let accessToken = null; // Variable para almacenar el token de acceso

// Función para establecer el token de acceso
const setAccessToken = (token) => {
    accessToken = token;
};

// Función para obtener el token de acceso
const getAccessToken = () => {
    return accessToken;
};

// Función para validar si hay un token de acceso válido
const validarAccessToken = () => {
    return accessToken !== null; // Verificar si hay un token de acceso válido
};

const obtenerAccessToken = async () => {
    try {
        const response = await axios.post(
            process.env.TOKEN_URL,
            {
                grant_type: process.env.grant_type,
                client_id: process.env.client_id,
                client_secret: process.env.client_secret,
                username: 'sa',
                password: 'sa'
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        const accessToken = response.data.access_token;
        console.log(`Token generado con éxito: *****`); // Mensaje de éxito con el código del token
          return accessToken;
    } catch (error) {
        if (error.response) {
            // La solicitud fue realizada pero el servidor respondió con un código de error
            console.error('Error en la respuesta del servidor:', error.response.status, error.response.data);
        } else if (error.request) {
            // La solicitud fue realizada pero no se recibió respuesta
            console.error('Error en la solicitud:', error.request);
        } else {
            // Un error ocurrió antes de la solicitud, configuro algo incorrectamente
            console.error('Error al realizar la solicitud:', error.message);
        }
        throw new Error('Error al obtener el token de acceso');
    }
};


module.exports = {
    obtenerAccessToken,
    setAccessToken,
    getAccessToken,
    validarAccessToken
};


