
export const createWord = async (word) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/words`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(word)
        });
        if (!response.ok) {
            throw new Error('Error al agregar la palabra');
        }
        const data = await response.json();
        return data; // Devuelve la palabra agregada
    } catch (error) {
        console.error('Error en addWord:', error);
        return null; // Indica que hubo un error
    }
};

export const readWords = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/words`);

        return await response.json();
    } catch (error) {
        console.error('Error en fetchWords:', error);
        return []; // Devuelve un array vacío en caso de error
    }
};

// Actualizar una palabra por su ID
export const updateWord = async (id, word) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/words/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(word)
        });
        if (!response.ok) {
            throw new Error('Error al actualizar la palabra', word);
        }
        const data = await response.json();
        return data; // Devuelve la palabra actualizada
    } catch (error) {
        console.error('Error en updateWord:', error);
        return null; // Indica que hubo un error
    }
}

export const deleteWord = async (id) => {
    try {
        return await fetch(`${process.env.REACT_APP_API_URL}/api/words/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error en deleteWord:', error);
        return false; // Indica que hubo un error
    }
};

// Obtener detalles de una palabra por su ID
export const readById = async (id) => {
    try {
        let url = `${process.env.REACT_APP_API_URL}/api/words/${id}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error al obtener los detalles de la palabra' + url);
        }
        const data = await response.json();
        return data; // Devuelve los detalles de la palabra
    } catch (error) {
        console.error('Error en readById:', error);
        return null; // Indica que hubo un error
    }
};

export const readWordsGrupedByIds = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/words/grouped/id`);

        return await response.json();
    } catch (error) {
        console.error('Error en fetchWords:', error);
        return []; // Devuelve un array vacío en caso de error
    }
};
