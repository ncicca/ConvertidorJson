const xlsx = require('xlsx');
const path = require('path');

async function contarRegistrosEnExcel(filePath) {
    try {
        // Cargar el libro de Excel
        const workbook = xlsx.readFile(filePath);

        // Obtener la primera hoja del libro
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convertir los datos de la hoja en un arreglo de objetos
        const data = xlsx.utils.sheet_to_json(worksheet);

        // Calcular la cantidad de registros (excluyendo la fila de títulos)
        const cantidadRegistros = data.length ;

        // Devolver la cantidad de registros
        return cantidadRegistros;
    } catch (error) {
        // Capturar cualquier error y lanzarlo de nuevo
        throw error;
    }
}

module.exports = { contarRegistrosEnExcel };
