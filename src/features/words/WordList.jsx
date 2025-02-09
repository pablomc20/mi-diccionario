import Swal from 'sweetalert2'; // Importar sweetalert2
import React from 'react';
import { useHistory } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";
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
        <Container id="wordList" className='p-0'>
            {words.length === 0 ? (
                <p>No hay palabras.</p>
            ) : (
                words.map((word) => (
                    <Card key={word.id} className="mb-3" id={word.id}>
                        <Card.Body>
                            <Card.Title>
                                {word.english} → {word.spanish}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted text-capitalize">
                                {word.category}
                            </Card.Subtitle>
                            <Card.Text>{word.concept}</Card.Text>
                            <div className="d-flex justify-content-end">
                                <Button
                                    variant="outline-primary"
                                    className="me-2"
                                    onClick={() => handleViewDetails(word.id)}
                                >
                                    <i className="bi bi-eye-fill"></i>
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => handleDelete(word.id)}
                                >
                                    <i className="bi bi-trash-fill"></i>
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))
            )}
        </Container>
    );
};

export default WordList;