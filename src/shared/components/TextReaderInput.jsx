import { useState } from "react";
import { Form } from "react-bootstrap";

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
        <section className="mb-3">
            <Form.Control
                as="span"
                className="p-2"
                style={{
                    border: isSpeaking ? "2px solid green" : "2px solid transparent",
                    transition: "border 0.3s ease-in-out",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {text}
                <i onClick={speakText} style={{
                    cursor: "pointer"
                }}>
                    {isSpeaking ? " 🔊" : " 🔈"}
                </i>
            </Form.Control>

            {/* Visualizar cuando se hace clic desde el padre */}
            {visible && (
                <section className="mt-2 ps-3">
                    <p className="text-info">{sentence}</p>
                </section>
            )}
        </section>
    );
};

export default TextReaderInput;