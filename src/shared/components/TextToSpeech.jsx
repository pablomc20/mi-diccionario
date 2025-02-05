import React, { useState } from "react";

const TextToSpeech = () => {
    const [text, setText] = useState("");
    const [selectedVoice, setSelectedVoice] = useState("UK English Male"); // Valor por defecto

    const handleSpeak = () => {
        if (text.trim() !== "") {
            // Usar ResponsiveVoice para convertir texto en voz
            window.responsiveVoice.speak(text, selectedVoice);
        } else {
            alert("Por favor, ingresa un texto.");
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Texto a Voz con ResponsiveVoice.js</h1>
            {/* Select para elegir la voz */}
            <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
            >
                <option value="UK English Male">Inglés (Masculino)</option>
                <option value="UK English Female">Inglés (Femenino)</option>
                <option value="Spanish Latin American Male">Español (Masculino)</option>
                <option value="Spanish Latin American Female">Español (Femenino)</option>
            </select>
            
            <textarea
                rows="4"
                cols="50"
                placeholder="Escribe una oración aquí..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
            />
            <button
                onClick={handleSpeak}
                style={{

                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Reproducir
            </button>
        </div>
    );
};

export default TextToSpeech;