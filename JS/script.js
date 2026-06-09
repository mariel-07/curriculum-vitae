/* ==========================================================================
   INTERACTIVIDAD Y ANIMACIONES CORPORATIVAS (JavaScript)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. EFECTO DE ESCRITURA (TYPEWRITER) EN EL HERO
    const subtitulo = document.querySelector(".subtitulo");
    // Puedes cambiar o agregar textos aquí
    const textos = ["Ingeniera de Software", "Especialista en IA", "Desarrolladora Full-Stack"];
    let indexTexto = 0;
    let indexLetra = 0;
    let borrando = false;

    function animarTexto() {
        const textoActual = textos[indexTexto];
        
        if (!borrando) {
            // Escribiendo letra por letra
            subtitulo.textContent = textoActual.substring(0, indexLetra + 1);
            indexLetra++;
            
            if (indexLetra === textoActual.length) {
                // Pausa cuando termina de escribir la palabra completa
                borrando = true;
                setTimeout(animarTexto, 2000); 
                return;
            }
        } else {
            // Borrando letra por letra
            subtitulo.textContent = textoActual.substring(0, indexLetra - 1);
            indexLetra--;
            
            if (indexLetra === 0) {
                borrando = false;
                indexTexto = (indexTexto + 1) % textos.length; // Pasa al siguiente texto
            }
        }
        
        // Velocidad: más rápido al borrar, velocidad normal al escribir
        const velocidad = borrando ? 50 : 100;
        setTimeout(animarTexto, velocidad);
    }
    
    // Iniciamos el efecto de escritura si el elemento existe
    if (subtitulo) animarTexto();


    // 2. REVEAL ON SCROLL (Aparición suave de secciones al bajar)
    // Usamos el API moderno 'IntersectionObserver' para un rendimiento óptimo
    const secciones = document.querySelectorAll("section, .card, .tech-card, .proyecto-card");
    
    // Primero agregamos la clase CSS inicial mediante JS para que no afecte el SEO si JS está desactivado
    secciones.forEach(sec => {
        sec.style.opacity = "0";
        sec.style.transform = "translateY(30px)";
        sec.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    });

    const observerOptions = {
        root: null,
        threshold: 0.1, // Se activa cuando el 10% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target); // Deja de observar una vez animado
            }
        });
    }, observerOptions);

    secciones.forEach(sec => sectionObserver.observe(sec));


    // 3. VALIDACIÓN PROFESIONAL DEL FORMULARIO DE CONTACTO
    const formulario = document.querySelector(".contacto-form");
    
    if (formulario) {
        formulario.addEventListener("submit", (e) => {
            e.preventDefault(); // Evita que la página se recargue de golpe
            
            const inputs = formulario.querySelectorAll("input, textarea");
            let formularioValido = true;

            // Validación simple de campos vacíos
            inputs.forEach(input => {
                if (input.value.trim() === "") {
                    formularioValido = false;
                    input.style.borderColor = "#ef4444"; // Borde rojo si hay error
                } else {
                    input.style.borderColor = "var(--color-borde)";
                }
            });

            if (formularioValido) {
                // Cambiamos el texto del botón simulando el envío
                const boton = formulario.querySelector("button");
                const textoOriginal = boton.innerHTML;
                
                boton.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';
                boton.style.pointerEvents = "none";
                boton.style.opacity = "0.7";

                // Simulamos una respuesta del servidor tras 1.5 segundos
                setTimeout(() => {
                    alert("¡Gracias por comunicarte! Tu mensaje ha sido enviado con éxito.");
                    formulario.reset(); // Limpia los campos
                    boton.innerHTML = textoOriginal;
                    boton.style.pointerEvents = "auto";
                    boton.style.opacity = "1";
                }, 1500);
            }
        });
    }
});
// 4. EFECTO TILT 3D PREMIUM PARA LAS TARJETAS DE TECNOLOGÍA
    const tarjetasTech = document.querySelectorAll('.tech-card');

    tarjetasTech.forEach(tarjeta => {
        tarjeta.addEventListener('mousemove', (e) => {
            const rect = tarjeta.getBoundingClientRect();
            
            // Calculamos la posición del cursor relativa al centro de la tarjeta
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centroX = rect.width / 2;
            const centroY = rect.height / 2;
            
            // Ángulo máximo de inclinación (grados)
            const maxRotacion = 12; 
            
            // Calculamos la rotación en base a la distancia del centro
            const rotacionX = ((centroY - y) / centroY) * maxRotacion;
            const rotacionY = ((x - centroX) / centroX) * maxRotacion;

            // Aplicamos la matriz de transformación 3D de forma fluida
            tarjeta.style.transform = `perspective(1000px) rotateX(${rotacionX}deg) rotateY(${rotacionY}deg) scale3d(1.04, 1.04, 1.04)`;
        });

        // Cuando el mouse sale de la tarjeta, regresa suavemente a su estado plano original
        tarjeta.addEventListener('mouseleave', () => {
            tarjeta.style.transition = "transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease";
            tarjeta.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });

        // Quitamos la transición pesada al entrar para que el movimiento sea reactivo e instantáneo
        tarjeta.addEventListener('mouseenter', () => {
            tarjeta.style.transition = "box-shadow 0.3s ease, border-color 0.3s ease";
        });
    });
