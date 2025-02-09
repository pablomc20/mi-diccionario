import Swal from 'sweetalert2'; // Importar sweetalert2
import React from 'react';
import { useHistory } from "react-router-dom";
import ConfirmDialog from "../../shared/components/ConfirmDialog";

const WordList = ({ words, onDeleteWord }) => {
    const history = useHistory(); // Se llama dentro del componente

    // Función para ver detalles (puedes implementarla según tus necesidades)
    const handleViewDetails = (id) => {
        history.push(`/word/${id}`);
    };

    const handleDelete = async (id) => {
        await ConfirmDialog({
            title: "¿Eliminar palabra?",
            text: "Esta acción no se puede deshacer.",
            onConfirm: () => {
                Swal.fire('Eliminada!', 'La palabra ha sido eliminada.', 'success'); // Mostrar mensaje de éxito
                onDeleteWord(id);
            },
        });
    };

    // Renderizar la lista de palabras
    return (
        <div id="wordList">
            {words.length === 0 ? (
                <p>No hay palabras de.</p>
            ) : (
                words.map((word) => (
                    <div key={word.id} className="card mb-3" id={word.id}>
                        <div className="card-body">
                            <h5 className="card-title">
                                {word.english} → {word.spanish}
                            </h5>
                            <h6 className="card-subtitle mb-2 text-muted text-capitalize">
                                {word.category}
                            </h6>
                            <p className="card-text">{word.concept}</p>
                            <div className="d-flex justify-content-end">
                                <button
                                    className="btn text-primary border border-primary me-2"
                                    onClick={() => handleViewDetails(word.id)}
                                >
                                    <i className="bi bi-eye-fill"></i>
                                </button>
                                <button
                                    className="btn text-danger border border-danger"
                                    onClick={() => handleDelete(word.id)}
                                >
                                    <i className="bi bi-trash-fill"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default WordList;