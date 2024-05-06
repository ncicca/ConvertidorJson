require('colors');

// const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
// desestructuro el helpers/inquirer y saco las funciones/objetos de este archivo
const { inquirerMenu,
         pausa,
        leerInput,
        confirmar
} = require('./helpers/inquirer');
const fs = require('fs');
const { contarRegistrosEnExcel } = require('./helpers/excel');
const { generarJSONDesdeExcel } = require('./helpers/json');

console.clear();
//Funcion Main
const main = async()  => {
    
    //Inicializo la variable opt
    let opt='';

    do{
        //Llamo al menu de inquirerMenu
        opt = await inquirerMenu();
      
        //Uso un switch para cada caso
        switch (opt) {
            
            case '1': //Leo la cantidad de registros del archivo excel

                try {
                    const filePath = 'C:/Users/admin/Desktop/CC/PP/01-Convert/prueba.xlsx';
                    const totalRegistros = await contarRegistrosEnExcel(filePath);
                    console.log(`El archivo Excel tiene ${totalRegistros} registros (excluyendo la fila de títulos).`);
                } catch (error) {
                    console.error('Error al leer el archivo Excel:', error);
                }

            break;


            case '2': 
                try {
                    const excelFilePath = 'C:/Users/admin/Desktop/CC/PP/01-Convert/prueba.xlsx';
                    const jsonFilePath = 'C:/Users/admin/Desktop/CC/PP/01-Convert/ArchivoGenerado.json';
                    generarJSONDesdeExcel(excelFilePath, jsonFilePath);
                } catch (error) {
                    console.error('Error al generar JSON desde Excel:', error);
                }
            break;

            case '3':  
            try {
                const jsonFilePath = 'C:/Users/admin/Desktop/CC/PP/01-Convert/ArchivoGenerado.json';
                const apiUrl = 'https://url-del-sistema-de-gestion/api/endpoint'; // Reemplaza con la URL de la API del sistema de gestión
                const authUrl = 'https://url-de-autenticacion/oauth2/token'; // Reemplaza con la URL de autenticación
                const clientId = 'tu_client_id';
                const clientSecret = 'tu_client_secret';
        
                // Obtener el access token
                const accessToken = await obtenerAccessToken(authUrl, clientId, clientSecret);
        
                // Enviar el JSON con el access token
                await enviarJSONAlSistema(jsonFilePath, apiUrl, accessToken);
            } catch (error) {
                console.error('Error al enviar el JSON al sistema:', error.message);
            }
        break;


        case '4':  
        try {
            const jsonFilePath = 'C:/Users/admin/Desktop/CC/PP/01-Convert/ArchivoGenerado.json';
    
            // Verificar si el archivo existe antes de intentar eliminarlo
            if (fs.existsSync(jsonFilePath)) {
                fs.unlinkSync(jsonFilePath); // Elimina el archivo JSON
                console.log(`Archivo JSON '${jsonFilePath}' eliminado exitosamente.`);
            } else {
                console.log(`El archivo JSON '${jsonFilePath}' no existe.`);
            }
        } catch (error) {
            console.error('Error al eliminar el archivo JSON:', error.message);
        }
        break;

        case '5':  
        try {
            console.log("Ver listado de clientes en proceso")
        } catch (error) {
            console.error('Error:', error.message);
        }
        break;



        }
        
            
        
        await pausa();
        
    } while(opt !== '0'); 
        
    
}
main();