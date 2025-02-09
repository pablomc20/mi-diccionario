import { readWordsGroupedByIds } from '../services/wordService';

export const getNewWordId = async () => {
    let words = JSON.parse(localStorage.getItem("words"));

    if (!Array.isArray(words)) {
        // Obtener palabras agrupadas por ID si no existen en localStorage
        words = await readWordsGroupedByIds();
        localStorage.setItem("words", JSON.stringify(words));
    }

    if (words.length === 0) {
        localStorage.removeItem("words");
        return null; // No hay más palabras disponibles
    }

    // Obtener un id aleatorio del array
    const randomIndex = Math.floor(Math.random() * words.length);
    const newWordId = words[randomIndex];

    // Remover la palabra seleccionada del array
    words.splice(randomIndex, 1);
    if (words.length > 0) {
        localStorage.setItem("words", JSON.stringify(words));
    } else {
        localStorage.removeItem("words"); // Eliminar si ya no hay palabras
    }

    return newWordId;
};