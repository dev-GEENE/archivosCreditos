function obtenerCodigoLead() {
    const urlParams = new URLSearchParams(window.location.search);  
    console.log("Todos los parámetros de la URL:", window.location.search);
    return urlParams.get('leadCode'); 
}

let codigoLead = obtenerCodigoLead();

console.log('Código del lead capturado:', codigoLead);

document.getElementById('fileform').addEventListener('submit', function(event) {
    event.preventDefault(); 

    if (!codigoLead) {
        alert('No se encontró el código del lead en la URL');
        return; 
    }

    const formData = new FormData(document.getElementById('fileform'));
    formData.append('leadCode', codigoLead); 

    fetch(`https://prod-12.brazilsouth.logic.azure.com:443/workflows/3a39a1f99dd94be4b403b0bdcfdce619/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=OWd2VCp0IR7QnXioG8UvWVx-ZekBVJ55uPkI99-IRo4&leadCode=12345`, {
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



