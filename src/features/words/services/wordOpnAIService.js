import apiJson from './apiJson'

/**
 * Traduce una lista de oraciones usando OpenAI.
 * @param {string[]} sentences - Array de oraciones a traducir.
 * @returns {Promise<string[]>} - Array con las traducciones.
 */
export const retrieveSentencesTraduction = async (sentences) => {
    try {
        const response = await apiJson.post("/openai/translate", { sentences });
        return response.data; // `axios` ya devuelve el JSON directamente en `data`
    } catch (error) {
        console.error("Error en retrieveSentencesTraduction:", error);
        return []; // Devuelve un array vacío en caso de error
    }
};

const getFirstWord = (text) => {
    const words = text.split(' ');
    return words[0];
}
/**
 * Obtiene la pronunciación de una palabra.
 * @param {string} word - Palabra a buscar.
 * @returns {Promise<string>} - Pronunciación en formato string.
 */
export const retrievPronunciation = async (word) => {
    try {
        const response = await apiJson.get(`/openai/pronunciations/${getFirstWord(word)}`);
        return response.data;
    } catch (error) {
        console.error("Error en retrievPronunciation:", error);
        return "";
    }
};

export const buildDataWord = async (word) => {
    try {
        const response = await apiJson.get(`/openai/vocabulary/${word}`);
        return response.data;
    } catch (error) {
        console.error('Error en buildDataWord:', error);
        return []; // Devuelve un array vacío en caso de error
    }
}