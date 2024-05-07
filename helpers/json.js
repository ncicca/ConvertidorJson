const xlsx = require('xlsx');
const fs = require('fs');
const moment = require('moment');


   // Función para convertir el valor booleano desde una cadena
   const getBooleanValue = (value) => {
    if (typeof value === 'string') {
        return value.toLowerCase() === 'true';
    }
    return Boolean(value);
};

// Función para convertir una fila del Excel en un objeto JSON
const generarJSONFromRow = (row) => {
    const fechaAlta = moment().format('YYYY-MM-DD');
    const codigoCondicionVenta = String(row.condicionesVenta_codigo);
    const imputacionContable = String(row.imputacionContable);

    return {
        "Codigo": String(row.Codigo),
        "razonSocial": row.razonSocial,
        "nombreFantasia": row.nombreFantasia,
        "email": row.email,
        "paginaWeb": row.paginaWeb,
        "nuestroCodigoProve": row.nuestroCodigoProve === "null" ? null : row.nuestroCodigoProve,
        "administradaPor": row.administradaPor === "null" ? null : row.administradaPor,
        "tratImpositivo": row.tratImpositivo.toString().padStart(3, '0'),
        "numeroImpositivoTipo": String(row.numeroImpositivoTipo),
        "numeroImpositivo1": String(row.numeroImpositivo1),
        "numeroImpositivo2": row.numeroImpositivo2 === "null" ? null : String(row.numeroImpositivo2),
        "prioridadFacturacion": row.prioridadFacturacion === "null" ? null : row.prioridadFacturacion,
        "todosSuspendidos": row.todosSuspendidos === "true" ? true : false,
        "fechaAlta": fechaAlta,
        "vendedor": String(row.vendedor),
        "cobrador": String(row.cobrador),
        "claveAcceso": row.claveAcceso === "null" ? null : row.claveAcceso,
        "deudaGlobal": row.deudaGlobal === "null" ? null : row.deudaGlobal,
        "noDocumentada": row.noDocumentada === "null" ? null : row.noDocumentada,
        "documentadaPropia": row.documentadaPropia === "null" ? null : row.documentadaPropia,
        "documentadaTerceros": row.documentadaTerceros === "null" ? null : row.documentadaTerceros,
        "empresaAlta": parseInt(row.empresaAlta),
        "departamento": row.departamento === "null" ? null : row.departamento,
        "tasaDepartamental": row.tasaDepartamental,
        "convenioMultilateral": row.convenioMultilateral === "true" ? true : false,
        "tratImpositivoProv": row.tratImpositivoProv.toString().padStart(3, '0'),
        "habilitadoHasta": row.habilitadoHasta === "null" ? null : row.habilitadoHasta,
        "fechareg": row.fechareg === "null" ? null : row.fechareg,
        "imagenes": row.imagen && row.tipo ? [{ "imagen": row.imagen, "tipo": row.tipo }] : [],
        "rutas": row.rutas_codigo ? [{ "codigo": row.rutas_codigo }] : [],
        "items": row.items_Codigo && row.items_CodigoPropio ? [{ "Codigo": row.items_Codigo, "CodigoPropio": row.items_CodigoPropio }] : [],
        "exenciones": [],
        "ingresosBrutos": row.ingresosBrutos_Provincia && row.ingresosBrutos_Porcentaje ? [{ "Provincia": row.ingresosBrutos_Provincia, "Porcentaje": row.ingresosBrutos_Porcentaje }] : [],
        "provinciasAgenteRetencion": row.provinciasAgenteRetencion_Provincia ? [{ "Provincia": row.provinciasAgenteRetencion_Provincia }] : [],
        "condicionesVenta": [{
            "codigo": codigoCondicionVenta,
            "porDefecto": row.condicionesVenta_porDefecto === "true" ? true : false,
            "listaEstandar": row.condicionesVenta_listaEstandar,
            "listaOferta": row.condicionesVenta_listaOferta,
            "listaMinima": row.condicionesVenta_listaMinima
        }],
        "atributos": row.atributos_codigo && row.atributos_valor ? [{ "codigo": row.atributos_codigo, "valor": row.atributos_valor }] : [],
        "comprobantesSuspendidos": [],
        "cuentasCorrientes": [{
            "imputacionContable": imputacionContable,
            "porDefecto": getBooleanValue(row.porDefecto)
        }],
        "domicilios": [],
        "empresas": row.empresa_Codigo ? [{ "codigo": row.empresa_Codigo }] : []
    };
};

// Función para generar JSON desde un archivo Excel
const generarJSONDesdeExcel = (excelFilePath, jsonFilePath) => {
    // Cargamos el archivo Excel
    const workbook = xlsx.readFile(excelFilePath, { cellText: false });
    const sheetName = workbook.SheetNames[0]; // Obtenemos el nombre de la primera hoja
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convertimos la hoja en JSON

    // Mapeamos los datos del Excel a un array de objetos JSON utilizando generarJSONFromRow
    const jsonData = sheetData.map(row => generarJSONFromRow(row));

    // Escribimos el JSON en un archivo y mostramos un mensaje
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2)); // Guardamos el JSON en el archivo
    console.log('JSON generado exitosamente.');
};

module.exports = {
    generarJSONDesdeExcel,
    generarJSONFromRow,
    getBooleanValue
};
