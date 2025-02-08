import { useState, useEffect } from "react";
import { readById } from "../services/wordService";

const useWordDetails = (id) => {
    const [word, setWord] = useState({
        word: "",
        translation: "",
        pronunciation: "",
        category: "",
        concept: "",
        examples: [],
        audioUrl: "",
    });

    useEffect(() => {
        const fetchWordDetails = async () => {
            try {
                const data = await readById(id);
                const array = data.examples || "[]"; // Manejo de valores nulos
                console.log(data);

                setWord({
                    word: data.english || "Word not available",
                    translation: data.spanish || "Translation not available",
                    pronunciation: data.pronunciation ? `(${data.pronunciation})` : "Pronunciation not available",
                    category: data.category || "Category not available",
                    concept: data.concept || "Concept not available",
                    examples: array,
                    audioUrl: data.audioUrl || "",
                });
            } catch (error) {
                console.error("Error al obtener los detalles de la palabra:", error);
            }
        };

        fetchWordDetails();
    }, [id]);

    return word;
};

export default useWordDetails;
