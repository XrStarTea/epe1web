document.addEventListener('DOMContentLoaded', () => {
    
    // Elementos del DOM
    const serviceCards = document.querySelectorAll('.c-service-card');
    const btnToggleDims = document.getElementById('btn-toggle-dims');
    const blockDimensiones = document.getElementById('dimensiones-block');
    const form = document.getElementById('form-envio');
    const btnLimpiar = document.getElementById('btn-limpiar');
    const panelResultado = document.getElementById('resultado-panel');
    const contenidoResultado = document.getElementById('resultado-contenido');

    // elección visual de un servicio
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            serviceCards.forEach(c => c.classList.remove('is-selected'));
            card.classList.add('is-selected');
        });
    });
}