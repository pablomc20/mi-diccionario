import React, { useState } from 'react';
import { Form, InputGroup, Button } from "react-bootstrap";
import { buildDataWord } from './services/wordOpnAIService';

const CreateWordForm = ({ onAddWord }) => {
  const [word, setWord] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generar ejemplos con Gemini
    const response = await generateDataWord(word);

    const wordData = {
      english: word,
      spanish: response.translation,
      concept: response.concept,
      category: response.category,
      examples: response.examples,
      pronunciation: response.pronunciation,
      synonyms: response.synonyms
    };

    await onAddWord(wordData);
    setWord("");

  };

  const generateDataWord = async (word) => {
    return await buildDataWord(word);
  }

  return (
    <Form id="wordForm" className="mb-4" onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          type="text"
          id="englishWord"
          placeholder="Agregar palabra en inglés"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          required
        />
        <Button type="submit" variant="primary">Guardar</Button>
      </InputGroup>
    </Form>
  );

};

export default CreateWordForm;