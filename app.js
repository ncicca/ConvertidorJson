require('colors');


const { inquirerMenu,
         pausa,
        leerInput,
        confirmar
} = require('./helpers/inquirer');

const fs = require('fs');
const { contarRegistrosEnExcel } = require('./helpers/excel');
const { generarJSONDesdeExcel } = require('./helpers/json');
const { obtenerAccessToken, setAccessToken, getAccessToken, validarAccessToken } = require('./helpers/acces_token');
const { obtenerClientes } = require('./helpers/getClientes');
const { enviarDatos } = require('./helpers/postClientes');

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
                    const accessToken = await obtenerAccessToken();
                    setAccessToken(accessToken); // Almacenar el token obtenido
                } catch (error) {
                    console.error('Error al obtener el token de acceso:', error.message);
                }
            break;

            case '3':  
                try {
                    const excelFilePath = 'C:/Users/admin/Desktop/CC/PP/01-Convert/prueba.xlsx';
                    const jsonFilePath = 'C:/Users/admin/Desktop/CC/PP/01-Convert/ArchivoGenerado.json';
                    generarJSONDesdeExcel(excelFilePath, jsonFilePath);
                } catch (error) {
                    console.error('Error al generar JSON desde Excel:', error);
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
                }catch (error) {
                    console.error('Error al eliminar el archivo JSON:', error.message);
                }
            break;

        case '5':
                try {
                    const accessToken = await obtenerAccessToken();
                    setAccessToken(accessToken); // Almacenar el token obtenido
                    const clientes = await obtenerClientes();
                    console.log('Lista de clientes obtenida correctamente:', clientes);
                }catch (error) {
                    console.error('Error al obtener la lista de clientes:', error.message);
                }
            break;

        case '6':  
                try {
                    const accessToken = await obtenerAccessToken();
                    setAccessToken(accessToken); // Almacenar el token obtenido
                   
                    // Leer el JSON generado
                    const jsonData = require('./ArchivoGenerado.json');
            
                    // Enviar los datos a la API utilizando la función enviarDatos
                    const resultado = await enviarDatos(jsonData);
            
                    console.log('Datos enviados correctamente:', resultado);
                } catch (error) {
                    console.error('Error al procesar la opción 6:', error.message);
                }
        break;
        }
        
        await pausa();
        
    } while(opt !== '0'); 
        
    
}
main();