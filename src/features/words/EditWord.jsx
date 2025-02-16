import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Form, Button } from "react-bootstrap";
import { readById, updateWord } from './services/wordService'; // Importar funciones del DAO
// import '../../styles/index.css'

const EditWord = () => {
    const { id } = useParams(); // Obtener el ID de la palabra desde la URL
    const history = useHistory();
    const [formData, setFormData] = useState({
        english: '',
        spanish: '',
        concept: '',
        category: '',
        examples: '',
        pronunciation: '',
        audioUrl: '',
    });

    // Obtener los detalles de la palabra al cargar el componente
    useEffect(() => {
        const loadWord = async () => {
            const formData = await readById(id); // Obtener detalles de la palabra

            if (formData) {
                setFormData({
                    ...formData,
                    examples: formData.examples ? formData.examples.join("\n") : ''
                });
            }
        };
        loadWord();
    }, [id]);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevWord) => ({
            ...prevWord,
            [name]: value,
        }));
    };

    // Manejar cambios en examples (campo textarea)
    const handleExamplesChange = (e) => {
        setFormData({
            ...formData,
            examples: e.target.value, // Mantener como string hasta que se envíe
        });
    };

    // Manejar cambios en examples (campo textarea)
    const handleSynonymsChange = (e) => {
        setFormData({
            ...formData,
            synonyms: e.target.value, // Mantener como string hasta que se envíe
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedWord = {
            ...formData,
            examples: formData.examples.split("\n"), // Convertir string en array antes de enviar
            synonyms: formData.synonyms.split(","), // Convertir string en array antes de enviar
        };

        const success = await updateWord(id, updatedWord); // Actualizar la palabra
        if (success) {
            history.goBack(); // Redirigir a la lista de palabras después de guardar
        }
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center">Editar Palabra</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="english">
                    <Form.Label>Palabra en inglés</Form.Label>
                    <Form.Control
                        type="text"
                        name="english"
                        value={formData.english}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="spanish">
                    <Form.Label>Traducción al español</Form.Label>
                    <Form.Control
                        type="text"
                        name="spanish"
                        value={formData.spanish}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="concept">
                    <Form.Label>Concepto</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="concept"
                        value={formData.concept}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="examples">
                    <Form.Label>Ejemplos (separados por comas)</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="examples"
                        value={formData.examples}
                        onChange={handleExamplesChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="pronunciation">
                    <Form.Label>Pronunciación</Form.Label>
                    <Form.Control
                        type="text"
                        name="pronunciation"
                        value={formData.pronunciation}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="audioUrl">
                    <Form.Label>Sinonimos</Form.Label>
                    <Form.Control
                        type="text"
                        name="audioUrl"
                        value={formData.synonyms}
                        onChange={handleSynonymsChange}
                        required
                    />
                </Form.Group>

                <div className="d-flex justify-content-center gap-3">
                    <Button variant="outline-secondary" onClick={() => history.push(`/word/${id}`)}>
                        <i className="bi bi-arrow-return-left"></i>
                    </Button>
                    <Button type="submit" variant="outline-primary">
                        <i className="bi bi-floppy-fill"></i>
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default EditWord;