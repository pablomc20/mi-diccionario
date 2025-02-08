import { useState } from "react";

const TextReaderInput = ({ text, speechRate, visible, sentence }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const speakText = async () => {
        if (!text) return;

        try {
            if (text.trim() !== "") {
                // Usar ResponsiveVoice para convertir texto en voz
                window.responsiveVoice.setDefaultRate(speechRate);
                window.responsiveVoice.speak(text, "UK English Male", {
                    onstart: () => setIsSpeaking(true),
                    onend: () => setIsSpeaking(false)
                }
                );
            } else {
                alert("Por favor, ingresa un texto.");
                setIsSpeaking(false);
            }

        } catch (error) {
            console.error("Error al convertir texto a voz:", error);
            setIsSpeaking(false);
        }
    };

    return (
        <div className="mb-3">
            <span
                className="form-control"
                style={{
                    border: isSpeaking ? "2px solid green" : "2px solid transparent",
                    transition: "border 0.3s ease-in-out" // Agregar una animación suave
                }}
            >
                {text}
                <i
                    style={{ cursor: 'pointer' }}
                    onClick={speakText}
                >
                    {isSpeaking ? "  🔊" : "  🔈"}
                </i>
            </span>

            {/* Visualizar cuando se hace clic desde el padre */}
            <section style={{
                display: visible ? "block" : "none",
                paddingLeft: "1rem"
            }}
            >
                <p className="text-info">{sentence}</p>
            </section>
        </div>
    );
};

export default TextReaderInput;