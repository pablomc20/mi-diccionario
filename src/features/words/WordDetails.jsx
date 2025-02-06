import Swal from 'sweetalert2'; // Importar sweetalert2
import 'react-toastify/dist/ReactToastify.css'; // Importar los estilos
import TextReaderInput from '../../shared/components/TextReaderInput';
import { deleteWord } from './services/wordService';
import ConfirmDialog from "../../shared/components/ConfirmDialog";
import '../../styles/index.css'

import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { retrieveSentencesTraduction } from './services/wordOpnAIService';

const WordDetails = ({ word }) => {
    const [sentenceTraductions, setSentences] = useState([]);
    const [speechRate, setSpeechRate] = useState(1.0); // Valor inicial
    const [visible, setVisible] = useState(false);
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

    const toggleSpeechRate = () => {
        setSpeechRate(prevRate => (prevRate === 1.0 ? 0.6 : 1.0)); // Alternar entre 1.0 y 0.5
    };

    const handleClick = () => {
        setVisible(!visible);
    };

    return (

        <div className="card shadow-lg flex-grow-1">
            <div className="card-body d-flex flex-column justify-content-between" style={{ height: '100%' }}>
                <div>
                    <p>{word.concept}</p>
                    <span className="badge bg-secondary">{word.category}</span>
                </div>
                <ul className="mt-4">
                    {word.examples.map((example, index) => (
                        <TextReaderInput key={index} text={example} speechRate={speechRate} visible={visible} sentence={sentenceTraductions[index]} />
                    ))}
                </ul>
                <div className="button-group d-flex justify-content-between mt-4">
                    <button
                        className="btn btn-outline-info bg-none col-2"
                        onClick={handleClick}
                    >
                        <i className="bi bi-translate"></i>
                    </button>
                    <button
                        className={`btn ${speechRate === 1.0 ? "btn-outline-warning" : "btn-warning"} bg-none col-2`}
                        onClick={toggleSpeechRate}
                    >
                        <i className="bi-alarm"></i>
                    </button>
                    <button className="btn btn-primary bg-none col-3" onClick={() => window.location.href = '/pronunciations'}>
                        <i className="bi bi-list-ol"></i>
                    </button>
                    <button className="btn btn-outline-success bg-none col-2">
                        <i className="bi bi-alphabet"></i>
                    </button>
                    <button className="btn btn-outline-danger bg-none col-2">
                        <i className="bi bi-heart-fill"></i>
                    </button>
                </div>

                {/* SI esta autorizado mostrar botones */}
                {false &&
                    <div className='d-flex justify-content-end '>
                        <button onClick={() => editWord(id)} className="btn btn-outline-primary col-2">
                            <i className="bi bi-gear-fill"></i>
                        </button>
                        <button onClick={handleDeleteWord(id)} className="btn btn-outline-danger col-2">
                            <i className="bi bi-trash-fill"></i>
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}

export default WordDetails;