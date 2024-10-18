// Función para obtener el código del lead desde la URL
function obtenerCodigoLeadDesdeURL() {
    // Obtiene la parte de la URL después del signo de interrogación (?)
    const queryString = window.location.search;
    
    // Si hay algún valor después de '?'
    if (queryString) {
        // Elimina el '?' del inicio y devuelve el código
        return queryString.substring(1);  // Por ejemplo, '12345'
    } else {
        return null;  // Si no hay código en la URL
    }
}

// Capturamos el código del lead desde el Local Storage
let codigoLead = obtenerCodigoLead();

// Mostrar si el código del lead fue capturado correctamente
console.log('Código del lead capturado:', codigoLead);

// Agregar el evento de envío al formulario
document.getElementById('fileform').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío estándar del formulario

    // Si no se encuentra el código del lead, mostramos un mensaje
    if (!codigoLead) {
        alert('No se encontró el código del lead en el almacenamiento');
        return; // Evitar seguir con el envío si no hay código del lead
    }

    // Crear un objeto FormData con los datos del formulario
    const formData = new FormData(document.getElementById('fileform'));
    formData.append('leadCode', codigoLead);  // Añadir el leadCode capturado

    // Realizar la solicitud fetch con la URL y el leadCode dinámico
    fetch(`https://prod-12.brazilsouth.logic.azure.com:443/workflows/3a39a1f99dd94be4b403b0bdcfdce619/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=OWd2VCp0IR7QnXioG8UvWVx-ZekBVJ55uPkI99-IRo4&leadCode=${codigoLead}`, {
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

