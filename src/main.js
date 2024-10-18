// Función para obtener el código del lead desde la URL
function obtenerCodigoLeadDesdeURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('codigo');  // Devuelve el valor del parámetro 'codigo'
}

// Capturamos el código del lead desde la URL
let codigoLead = obtenerCodigoLeadDesdeURL();

// Mostrar si el código del lead fue capturado correctamente
console.log('Código del lead capturado desde la URL:', codigoLead);

// Agregar el evento de envío al formulario
document.getElementById('fileform').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío estándar del formulario

    // Si no se encuentra el código del lead, mostramos un mensaje
    if (!codigoLead) {
        alert('No se encontró el código del lead en la URL');
        return; // Evitar seguir con el envío si no hay código del lead
    }

    // Obtener el archivo seleccionado del input de archivos
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    // Verificación: Si no se selecciona ningún archivo, mostramos un mensaje de alerta
    if (files.length === 0) {
        alert('Por favor selecciona al menos un archivo para subir.');
        return; // Evitar seguir con el envío si no hay archivos seleccionados
    }

    // Crear un objeto FormData con los datos del formulario
    const formData = new FormData(document.getElementById('fileform'));
    formData.append('leadCode', codigoLead, leadCode);  // Añadir el leadCode capturado

    // Construir la URL dinámica con el código del lead
    const url = `https://prod-12.brazilsouth.logic.azure.com:443/workflows/3a39a1f99dd94be4b403b0bdcfdce619/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=OWd2VCp0IR7QnXioG8UvWVx-ZekBVJ55uPkI99-IRo4&leadCode=${codigoLead}`;

    // Realizar la solicitud fetch con la URL y el leadCode dinámico
    fetch(url, {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            alert('Archivos subidos correctamente');
            // Recargar la página para limpiar el formulario
            location.reload();
        } else {
            alert('Error al subir los archivos');
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('Error en la solicitud');
    });
});
