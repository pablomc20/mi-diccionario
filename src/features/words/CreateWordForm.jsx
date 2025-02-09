import React, { useState } from 'react';
import { buildDataWord, retrievPronunciation } from './services/wordOpnAIService';

const CreateWordForm = ({ onAddWord }) => {
  const [word, setWord] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generar ejemplos con Gemini
    const response = await generateDataWord(word);

    const audio = await getPronunciation(word);
    const audioUrl = audio ? buildUrlAudio(audio.audio) : '';

    const wordData = {
      english: word,
      spanish: response.translation,
      concept: response.concept,
      category: response.category,
      examples: response.examples,
      pronunciation: audio.pronunciation,
      audioUrl: audioUrl
    };

    await onAddWord(wordData);
    setWord("");

  };

  const buildUrlAudio = (audio) => {
    if (!audio) {
      return '';
    }
    return `${audio.charAt(0)}/${audio}`;
  }

  const getPronunciation = async (word) => {
    return await retrievPronunciation(word);
  }

  const generateDataWord = async (word) => {
    return await buildDataWord(word);
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