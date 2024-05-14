// models/clientes.js

const axios = require('axios');
const { getAccessToken } = require('../helpers/acces_token'); // Importa la función getAccessToken del archivo access_token.js

class Proveedores {

    constructor() {
        // Constructor opcional, puedes inicializar propiedades aquí si es necesario
    }

    //GET CLIENTES
    async obtenerProveedores() {
        try {
            const accessToken = getAccessToken(); // Obtiene el token de acceso almacenado
            const url = `${process.env.API_BASE_URL}/api/v2/Proveedores`; // URL del endpoint de clientes

            if (!accessToken) {
                throw new Error('No se ha obtenido un token de acceso.');
            }

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            // Procesar los datos para obtener solo código y razón social de cada cliente
            const proveedores = response.data.map(proveedor => ({
                codigo: proveedor.codigo,
                razonSocial: proveedor.razonSocial
            }));

            return proveedores; // Retorna la lista de clientes con código y razón social
        } catch (error) {
            throw new Error(`Error al obtener la lista de proveedores: ${error.message}`);
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

module.exports = Proveedores;
