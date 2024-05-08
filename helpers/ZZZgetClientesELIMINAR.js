const axios = require('axios');
const { getAccessToken } = require('./acces_token'); // Importa la función getAccessToken del archivo access_token.js

const obtenerClientes = async () => {
    try {
        const accessToken = getAccessToken(); // Obtiene el token de acceso almacenado
        const url = 'http://localhost:5001/api/v2/Clientes'; // URL del endpoint de clientes

        if (!accessToken) {
            throw new Error('No se ha obtenido un token de acceso.');
        }

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        // Procesar los datos para obtener solo código y razón social de cada cliente
        const clientes = response.data.map(cliente => ({
            codigo: cliente.codigo,
            razonSocial: cliente.razonSocial
        }));

        return clientes; // Retorna la lista de clientes con código y razón social
    } catch (error) {
        throw new Error(`Error al obtener la lista de clientes: ${error.message}`);
    }
};

module.exports = {
    obtenerClientes
};
