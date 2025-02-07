import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getNewWordId } from '../features/words/hooks/wordLocalStorage';
import { readById } from '../features/words/services/wordService';
import WordPronunciation from '../features/words/WordPronunciation';
import WordDetails from '../features/words/WordDetails';

const SectionPractice = () => {
    const history = useHistory();
    const { id } = useParams();
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
        // Llamada a la API para obtener los detalles de la palabra
        const fetchWordDetails = async () => {
            try {
                // Simulación de llamada a la API para obtener detalles de la palabra
                const data = await readById(id); // Asegúrate de usar la URL correcta

                // Convertir examples de string a array
                const array = JSON.parse(data.examples);

                // Actualizar estado con la respuesta de la API
                setWord({
                    word: data.english || "Word not available",
                    translation: data.spanish || "Translation not available",
                    pronunciation: `(${data.pronunciation})` || "Pronunciation not available",
                    category: data.category || "Category not available",
                    concept: data.concept || "Concept not available",
                    examples: array || [],
                    audioUrl: data.audioUrl || "",
                });
            } catch (error) {
                console.error("Error al obtener los detalles de la palabra:", error);
            }
        };

        fetchWordDetails();
    }, [id]); // Se ejecuta cada vez que cambia el id

    const handleNewWord = async () => {
        // Se debe obtener un nuevo id de palabra
        const newWordId = await getNewWordId();

        // Se debe redirigir a la vista de datalles con una palabra aleatoria
        history.push(`/word/${newWordId.id}`);
    };

    return (
        <div className="container vh-100 d-flex flex-column justify-content-center">

            <WordPronunciation wordObject={word} />
            
            <WordDetails word={word} />

            <div className="d-flex justify-content-between pb-2 pt-4" style={{
                marginTop: 'auto'
            }}>
                <button onClick={() => (window.location.href = "/vocabulary")} className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-return-left"></i>
                </button>
                <button className="btn btn-outline-info" onClick={() => handleNewWord()}>
                    <i className="bi bi-collection"></i>
                </button>
            </div>
        </div>
    );
};

export default SectionPractice;