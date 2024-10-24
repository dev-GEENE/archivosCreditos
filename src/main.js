// Función para obtener el código del lead desde la URL
function obtenerCodigoLeadDesdeURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('codigo');  // Devuelve el valor del parámetro 'codigo'
}

// Capturamos el código del lead desde la URL
let codigoLead = obtenerCodigoLeadDesdeURL();
console.log('Código del lead capturado desde la URL:', codigoLead);

// Agregar el evento de envío al botón
document.getElementById('submitButton').addEventListener('click', function(event) {  
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

    const file = files[0]; // Obtener el primer archivo
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const base64File = e.target.result.split(',')[1]; // Obtener el contenido base64

        // Crear el objeto de datos a enviar
        const data = {
            leadCode: codigoLead,
            file: {
                name: file.name,  // Nombre del archivo
                type: file.type,  // Tipo MIME del archivo
                content: base64File // Contenido del archivo en base64
            }
        };

        // Construir la URL dinámica con el código del lead
        const url = `https://prod-12.brazilsouth.logic.azure.com:443/workflows/3a39a1f99dd94be4b403b0bdcfdce619/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=OWd2VCp0IR7QnXioG8UvWVx-ZekBVJ55uPkI99-IRo4`;

        // Realizar la solicitud fetch con la URL y el cuerpo en JSON
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Especificar que el contenido es JSON
            },
            body: JSON.stringify(data) // Convertir el objeto a JSON
        })
        .then(response => {
            if (response.ok) {
                alert('Archivos subidos correctamente');
                window.location.reload(); // Recargar la página
            } else {
                return response.text().then(text => {
                    alert('Error al subir los archivos. Código de estado: ' + response.status + ' Mensaje: ' + text);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error en la solicitud');
        });
    };

    reader.readAsDataURL(file); // Leer el archivo como un Data URL
});
