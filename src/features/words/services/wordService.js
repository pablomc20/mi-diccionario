import apiJson from './apiJson'

export const createWord = async (word) => {
    try {
        const { data } = await apiJson.post("/api/words", word);
        return data; // Devuelve la palabra agregada
    } catch (error) {
        console.error("Error en createWord:", error.response?.data || error.message);
        return null;
    }
};

export const readWords = async () => {
    try {
        const { data } = await apiJson.get("/api/words");
        return data;
    } catch (error) {
        console.error("Error en readWords:", error.response?.data || error.message);
        return [];
    }
};

export const updateWord = async (id, word) => {
    try {
        const { data } = await apiJson.put(`/api/words/${id}`, word);
        return data; // Devuelve la palabra actualizada
    } catch (error) {
        console.error("Error en updateWord:", error.response?.data || error.message);
        return null;
    }
};

export const deleteWord = async (id) => {
    try {
        await apiJson.delete(`/api/words/${id}`);
        return true; // Indica éxito
    } catch (error) {
        console.error("Error en deleteWord:", error.response?.data || error.message);
        return false;
    }
};

export const readById = async (id) => {
    try {
        const { data } = await apiJson.get(`/api/words/${id}`);
        return data;
    } catch (error) {
        console.error("Error en readById:", error.response?.data || error.message);
        return null;
    }
};

export const readWordsGroupedByIds = async () => {
    try {
        const { data } = await apiJson.get("/api/words/grouped/id");
        return data;
    } catch (error) {
        console.error("Error en readWordsGroupedByIds:", error.response?.data || error.message);
        return [];
    }
};
