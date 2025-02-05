import React, { useState, useEffect } from 'react';
import CreateWordForm from '../features/words/CreateWordForm';
import { readWords, createWord, deleteWord } from '../features/words/services/wordService';
import WordList from '../features/words/WordList';
import "../styles/index.css";

const Vocabulary = () => {
  const [words, setWords] = useState([]);

  // Obtener las palabras al cargar el componente
  useEffect(() => {
    const fetchInitialWords = async () => {
      const wordsData = await readWords(); // Obtener las palabras
      setWords(wordsData); // Actualizar el estado
    };

    fetchInitialWords(); // Llamar a la función
  }, []);

  const addWord = async (newWord) => {
    const wordGenerated = await createWord(newWord); // Agregar la nueva palabra
    newWord.id = wordGenerated.id; // Asignar el id generado a la palabra

    setWords(prev => [...prev, newWord]);

  };

  const handleDeleteWord = async (id) => {
    localStorage.removeItem("words");
    await deleteWord(id);
    setWords(prevWords => prevWords.filter(word => word.id !== id));
  };

  return (
    <div className="container vh-100 bg-info">
      <h1 className="text-center mt-2">Vocabulario</h1>
      <CreateWordForm onAddWord={addWord} />
      <WordList words={words} onDeleteWord={handleDeleteWord} />
    </div>
  );
};

export default Vocabulary;