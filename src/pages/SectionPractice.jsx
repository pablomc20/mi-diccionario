import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { getNewWordId } from '../features/words/hooks/wordLocalStorage';
import WordPronunciation from '../features/words/WordPronunciation';
import WordDetails from '../features/words/WordDetails';
import useWordDetails from '../features/words/hooks/useWordDetails';

const SectionPractice = () => {
    const history = useHistory();
    const { id } = useParams();
    const word = useWordDetails(id);

    const handleNewWord = async () => {
        const newWordId = await getNewWordId();
        history.push(`/word/${newWordId.id}`);
    };

    if (!word || !word.word) {
        // Puedes mostrar un indicador de carga aquí
        return <div>Cargando...</div>;
    }
    return (
        <Container className="vh-100 d-flex flex-column justify-content-center p-0">

            <WordPronunciation wordObject={word} />

            <WordDetails word={word} />

            <section className="d-flex justify-content-between pb-2 pt-4" style={{
                marginTop: 'auto'
            }}>
                <Button onClick={() => (window.location.href = "/vocabulary")} variant="outline-secondary">
                    <i className="bi bi-arrow-return-left"></i>
                </Button>
                <Button variant="outline-info" onClick={() => handleNewWord()}>
                    <i className="bi bi-collection"></i>
                </Button>
            </section>
        </Container>
    );
};

export default SectionPractice;