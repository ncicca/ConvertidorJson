require('colors');
require('dotenv').config();
const xlsx = require('xlsx');
const fs = require('fs');
const moment = require('moment');

const { inquirerMenu, pausa } = require('./helpers/inquirer');
const { contarRegistrosEnExcel } = require('./helpers/excel');
const { generarJSONDesdeExcel, generarJSONFromRow } = require('./helpers/json');
const { obtenerAccessToken, setAccessToken } = require('./helpers/acces_token');



const Clientes = require('./Models/clientes');

console.clear();

// Función principal (main)
const main = async () => {

    const clientes = new Clientes();

    let opt = '';

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // Leer la cantidad de registros del archivo Excel
                try {
                    const filePath = process.env.EXCEL_FILE_PATH;
                    const totalRegistros = await contarRegistrosEnExcel(filePath);
                    console.log(`El archivo Excel tiene ${totalRegistros} registros (excluyendo la fila de títulos).`);
                } catch (error) {
                    console.error('Error al leer el archivo Excel:', error);
                }
                break;

            case '2':
                // Obtener y almacenar el token de acceso
                try {
                    const accessToken = await obtenerAccessToken();
                    setAccessToken(accessToken);
                } catch (error) {
                    console.error('Error al obtener el token de acceso:', error.message);
                }
                break;

            case '3':
                // Generar JSON desde Excel
                try {
                    const excelFilePath = process.env.EXCEL_FILE_PATH;
                    const jsonFilePath = process.env.JSON_FILE_PATH;
                    generarJSONDesdeExcel(excelFilePath, jsonFilePath);
                } catch (error) {
                    console.error('Error al generar JSON desde Excel:', error);
                }
                break;

            case '4':
                // Eliminar archivo JSON generado
                try {
                    const jsonFilePath = 'C:/Users/admin/Desktop/CC/PP/01-Convert/ArchivoGenerado.json';
                    if (fs.existsSync(jsonFilePath)) {
                        fs.unlinkSync(jsonFilePath);
                        console.log(`Archivo JSON '${jsonFilePath}' eliminado exitosamente.`);
                    } else {
                        console.log(`El archivo JSON '${jsonFilePath}' no existe.`);
                    }
                } catch (error) {
                    console.error('Error al eliminar el archivo JSON:', error.message);
                }
                break;

            case '5':
                // Obtener lista de clientes
                try {
                    const accessToken = await obtenerAccessToken();
                    setAccessToken(accessToken);
                    const listalientes = await clientes.obtenerClientes();
                    console.log('Lista de clientes obtenida correctamente:', listalientes);
                } catch (error) {
                    console.error('Error al obtener la lista de clientes:', error.message);
                }
                break;

            case '6':
                // Enviar datos a la API desde JSON generado
                try {
                    const accessToken = await obtenerAccessToken();
                    setAccessToken(accessToken);
                    const jsonData = require('./ArchivoGenerado.json');
                    const resultado = await clientes.enviarDatos(jsonData);
                    console.log('Datos enviados correctamente:', resultado);
                } catch (error) {
                    console.error('Error al procesar la opción 6:', error.message);
                }
                break;

            case '7':
                try {
                    const excelFilePath = process.env.EXCEL_FILE_PATH;
                    const workbook = xlsx.readFile(excelFilePath, { cellText: false });
                    const sheetName = workbook.SheetNames[0];
                    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    
                    const accessToken = await obtenerAccessToken();
                    setAccessToken(accessToken);
    
                    const currentDate = moment().format('YYYYMMDD-HHmmss'); // Obtiene la fecha y hora actual en formato específico
                    const errorFileName = `errores_${currentDate}.txt`; // Nombre del archivo de errores con fecha y hora

                    const errorFilePath = `${process.env.ERROR_FILE_PATH}/${errorFileName}`; // Ruta completa del archivo de errores
                    const errorStream = fs.createWriteStream(errorFilePath, { flags: 'a' }); // Abrir archivo en modo append

                    for (const row of sheetData) {

                        try {
                            const jsonData = generarJSONFromRow(row);
                            const resultado = await clientes.enviarDatos(jsonData);
                            console.log(`Cliente ${jsonData.Codigo} enviado.`);
                        } catch (error) {
                            console.error(`Error al enviar cliente ${row.Codigo}:`, error.message);
                            const errorMessage = `Cliente ${row.Codigo}: ${error.message}\n`;
                            errorStream.write(errorMessage);
                        }
                    }

                    errorStream.end(); 
                    console.log('Procesamiento completo.');
                    await pausa();
                } catch (error) {
                    console.error('Error al procesar clientes desde Excel:', error);
                }
                        break;
                    }

        await pausa();
    } while (opt !== '0');
};

main();
