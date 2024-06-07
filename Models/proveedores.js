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

    //Obtener proveedores por ID:
        async obtenerProveedorPorId(idProveedor) {
            try {
                const accessToken = getAccessToken(); // Obtiene el token de acceso almacenado
                const url = `${process.env.API_BASE_URL}/api/v2/Proveedores/${idProveedor}`; // URL del endpoint de clientes
    
                if (!accessToken) {
                    throw new Error('No se ha obtenido un token de acceso.');
                }
    
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                
                const proveedor = response.data;
                return proveedor; // Retorna los datos del proveedor
    
                
            } catch (error) {
                throw new Error(`Error al obtener el proveedor: ${error.message}`);
            }
    
        }


        // Función para desestructurar los datos del cliente
        async desestructurarDatosProveedor(proveedor) {
            if (!proveedor) {
                console.log('Proveedor no encontrado.');
                return null;
            }
    
            const {
                id,
                codigo,
                razonSocial,
                email,
                nombreFantasia,
                tratImpositivo,
                tratImpositivoProv,
                numeroImpositivoTipo,
                numeroImpositivo1,
                condicionCompra
            } = proveedor;
    
            return {
                id,
                codigo,
                razonSocial,
                email,
                nombreFantasia,
                tratImpositivo,
                tratImpositivoProv,
                numeroImpositivoTipo,
                numeroImpositivo1,
                condicionCompra
            };
        }
    
        // Función para mostrar los datos del cliente
         async mostrarDatosProveedor(proveedor) {
            if (!proveedor) {
                console.log('Proveedor no encontrado.');
                return;
            }
    
            console.log('Datos del proveedor:');
            console.log(`Código: ${proveedor.codigo}`);
            console.log(`Razón Social: ${proveedor.razonSocial}`);
            console.log(`Nombre Fantasia: ${proveedor.nombreFantasia}`);
            console.log(`Correo: ${proveedor.email}`);
            console.log(`Tratamiento Impositivo: ${proveedor.tratImpositivo}`);
            console.log(`Tratamiento Impositivo Provincial: ${proveedor.tratImpositivoProv}`);
            console.log(`Numero Impositivo Tipo: ${proveedor.numeroImpositivoTipo}`);
            console.log(`Numero Impositivo: ${proveedor.numeroImpositivo1}`);
            console.log(`Condicion de compra: ${proveedor.condicionCompra}`);
    
            
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
