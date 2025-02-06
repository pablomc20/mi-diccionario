export const retrieveSentencesTraduction = async (sentences) => {
    try {

        console.log(JSON.stringify({sentences}));
        

        const response = await fetch(`${process.env.REACT_APP_API_URL}/openai/translate`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({sentences})
        });

        return await response.json();
    } catch (error) {
        console.error('Error en fetchWords:', error);
        return []; // Devuelve un array vacío en caso de error
    }
};