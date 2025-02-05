import React, { useState, useEffect, useRef } from "react";

const SpeechRecognitionView = ({ originalSentence }) => {
    const [isListening, setIsListening] = useState(false);
    const [spokenSentence, setSpokenSentence] = useState("");
    const [incorrectWords, setIncorrectWords] = useState([]);
    const recognitionRef = useRef(null); // Guardar la instancia de SpeechRecognition

    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) {
            console.error("Tu navegador no soporta SpeechRecognition");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-EN";

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0].transcript)
                .join("");
            setSpokenSentence(transcript);
            compareSentences(originalSentence, transcript);
        };

        recognition.onend = () => setIsListening(false);

        recognition.onerror = (event) => {
            console.error("Error en el reconocimiento de voz:", event.error);
            setIsListening(false);
        };

        recognitionRef.current = recognition; // Guardar la instancia en useRef
    }, [originalSentence]); // Se ejecuta solo cuando `originalSentence` cambia

    const compareSentences = (original, spoken) => {
        const originalWords = original.toLowerCase().split(" ");
        const spokenWords = spoken.toLowerCase().split(" ");

        const incorrect = originalWords.map((word, index) => ({
            word,
            isCorrect: spokenWords[index] === word,
        }));

        setIncorrectWords(incorrect);
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const startListening = () => {
        setSpokenSentence(""); // Limpiar el texto anterior
        if (recognitionRef.current) {
            setIsListening(true);
            recognitionRef.current.start();
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            setIsListening(false);
            recognitionRef.current.stop();
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Reconocimiento de Voz</h1>
            <div className="card p-4">
                <h6 className="text-secondary">Sentence:</h6>
                <p>{originalSentence}</p>

                <h6 className="text-secondary">Listening:</h6>
                <p>{spokenSentence}</p>

                <h6 className="text-secondary">Result:</h6>
                <p>
                    {incorrectWords.map(({ word, isCorrect }, index) => (
                        <span
                            key={index}
                            style={{
                                color: isCorrect ? "green" : "red",
                                fontWeight: isCorrect ? "normal" : "bold",
                            }}
                        >
                            {word}{" "}
                        </span>
                    ))}
                </p>

                <button
                    className={`btn ${isListening ? "btn-danger" : "btn-primary"}`}
                    onClick={toggleListening}
                    disabled={isListening}
                >
                    {isListening ? "Detener" : "Comenzar"} Reconocimiento
                </button>
            </div>
        </div>
    );
};

export default SpeechRecognitionView;
