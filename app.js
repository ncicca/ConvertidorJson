require('colors');
require('dotenv').config();
const xlsx = require('xlsx');
const fs = require('fs');
const moment = require('moment');

const { inquirerMenu,
        inquirerSubMenuClientes,
        inquirerSubMenuProveedores,
        inquirerSubMenuComprobantes,
        pausa, 
        leerInput } = require('./helpers/inquirer');

const { contarRegistrosEnExcel } = require('./helpers/excel');
const { generarJSONDesdeExcel, generarJSONFromRow } = require('./helpers/json');
const { obtenerAccessToken, setAccessToken } = require('./helpers/acces_token');

const Clientes = require('./Models/clientes');
const Proveedores = require('./Models/proveedores');
const Comprobantes = require('./Models/comprobantes');

console.clear();

// Función principal (main)
const main = async () => {

    const clientes = new Clientes();
    const proveedores = new Proveedores();
    const comprobantes = new Comprobantes();

    let opt = '';

//--------------------------------------------------------  MENU PRINCIPAL ----------------------------------------------------------------
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                await manejarSubMenuClientes();
                break;

            case '2':
                await manejarSubMenuProveedores();
                break;

            case '3':
                await manejarSubMenuComprobantes();
                break;

            case '4':
                console.log('vacio');
                break;

            case '5':
                
                console.log('vacio');
               break;

            case '6':
                
                console.log('vacio');    
                break;

            case '7':

                 // Generar JSON desde Excel
                 try {
                    const excelFilePath = process.env.EXCEL_FILE_PATH_CLIENTES;
                    const jsonFilePath = process.env.JSON_FILE_PATH_CLIENTES;
                    generarJSONDesdeExcel(excelFilePath, jsonFilePath);
                } catch (error) {
                    console.error('Error al generar JSON desde Excel:', error);
                }
                break;

  
            case '8':
                // Obtener y almacenar el token de acceso
                try {
                    const accessToken = await obtenerAccessToken();
                    setAccessToken(accessToken);
                } catch (error) {
                    console.error('Error al obtener el token de acceso:', error.message);
                }
                
                break;
            }

        // await pausa();
    } while (opt !== '0');
};

//--------------------------------------------------------  SUB MENU CLIENTES ----------------------------------------------------------------
const manejarSubMenuClientes = async () => {

        const clientes = new Clientes();
        let subOpt = '';

        do{
            subOpt= await inquirerSubMenuClientes();

            switch (subOpt) {
                case '1':
                    try {
                        const accessToken = await obtenerAccessToken();
                        setAccessToken(accessToken);
                        const listaclientes = await clientes.obtenerClientes();
                        console.log('Lista de clientes obtenida correctamente:', listaclientes);
                    } catch (error) {
                        console.error('Error al obtener la lista de clientes:', error.message);
                    }
                    break;
            
                case '2':
                    try {
                        const accessToken = await obtenerAccessToken();
                        setAccessToken(accessToken);
    
                        const idCliente= await leerInput('Ingrese el ID del cliente que desea buscar:');
                        const cliente = await clientes.obtenerClientesPorId(idCliente);
       
                         if (cliente) {
                            const clienteDesestructurado = await clientes.desestructurarDatosCliente(cliente);
                            clientes.mostrarDatosCliente(clienteDesestructurado);
                        } else {
                            console.log('Cliente no encontrado.');
                        }
                    } catch (error) {
                        console.error('Error al obtener el cliente:', error.message);
                    }
                    break;

                case '3':

                    try {
                        const excelFilePath = process.env.EXCEL_FILE_PATH_CLIENTES;
                        const workbook = xlsx.readFile(excelFilePath, { cellText: false });
                        const sheetName = workbook.SheetNames[0];
                        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        
                        const accessToken = await obtenerAccessToken();
                        setAccessToken(accessToken);
        
                        const currentDate = moment().format('YYYYMMDD-HHmmss'); // Obtiene la fecha y hora actual en formato específico
                        const errorFileName = `errores_${currentDate}.txt`; // Nombre del archivo de errores con fecha y hora

                        const errorFilePath = `${process.env.ERROR_FILE_PATH_CLIENTES}/${errorFileName}`; // Ruta completa del archivo de errores
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

                case '4':
                        // Leer la cantidad de registros del archivo Excel
                try {
                    const filePath = process.env.EXCEL_FILE_PATH_CLIENTES;
                    const totalRegistros = await contarRegistrosEnExcel(filePath);
                    console.log(`El archivo Excel tiene ${totalRegistros} registros (excluyendo la fila de títulos).`);
                } catch (error) {
                    console.error('Error al leer el archivo Excel:', error);
                }
                break;

            }
            
            if (subOpt !== '0') await pausa();
        }while(subOpt !=='0');
    }

//--------------------------------------------------------  SUB MENU PROVEEDORES ----------------------------------------------------------------

    const manejarSubMenuProveedores = async () => {

        const proveedores = new Proveedores();
        let subOpt = '';

        do{
            subOpt= await inquirerSubMenuProveedores();

            switch (subOpt) {
                case '1':
                    // Obtener Lista de proveedores
                try {
                    const accessToken = await obtenerAccessToken();
                    setAccessToken(accessToken);
                    const listaProveedores = await proveedores.obtenerProveedores();
                    console.log('Lista de clientes obtenida correctamente:', listaProveedores);
                } catch (error) {
                    console.error('Error al obtener la lista de clientes:', error.message);
                }
                    break;
            
                case '2':
                    //Obtener proveedor por ID
                    try {
                        const accessToken = await obtenerAccessToken();
                        setAccessToken(accessToken);
    
                        const idProveedor= await leerInput('Ingrese el ID del proveedor que desea buscar:');
                        const proveedor = await proveedores.obtenerProveedorPorId(idProveedor);
                               
                        if (proveedor) {
                            const proveedorDesestructurado = await proveedores.desestructurarDatosProveedor(proveedor);
                            proveedores.mostrarDatosProveedor(proveedorDesestructurado);
                        } else {
                            console.log('Proveedor no encontrado.');
                        }

                    } catch (error) {
                        console.error('Error al obtener el proveedor:', error.message);
                    }
                    break;

                case '3':

                    console.log('Desarrollar funcionalidad importar proveedores');
                    break;

                case '4':
                    console.log('Desarrollar funcionalidad Leer registros excel');
                    break;

            }
            
            if (subOpt !== '0') await pausa();
        }while(subOpt !=='0');
    }

//--------------------------------------------------------  SUB MENU COMPROBANTES ----------------------------------------------------------------

const manejarSubMenuComprobantes = async () => {

    const comprobantes = new Comprobantes();
    let subOpt = '';

    do{
        subOpt= await inquirerSubMenuComprobantes();

        switch (subOpt) {
            case '1':
                //Obtener comprobantes totales
                try {
                    const accessToken = await obtenerAccessToken();
                    setAccessToken(accessToken);
                    const listaComprobantes = await comprobantes.obtenerComprobantes();
                    console.log('Lista de comprobantes obtenida:', listaComprobantes);
                } catch (error) {
                    console.error('Error al obtener la lista de comprobantes:', error.message);
                }
                break;
        
            case '2':
                //Obtener comprobantes por pageSize & pageNumber
                try {
                    const accessToken = await obtenerAccessToken();
                    setAccessToken(accessToken);

                    const pageSize = await leerInput('Ingrese el dato pageSize:');
                    const pageNumber = await leerInput('Ingrese el dato pageNumber:');
                    
                    const listadoComprobantes = await comprobantes.obtenerComprobantesPageSizePageNumber(pageSize,pageNumber);
                    
                } catch (error) {
                    console.log('Error al obtener listado de comprobantes:',error.message);
                }
                break;

            case '3':

                console.log('Desarrollar');
                break;

            case '4':
                console.log('Desarrollar');
                break;

        }
        
        if (subOpt !== '0') await pausa();
    }while(subOpt !=='0');
}
main();
