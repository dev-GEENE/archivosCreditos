// Función para obtener el código del lead desde la URL
function obtenerCodigoLeadDesdeURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('codigo');  // Devuelve el valor del parámetro 'codigo'
}

// Capturamos el código del lead desde la URL
let codigoLead = obtenerCodigoLeadDesdeURL();

// Mostrar si el código del lead fue capturado correctamente
console.log('Código del lead capturado desde la URL:', codigoLead);

// Función para leer un archivo como base64
function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result.split(',')[1]); // Devolver solo la parte base64
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file); // Leer el archivo como Data URL
    });
}

// Agregar el evento de envío al formulario
document.getElementById('uploadForm').addEventListener('submit', async function(event) {  
    event.preventDefault(); // Prevenir el envío estándar del formulario

    // Si no se encuentra el código del lead, mostramos un mensaje
    if (!codigoLead) {
        alert('No se encontró el código del lead en la URL');
        return; // Evitar seguir con el envío si no hay código del lead
    }
//
    // Obtener el archivo seleccionado del input de archivos
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    // Verificación: Si no se selecciona ningún archivo, mostramos un mensaje de alerta
    if (files.length === 0) {
        alert('Por favor selecciona al menos un archivo para subir.');
        return; // Evitar seguir con el envío si no hay archivos seleccionados
    }

    // Crear un objeto para contener el leadCode y los archivos
    const formData = {
        leadCode: codigoLead,
        files: []
    };

    // Agregar los archivos al objeto formData
    for (let i = 0; i < files.length; i++) {
        formData.files.push({
            name: files[i].name,
            type: files[i].type,
            size: files[i].size,
            content: await readFileAsBase64(files[i]) // Función para leer el archivo como base64
        });
    }

    // URL de tu flujo de Power Automate
    const url = `https://prod-12.brazilsouth.logic.azure.com:443/workflows/3a39a1f99dd94be4b403b0bdcfdce619/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=OWd2VCp0IR7QnXioG8UvWVx-ZekBVJ55uPkI99-IRo4`;

    // Realizar la solicitud fetch con la URL y el cuerpo en formato JSON
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Enviar los datos como JSON
        },
        body: JSON.stringify(formData)  // Serializar los datos a JSON
    })
    .then(response => {
        if (response.ok) {
            alert('Archivos subidos correctamente');
            // Recargar la página para limpiar el formulario
            window.location.reload();
        } else {
            alert('Error al subir los archivos');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error en la solicitud');
    });
});

