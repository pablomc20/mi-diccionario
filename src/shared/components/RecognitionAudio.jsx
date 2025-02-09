import React, { useState, useRef } from "react";
import { diffWords } from "diff";
import { calculateAcurracyTranscript, cleanText } from "../utils/wordRecognitionUtil";
import { Button } from "react-bootstrap";

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

    const stopProcesses = () => {
        // Detener SpeechRecognition si existe y limpiar la referencia
        if (recognitionRef.current) {
            try {
                recognitionRef.current.onresult = null;
                recognitionRef.current.onend = null;
                recognitionRef.current.onerror = null;
                recognitionRef.current.stop();
            } catch (e) {
                console.error("Error al detener el reconocimiento:", e);
            }
            recognitionRef.current = null;
        }
        // Detener MediaRecorder si existe y aún activo
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }
        setIsListening(false);
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

        // Crear una nueva instancia de SpeechRecognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;

        // Configuramos para transcripción continua e interina
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        // Reiniciamos el texto reconocido
        setRecognizedText("");

        recognition.start();
        startRecording();

        recognition.onresult = (event) => {
            let finalTranscript = "";
            let interimTranscript = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + " ";
                } else {
                    interimTranscript += transcript;
                }
            }

            // Actualiza la transcripción combinando los resultados finales e interinos
            setRecognizedText(finalTranscript + interimTranscript);

            // Calcula la precisión solo si hay resultados finales
            if (finalTranscript.trim().length > 0) {
                const accuracy = calculateAcurracyTranscript(finalTranscript, originalPhrase);
                setSimilarity(accuracy);
                setHighlightedText(diffWords(cleanText(originalPhrase), cleanText(finalTranscript)));
                stopProcesses();
            }
        };

        recognition.onend = () => {
            setTimeout(() => setIsListening(false), 500);
        };

        recognition.onerror = (event) => {
            stopProcesses();
        };
    };

    return (
        <Button data-title="Iniciar grabación"
            className={'p-3 btn-tooltip'}
            variant={`${isListening ? "danger" : "light"}`}
            onClick={startRecognition}
        >
            {isListening ? <i className="bi bi-stop-fill"></i> : <i className="bi bi-mic-fill"></i>}
        </Button>
    );
};

export default RecognitionAudio;