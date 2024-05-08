// models/clientes.js

const axios = require('axios');
const { getAccessToken } = require('../helpers/acces_token'); // Importa la función getAccessToken del archivo access_token.js

class Clientes {

    constructor() {
        // Constructor opcional, puedes inicializar propiedades aquí si es necesario
    }

    //GET CLIENTES
    async obtenerClientes() {
        try {
            const accessToken = getAccessToken(); // Obtiene el token de acceso almacenado
            const url = `${process.env.API_BASE_URL}/api/v2/Clientes`; // URL del endpoint de clientes

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

    }

    // POST CLIENTES
     enviarDatos = async (jsonData) => {
        try {
            const accessToken = getAccessToken(); // Obtiene el token de acceso almacenado
            const url = `${process.env.API_BASE_URL}/api/v2/clientes`; // URL del endpoint para enviar los datos de clientes

    
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


}

module.exports = Clientes;
