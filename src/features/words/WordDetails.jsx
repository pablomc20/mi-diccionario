import Swal from 'sweetalert2'; // Importar sweetalert2
import 'react-toastify/dist/ReactToastify.css'; // Importar los estilos
import useLocalStorage from './hooks/useLocalStorage';
import TextReaderInput from '../../shared/components/TextReaderInput';
import { deleteWord } from './services/wordService';
import ConfirmDialog from "../../shared/components/ConfirmDialog";
// import '../../styles/index.css'

import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { retrieveSentencesTraduction } from './services/wordOpnAIService';
import { reloadFavoritesStorge, retrieveFavoritesStorage } from './hooks/favoritesStorage';

const WordDetails = ({ word }) => {
    const [sentenceTraductions, setSentences] = useState([]);
    const [speechRate, setSpeechRate] = useState(1.0); // Valor inicial
    const [visible, setVisible] = useState(false);
    const [favorites, setFavorites] = useState([]); // Lista de favoritos
    const [sentencesPractice, setSentencesPractice, removeSentencesPractice] = useLocalStorage('sentences', [])
    const history = useHistory();
    const { id } = useParams();

    const editWord = (id) => {
        history.push(`/edit/${id}`);
    };

    useEffect(() => {
        const examples = word.examples;

        const fetchInitialTraductions = async () => {

            const sentencesTransalated = await retrieveSentencesTraduction(examples);
            setSentences(sentencesTransalated.translatedSentences)
        }

        fetchInitialTraductions();

    }, [word.examples]);

    // Cargar los favoritos desde localStorage
    useEffect(() => {
        setFavorites(retrieveFavoritesStorage());
    }, []);

    const handleDeleteWord = async (id) => {

        await ConfirmDialog({
            title: "¿Eliminar palabra?",
            text: "Esta acción no se puede deshacer.",
            onConfirm: async () => {
                Swal.fire('Eliminada!', 'La palabra ha sido eliminada.', 'success'); // Mostrar mensaje de éxito
                const response = await deleteWord(id);

                if (response.ok) {
                    localStorage.removeItem("words");
                    history.push('/vocabulary'); // Redirigir a la lista de palabras

                    Swal.fire('Eliminada!', 'La palabra ha sido eliminada.', 'success'); // Mostrar mensaje de éxito
                } else {
                    Swal.fire('Error', 'Hubo un problema al eliminar la palabra. Intenta nuevamente.', 'error');
                }
            },
        });

    };

    // Función para agregar o quitar de favoritos
    const toggleFavorite = (wordId) => {

        let updatedFavorites = reloadFavoritesStorge(wordId);

        // Actualizamos el estado y sincronizamos con localStorage
        setFavorites(updatedFavorites);
    };

    const toggleSpeechRate = () => {
        setSpeechRate(prevRate => (prevRate === 1.0 ? 0.6 : 1.0)); // Alternar entre 1.0 y 0.5
    };

    const handleShowTraduction = () => {
        setVisible(!visible);
    };

    const handleRedirectPractice = () => {
        const newSentences = [];

        word.examples.forEach(newSentence => {
            newSentences.push(newSentence); // Agregar nuevas sentencias al arreglo
        });

        setSentencesPractice(newSentences); // Actualizar el estado una sola vez

        window.location.href = `/recognition?nameWord=${word.word}`;
    }

    // Verificar si la palabra está en favoritos
    const isFavorite = favorites.includes(id);

    return (

        <div className="card shadow-lg flex-grow-1">
            <div className="card-body d-flex flex-column justify-content-between" style={{ height: '100%' }}>
                <div>
                    <p>{word.concept}</p>
                    <span className="badge bg-secondary">{word.category}</span>
                </div>
                <ul className="mt-4">
                    {word.examples.map((example, index) => (
                        <li key={index}>
                            <TextReaderInput text={example} speechRate={speechRate} visible={visible} sentence={sentenceTraductions[index]} />
                        </li>
                    ))}
                </ul>
                <div className="button-group d-flex justify-content-between mt-4">
                    <button
                        className={`btn bg-none col-2 ${visible ? "btn-info" : "btn-outline-info "}`}
                        onClick={handleShowTraduction}
                    >
                        <i className="bi bi-translate"></i>
                    </button>
                    <button
                        className={`btn ${speechRate === 1.0 ? "btn-outline-warning" : "btn-warning"} bg-none col-2`}
                        onClick={toggleSpeechRate}
                    >
                        <i className="bi-alarm"></i>
                    </button>
                    <button
                        className="btn btn-primary bg-none col-3"
                        onClick={() => {
                            handleRedirectPractice();
                        }}
                    >
                        <i className="bi bi-list-ol"></i>
                    </button>
                    <button className="btn btn-outline-success bg-none col-2">
                        <i className="bi bi-alphabet"></i>
                    </button>
                    <button
                        className={`btn bg-none col-2 ${isFavorite ? "btn-danger" : "btn-outline-danger"}`}
                        onClick={() => toggleFavorite(id)}
                    >
                        <i className="bi bi-heart-fill"></i>
                    </button>

                </div>

                {/* SI esta autorizado mostrar botones */}
                {false &&
                    <div className='d-flex justify-content-end '>
                        <button onClick={() => editWord(id)} className="btn btn-outline-primary col-2">
                            <i className="bi bi-gear-fill"></i>
                        </button>
                        <button onClick={() => handleDeleteWord(id)} className="btn btn-outline-danger col-2">
                            <i className="bi bi-trash-fill"></i>
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}

export default WordDetails;