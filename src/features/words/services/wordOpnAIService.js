import apiJson from './apiJson'

/**
 * Traduce una lista de oraciones usando OpenAI.
 * @param {[string]} sentences - Array de oraciones a traducir.
 * @returns {Promise<string[]>} - Array con las traducciones.
 */
export const retrieveSentencesTraduction = async (sentences) => {
    try {
        const obj = { sentences: sentences };

        const response = await apiJson.post("/openai/translate", obj);

        return response.data.data; // `axios` ya devuelve el JSON directamente en `data`
    } catch (error) {
        console.error("Error en retrieveSentencesTraduction:", error);
        return []; // Devuelve un array vacío en caso de error
    }
};
/**
 * Genera un promtp para obtener detalles de una palabra usando GeminiFlash
 * @param {string} word - Palabra a generar
 * @returns {Promise<Word>} - Json con las propiedades de la palabra.
 */
export const buildDataWord = async (word) => {
    try {
        const response = await apiJson.post(`/openai/vocabulary/${word}`);

        return response.data.data;
    } catch (error) {
        console.error('Error en buildDataWord:', error);
        return []; // Devuelve un array vacío en caso de error
    }
}