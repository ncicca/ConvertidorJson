const xlsx = require('xlsx');
const fs = require('fs');
const moment = require('moment');

const generarJSONDesdeExcel = (excelFilePath, jsonFilePath) => {
    // Cargo el archivo excel
    const workbook = xlsx.readFile(excelFilePath, { cellText: false });
    const sheetName = workbook.SheetNames[0]; // Indicando que solo hay una hoja en el excel

    // Obtengo los datos del excel
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Función para convertir el valor booleano desde una cadena
    const getBooleanValue = (value) => {
        if (typeof value === 'string') {
            return value.toLowerCase() === 'true';
        }
        return Boolean(value);
    };

    // Mapeo los datos con la estructura requerida
    const jsonData = sheetData.map(row => {
        const fechaAlta = moment().format('YYYY-MM-DD');

        // Convertir el valor del campo 'condicionesVenta_codigo' a string
        const codigoCondicionVenta = String(row.condicionesVenta_codigo);

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
            "condicionesVenta": row.condicionesVenta_codigo && row.condicionesVenta_porDefecto && row.condicionesVenta_listaEstandar
                                && row.condicionesVenta_listaOferta && row.condicionesVenta_listaMinima ? 
                                [{
                                    "codigo": codigoCondicionVenta, // Usamos la variable 'codigoCondicionVenta' convertida a string
                                    "porDefecto": row.condicionesVenta_porDefecto === "true" ? true : false,
                                    "listaEstandar": row.condicionesVenta_listaEstandar,
                                    "listaOferta": row.condicionesVenta_listaOferta,
                                    "listaMinima": row.condicionesVenta_listaMinima
                                }] : [],
            "atributos": row.atributos_codigo && row.atributos_valor ? [{ "codigo": row.atributos_codigo, "valor": row.atributos_valor }] : [],
            "comprobantesSuspendidos": [],
            "cuentasCorrientes": [],
            "domicilios": row.domicilios_Descripcion || row.domicilios_Domicilio1 || row.domicilios_Domicilio2 || row.domicilios_CodigoPostal ||
                          row.domicilios_Localidad || row.domicilios_Provincia || row.domicilios_Pais || row.domicilios_Telefono || row.domicilios_Fax ||
                          row.domicilios_Gnl || row.domicilios_Observaciones || row.domicilios_nroOrden || row.domicilios_Transportista ||
                          row.domicilios_Principal !== null || row.domicilios_Habilitado !== null ?
                          [{ 
                              "Descripcion": row.domicilios_Descripcion || null, 
                              "Domicilio1": row.domicilios_Domicilio1 || null, 
                              "Domicilio2": row.domicilios_Domicilio2 || null, 
                              "CodigoPostal": row.domicilios_CodigoPostal || null, 
                              "Localidad": row.domicilios_Localidad || null, 
                              "Provincia": row.domicilios_Provincia || null, 
                              "Pais": row.domicilios_Pais !== "null" ? row.domicilios_Pais : null, 
                              "Telefono": row.domicilios_Telefono,
                              "Fax": row.domicilios_Fax !== "null" ? row.domicilios_Fax : null, 
                              "Gnl": row.domicilios_Gnl !== "null" ? row.domicilios_Gnl : null, 
                              "Observaciones": row.domicilios_Observaciones !== "null" ? row.domicilios_Observaciones : null, 
                              "nroOrden": row.domicilios_nroOrden !== "null" ? row.domicilios_nroOrden : null,
                              "Transportista": row.domicilios_Transportista !== "null" ? row.domicilios_Transportista : null, 
                              "Principal": getBooleanValue(row.domicilios_Principal), 
                              "Habilitado": getBooleanValue(row.domicilios_Habilitado) 
                          }] : [],
            "empresas": row.empresa_Codigo ? [{ "codigo": row.empresa_Codigo }] : []
        };
    });

    // Guardar el JSON en un archivo y mostrar mensaje
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
    console.log('JSON generado exitosamente.');
};

module.exports = {
    generarJSONDesdeExcel
};
