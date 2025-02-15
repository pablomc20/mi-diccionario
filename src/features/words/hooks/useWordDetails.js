import { useState, useEffect } from "react";
import { readById } from "../services/wordService";

const useWordDetails = (id) => {
    const [word, setWord] = useState({
        word: "",
        translation: "",
        pronunciation: "",
        part_of_speech  : "",
        definition: "",
        examples: [],
        synonyms: [],
    });

    useEffect(() => {
        const fetchWordDetails = async () => {
            try {
                const data = await readById(id);

                const arrayExamples = data.examples || "[]"; // Manejo de valores nulos
                const arraySynonyms = data.synonyms || "[]"; // Manejo de valores nulos

                let wordJson = {
                    word: data.word || "Word not available",
                    translation: data.translation || "Translation not available",
                    pronunciation: data.pronunciation ? `(${data.pronunciation})` : "Pronunciation not available",
                    part_of_speech: data.part_of_speech || "Category not available",
                    definition: data.definition || "Concept not available",
                    examples: arrayExamples,
                    synonyms: arraySynonyms,
                };

                setWord(wordJson);
            } catch (error) {
                console.error("Error al obtener los detalles de la palabra:", error);
            }
        };

        fetchWordDetails();
    }, [id]);

    return word;
};

export default useWordDetails;
