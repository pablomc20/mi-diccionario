import React, { useState } from 'react';

const CreateWordForm = ({ onAddWord }) => {
  const API_HOST = "http://192.168.0.93:3001"
  const [word, setWord] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generar ejemplos con Gemini
    const response = await buildDataWord(word);

    const audio = await getPronunciation(word);
    const audioUrl = buildUrlAudio(audio.audio);

    const wordData = {
      english: word,
      spanish: response.translation,
      concept: response.concept,
      category: response.category,
      examples: response.examples,
      pronunciation: audio.pronunciation,
      audioUrl: audioUrl
    };

    await onAddWord(wordData); // Llama a la función para agregar la palabra
    setWord(""); // Limpia el input después de enviar

  };

  const buildUrlAudio = (audio) => {
    if (!audio) {
      return '';
    }
    return `${audio.charAt(0)}/${audio}`;
  }

  const getFirstWord = (text) => {
    const words = text.split(' ');
    return words[0];
  }
  const getPronunciation = async (word) => {
    const response = await fetch(`${API_HOST}/openai/pronunciations/${getFirstWord(word)}`);
    const data = await response.json();

    if (data.error) {
      console.error(data.error);
    } else {
      return data[0];
    }
  }

  const buildDataWord = async (word) => {
    try {
      const response = await fetch(`${API_HOST}/openai/vocabulary/${word}`);
      return await response.json();
    } catch (error) {
      console.error('Error en fetchWords:', error);
      return []; // Devuelve un array vacío en caso de error
    }
  }

  return (
    <form id="wordForm" className="mb-4" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          id="englishWord"
          className="form-control"
          placeholder="Agregar palabra en inglés"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Guardar</button>
      </div>
    </form>
  );

};

export default CreateWordForm;