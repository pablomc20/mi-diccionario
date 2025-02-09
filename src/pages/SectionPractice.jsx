import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
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

    return (
        <div className="container vh-100 d-flex flex-column justify-content-center">

            <WordPronunciation wordObject={word} />
            
            <WordDetails word={word} />

            <div className="d-flex justify-content-between pb-2 pt-4" style={{
                marginTop: 'auto'
            }}>
                <button onClick={() => (window.location.href = "/vocabulary")} className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-return-left"></i>
                </button>
                <button className="btn btn-outline-info" onClick={() => handleNewWord()}>
                    <i className="bi bi-collection"></i>
                </button>
            </div>
        </div>
    );
};

export default SectionPractice;