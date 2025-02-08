import { useState, useEffect } from 'react';

function useIsMobile(zise) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= zise); // Si el ancho de la ventana es menor o igual a 768px, es móvil
        };

        checkIfMobile(); // Verifica si es móvil al montar el componente

        // Añade el event listener para actualizar el estado si cambia el tamaño de la ventana
        window.addEventListener('resize', checkIfMobile);

        // Limpia el event listener cuando el componente se desmonte
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    return isMobile; // Devuelve directamente el valor de isMobile
}

export default useIsMobile;
