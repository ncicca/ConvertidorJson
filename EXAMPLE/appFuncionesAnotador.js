// Eliminar archivo JSON generado:
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