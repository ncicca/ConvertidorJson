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

    //GET CLIENTES BY ID
    async obtenerClientesPorId(idCliente) {
        try {
            const accessToken = getAccessToken(); // Obtiene el token de acceso almacenado
            const url = `${process.env.API_BASE_URL}/api/v2/Clientes/${idCliente}`; // URL del endpoint de clientes

            if (!accessToken) {
                throw new Error('No se ha obtenido un token de acceso.');
            }

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const cliente = response.data;
            return cliente; // Retorna los datos del cliente 

            
        } catch (error) {
            throw new Error(`Error al obtener el cliente: ${error.message}`);
        }

    }

    // Función para desestructurar los datos del cliente
        async desestructurarDatosCliente(cliente) {
        if (!cliente) {
            console.log('Cliente no encontrado.');
            return null;
        }

        const {
            id,
            codigo,
            razonSocial,
            email,
            nombreFantasia,
            tratImpositivo,
            numeroImpositivoTipo,
            numeroImpositivo1,
            condicionesVenta
        } = cliente;

        return {
            id,
            codigo,
            razonSocial,
            email,
            nombreFantasia,
            tratImpositivo,
            numeroImpositivoTipo,
            numeroImpositivo1,
            condicionesVenta
        };
    }

    // Función para mostrar los datos del cliente
     async mostrarDatosCliente(cliente) {
        if (!cliente) {
            console.log('Cliente no encontrado.');
            return;
        }

        console.log('Datos del cliente:');
        console.log(`Código: ${cliente.codigo}`);
        console.log(`Razón Social: ${cliente.razonSocial}`);
        console.log(`Nombre Fantasia: ${cliente.nombreFantasia}`);
        console.log(`Correo: ${cliente.email}`);
        console.log(`Tratamiento Impositivo: ${cliente.tratImpositivo}`);
        console.log(`Numero Impositivo Tipo: ${cliente.numeroImpositivoTipo}`);
        console.log(`Numero Impositivo: ${cliente.numeroImpositivo1}`);

        if (cliente.condicionesVenta && cliente.condicionesVenta.length > 0) {
            console.log('Condiciones de Venta:[]');
            cliente.condicionesVenta.forEach((condicion, index) => {
                console.log(`Código: ${condicion.codigo}`);
                console.log(`Por Defecto: ${condicion.porDefecto}`);
                console.log(`Lista Estándar: ${condicion.listaEstandar}`);
                console.log(`Lista Oferta: ${condicion.listaOferta}`);
                console.log(`Lista Mínima: ${condicion.listaMinima}`);
            });
        } else {
            console.log('No hay condiciones de venta disponibles.');
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
