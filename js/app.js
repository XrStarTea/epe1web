document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Elementos del DOM
    const serviceCards = document.querySelectorAll('.c-service-card');
    const btnToggleDims = document.getElementById('btn-toggle-dims');
    const blockDimensiones = document.getElementById('dimensiones-block');
    const form = document.getElementById('form-envio');
    const btnLimpiar = document.getElementById('btn-limpiar');
    const panelResultado = document.getElementById('resultado-panel');
    const contenidoResultado = document.getElementById('resultado-contenido');

    // 2. Comportamiento 1: Selección visual de un servicio
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remover clase is-selected de todas
            serviceCards.forEach(c => c.classList.remove('is-selected'));
            // Agregar al elemento clickeado
            card.classList.add('is-selected');
        });
    });

    // 3. Comportamiento 2: Mostrar u ocultar bloque de dimensiones adicionales
    btnToggleDims.addEventListener('click', () => {
        blockDimensiones.classList.toggle('is-hidden');
        
        // Actualizar texto del botón según estado
        if (blockDimensiones.classList.contains('is-hidden')) {
            btnToggleDims.textContent = 'Añadir dimensiones (Opcional)';
        } else {
            btnToggleDims.textContent = 'Ocultar dimensiones';
        }
    });

    // 4. Comportamiento 3 y 4: Validar envío y generar panel dinámico
    form.addEventListener('submit', (evento) => {
        evento.preventDefault(); // Evita la recarga de la página

        // Validación HTML5 nativa + estado visual propio
        if (!form.checkValidity()) {
            form.classList.add('was-validated'); // Clase de Bootstrap para mostrar errores nativos
            alert("Por favor, complete correctamente todos los campos obligatorios y valores mayores a cero.");
            return;
        }

        // Obtener datos del formulario
        const origen = document.getElementById('origen').value;
        const destino = document.getElementById('destino').value;
        const tipoEnvio = document.getElementById('tipo-envio').value;
        const peso = document.getElementById('peso').value;
        const urgencia = document.getElementById('urgencia').value;

        // Regla funcional de recomendación
        let servicioSugerido = "";
        if (urgencia === 'baja') {
            servicioSugerido = "Básico (3 a 5 días hábiles)";
        } else if (urgencia === 'media') {
            servicioSugerido = "Estándar (Día hábil siguiente PM)";
        } else if (urgencia === 'alta') {
            servicioSugerido = "Prioritario (Día hábil siguiente antes de las 13:00)";
        }

        // Generar DOM dinámicamente
        contenidoResultado.innerHTML = `
            <p><strong>Ruta:</strong> ${origen} a ${destino}</p>
            <p><strong>Tipo y Peso:</strong> ${tipoEnvio} - ${peso} kg</p>
            <hr>
            <h4 class="text-primary">Servicio Sugerido: ${servicioSugerido}</h4>
            <p class="text-muted small">Al continuar, se creará su Orden de Transporte (OT) para este envío.</p>
        `;

        // Mostrar panel de resultados quitando la clase is-hidden
        panelResultado.classList.remove('is-hidden');
        
        // Opcional: Hacer scroll suave hacia el resultado
        panelResultado.scrollIntoView({ behavior: 'smooth' });
    });

    // 5. Acción para limpiar y devolver al estado inicial
    btnLimpiar.addEventListener('click', () => {
        // El reset del formulario borra los inputs automáticamente
        panelResultado.classList.add('is-hidden');
        contenidoResultado.innerHTML = "";
        form.classList.remove('was-validated');
        
        // Resetear tarjetas visuales
        serviceCards.forEach(c => c.classList.remove('is-selected'));
        
        // Ocultar dimensiones si estaban abiertas
        blockDimensiones.classList.add('is-hidden');
        btnToggleDims.textContent = 'Añadir dimensiones (Opcional)';
    });
});