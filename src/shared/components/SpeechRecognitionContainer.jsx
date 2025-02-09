import React, { useState, useEffect } from "react";
import RecognitionAudio from "./RecognitionAudio";
import ListeningAudio from "./ListeningAudio";
import TextReaderInput from "./TextReaderInput";

const SpeechRecognitionContainer = ({ originalPhrase, onSimilarityChange }) => {
    // Properties Recognition & Listening
    const [recognizedText, setRecognizedText] = useState("");
    const [highlightedText, setHighlightedText] = useState(null);
    const [currencyClass, setCurrenvyClass] = useState("text-white");

    const [audioURL, setAudioURL] = useState(null);

    const [similarity, setSimilarity] = useState(0);

    // Usamos useRef para almacenar el valor de similarity y evitar bucles innecesarios
    const prevSimilarityRef = React.useRef(similarity);

    useEffect(() => {
        let currenClass = getColorClass(similarity);

        setCurrenvyClass(currenClass);

        if (similarity !== prevSimilarityRef.current) {
            prevSimilarityRef.current = similarity;
            onSimilarityChange(similarity);
        }
    }, [similarity, onSimilarityChange]); // Ahora solo se ejecutará si similarity cambia

    useEffect(() => {
        setRecognizedText("");
        setHighlightedText("");
        setCurrenvyClass("");
        setSimilarity(0);
    }, [originalPhrase]);

    // Función para calcular el color del porcentaje
    const getColorClass = (score) => {
        if (score >= 90) return "text-success";  // Verde
        if (score >= 50) return "text-warning";  // Naranja
        return "text-danger";  // Rojo
    };

    return (
        <div className="card mb-3" style={{
            minHeight: "50vh"
        }}>
            <div className="px-3">
                <h5 className="card-title">Original Phrase:</h5>
                {/* <p className="card-text text-muted">{originalPhrase}</p> */}
                <TextReaderInput key={1} text={originalPhrase} speechRate={1.0} visible={undefined} sentence={""} />
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <h5 className="card-title">Recognized Text:</h5>
                    <p className="card-text text-muted">{recognizedText}</p>
                </div>
                <div className="mb-3">
                    <h5 className={`card-title`}>Accuracy:</h5>
                    <p className={`card-text ${currencyClass}`}>{similarity}%</p>
                </div>

                {highlightedText && (
                    <div className="mb-3">
                        <h5 className="card-title">Corrections:</h5>
                        <p>
                            {highlightedText.map((part, index) => (
                                <span
                                    key={index}
                                    style={{
                                        backgroundColor: part.added ? "green" : part.removed ? "brown" : "transparent",
                                        textDecoration: part.removed ? "line-through" : "none",
                                    }}
                                >
                                    {part.value}
                                </span>
                            ))}
                        </p>
                    </div>
                )}

                <div className="d-flex justify-content-center gap-4">
                    <RecognitionAudio
                        originalPhrase={originalPhrase}
                        setRecognizedText={setRecognizedText}
                        setSimilarity={setSimilarity}
                        setHighlightedText={setHighlightedText}
                        setAudioURL={setAudioURL}
                    />

                    <ListeningAudio audioURL={audioURL} />
                </div>


            </div>
        </div>
    );
};

export default SpeechRecognitionContainer;
