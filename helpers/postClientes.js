const axios = require('axios');
const { getAccessToken } = require('./acces_token'); // Importa la función getAccessToken del archivo access_token.js

const enviarDatos = async (jsonData) => {
    try {
        const accessToken = getAccessToken(); // Obtiene el token de acceso almacenado
        const url = 'http://localhost:5001/api/v2/clientes'; // URL del endpoint para enviar los datos de clientes

        if (!accessToken) {
            throw new Error('No se ha obtenido un token de acceso.');
        }

        const response = await axios.post(url, jsonData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data; // Retorna los datos de respuesta del servidor
    } catch (error) {
        throw new Error(`Error al enviar los datos: ${error.message}`);
    }
};

module.exports = {
    enviarDatos
};
