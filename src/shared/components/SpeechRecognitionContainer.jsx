import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
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
        <Card className="mb-3" style={{ minHeight: "50vh" }}>
            <Card.Body>
                <div>
                    <Card.Title>Original Phrase:</Card.Title>
                    <TextReaderInput key={1} text={originalPhrase} speechRate={1.0} visible={undefined} sentence={""} />
                </div>

                <div className="mb-3">
                    <Card.Title>Recognized Text:</Card.Title>
                    <Card.Text className="text-muted">{recognizedText}</Card.Text>
                </div>

                <div className="mb-3">
                    <Card.Title>Accuracy:</Card.Title>
                    <Card.Text className={currencyClass}>{similarity}%</Card.Text>
                </div>

                {highlightedText && (
                    <div className="mb-3">
                        <Card.Title>Corrections:</Card.Title>
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
            </Card.Body>
        </Card>
    );
};

export default SpeechRecognitionContainer;
