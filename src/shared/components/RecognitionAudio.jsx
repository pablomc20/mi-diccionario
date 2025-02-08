import React, { useState, useRef } from "react";
import { diffWords } from "diff";
import { calculateAcurracyTranscript, cleanText } from "../../features/words/services/wordOpnAIService";

const RecognitionAudio = ({ originalPhrase, setRecognizedText, setSimilarity, setHighlightedText, setAudioURL }) => {
    const [isListening, setIsListening] = useState(false);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const recognitionRef = useRef(null);

    const startRecording = () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("getUserMedia no es compatible en este navegador.");
        }
        
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioURL(audioUrl);
            };

            mediaRecorder.start();
        });
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop(); // Detiene SpeechRecognition primero
        }

        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }
    };

    const toggleListening = () => {
        setIsListening((prev) => !prev);
    };

    const startRecognition = () => {
        if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
            alert("Tu navegador no soporta reconocimiento de voz.");
            return;
        }

        toggleListening();

        recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        const recognition = recognitionRef.current;
        recognition.continuous = false;
        recognition.lang = "en-US";

        recognition.start();
        startRecording();

        recognition.onresult = (event) => {
            const rawText = event.results[0][0].transcript;
            const recognizedClean = cleanText(rawText);
            const originalClean = cleanText(originalPhrase);

            setRecognizedText(rawText);

            const accuracy = calculateAcurracyTranscript(rawText, originalPhrase);
            setSimilarity(accuracy);
            setHighlightedText(diffWords(originalClean, recognizedClean));
        };

        recognition.onend = () => {
            stopRecording(); // Llama a la nueva versión de stopRecording
            setTimeout(() => setIsListening(false), 500); // Pequeño delay para evitar el error "aborted"
        };

        recognition.onerror = (event) => {
            console.error("Error en el reconocimiento de voz:", event.error);
            setIsListening(false);
        };
    };

    return (
        <button data-title="Iniciar grabación"
            className={`btn ${isListening ? "btn-danger" : "btn-light"} p-3 btn-tooltip`}
            onClick={startRecognition}
        >
            {isListening ? <i className="bi bi-stop-fill"></i> : <i className="bi bi-mic-fill"></i>}
        </button>
    );
};

export default RecognitionAudio;