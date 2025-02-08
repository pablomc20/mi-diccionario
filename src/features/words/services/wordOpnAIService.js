import { diffWords } from "diff";

export const retrieveSentencesTraduction = async (sentences) => {
    try {

        const response = await fetch(`${process.env.REACT_APP_API_URL}/openai/translate`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sentences })
        });

        return await response.json();
    } catch (error) {
        console.error('Error en fetchWords:', error);
        return []; // Devuelve un array vacío en caso de error
    }
};

export const calculateAcurracyTranscript = (rawText, originalPhrase) => {
    const recognizedClean = cleanText(rawText);
    const originalClean = cleanText(originalPhrase);

    const originalWords = originalClean.split(" ");
    const recognizedWords = recognizedClean.split(" ");

    let correctWords = 0;
    let totalWords = originalWords.length;

    for (let i = 0; i < totalWords; i++) {
        if (recognizedWords[i] === originalWords[i]) {
            correctWords++;
        }
    }

    return Math.round((correctWords / totalWords) * 100);

}

export const cleanText = (text) => {
    const contractions = {
        "he's": "he is",
        "she's": "she is",
        "it's": "it is",
        "they're": "they are",
        "I'm": "I am",
        "you're": "you are",
        "we're": "we are",
        // Agrega más contracciones si es necesario
    };

    // Reemplaza las contracciones por su forma completa
    Object.keys(contractions).forEach(contraction => {
        const regex = new RegExp(`\\b${contraction}\\b`, 'gi');  // Buscar palabra exacta
        text = text.replace(regex, contractions[contraction]);
    });

    return text.toLowerCase().replace(/[.,!?;:]/g, "").trim(); // Normaliza el texto
};