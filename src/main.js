// Almacenar el código del lead en el Local Storage
// Esto se puede ejecutar en la página que proporciona el código del lead
localStorage.setItem('leadCode', '12345'); // Cambia '12345' por el valor real cuando se acceda

// Función para obtener el valor de leadCode desde el Local Storage
function obtenerCodigoLead() {
    return localStorage.getItem('leadCode');  // Intenta obtener el valor de 'leadCode'
}

// Capturamos el código del lead desde el Local Storage
let codigoLead = obtenerCodigoLead();

// Mostrar si el código del lead fue capturado correctamente
console.log('Código del lead capturado:', codigoLead);

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
        } else {
            alert('Error al subir los archivos');
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('Error en la solicitud');
    });
});
