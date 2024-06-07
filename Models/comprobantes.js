
const axios = require('axios');
const { getAccessToken } = require('../helpers/acces_token');

class Comprobantes {

    constructor() {
        // Constructor opcional, puedes inicializar propiedades aquí si es necesario
    }

    //GET CLIENTES
    async obtenerComprobantes() {
        try {
            const accessToken = getAccessToken(); 
            const url = `${process.env.API_BASE_URL}/api/v2/TiposComprobantes`; 

            if (!accessToken) {
                throw new Error('No se ha obtenido un token de acceso.');
            }

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            //Procesar los datos para obtener solo código y razón social de cada cliente
            // const comprobantes = response.data.map(comprobante => 
            //     `${comprobante.nombre} - ${comprobante.comprobante} - ${comprobante.talonario[1]}` 
            // );

            const comprobantes = response.data.map(comprobante => {
                if (comprobante.talonarios.length > 0) {
                    const talonario = comprobante.talonarios[0]; // Acceder al primer talonario
                    return `${comprobante.nombre} - ${comprobante.comprobante} - Talonario: ${talonario.talonario}, Numeración: ${talonario.numeracion}, Prefijo: ${talonario.prefijo}`;
                } else {
                    return `${comprobante.nombre} - ${comprobante.comprobante} - No tiene talonarios`;
                }
            });
            
       

            return comprobantes; // Retorna la lista de clientes con código y razón social
        } catch (error) {
            throw new Error(`Error al obtener la lista de Tipos de Comprobantes: ${error.message}`);
        }

    }

    async obtenerComprobantesPageSizePageNumber (pageSize,pageNumber){

        try {
            const accessToken = getAccessToken();
            const url = `${process.env.API_BASE_URL}/api/v2/TiposComprobantes?pageSize=${pageSize}&pageNumber=${pageNumber}`;
            
            if(!accessToken){
                throw new Error (`No se ha obtenido el token de acceso`);
            }

            const response = await axios.get(url,{
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const comprobante = response.data;
            
            return console.log(JSON.stringify(comprobante, null, 2));

        } catch (error) {
            throw new Error (`Error al obtener comprobantes: ${error.message}`);
        }
    }

    
}

module.exports = Comprobantes;