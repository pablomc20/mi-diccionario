import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readById, updateWord } from './services/wordService'; // Importar funciones del DAO
import '../../styles/index.css'

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
                    examples: formData.examples ? JSON.parse(formData.examples).join("\n") : ''
                });
            }
        };
        loadWord();
    }, []);

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

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedWord = {
            ...formData,
            examples: formData.examples.split("\n"), // Convertir string en array antes de enviar
        };

        const success = await updateWord(id, updatedWord); // Actualizar la palabra
        if (success) {
            history.goBack(); // Redirigir a la lista de palabras después de guardar
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Editar Palabra</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="english" className="form-label">Palabra en inglés</label>
                    <input
                        type="text"
                        id="english"
                        name="english"
                        value={formData.english}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="spanish" className="form-label">Traducción al español</label>
                    <input
                        type="text"
                        id="spanish"
                        name="spanish"
                        value={formData.spanish}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="concept" className="form-label">Concepto</label>
                    <textarea
                        id="concept"
                        name="concept"
                        value={formData.concept}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Categoría</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="examples" className="form-label">Ejemplos (separados por comas)</label>
                    <textarea
                        rows={3}
                        className="form-control"
                        name="examples"
                        value={formData.examples}
                        onChange={handleExamplesChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pronunciation" className="form-label">Pronunciación</label>
                    <input
                        type="text"
                        id="pronunciation"
                        name="pronunciation"
                        value={formData.pronunciation}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="audioUrl" className="form-label">URL del audio</label>
                    <input
                        type="text"
                        id="audioUrl"
                        name="audioUrl"
                        value={formData.audioUrl}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3 d-flex justify-content-center gap-3">
                    <button className="btn btn-outline-secondary" onClick={() => history.push(`/word/${id}`)}>
                        <i className="bi bi-arrow-return-left"></i>
                    </button>
                    <button type="submit" className="btn btn-outline-primary">
                        <i className="bi bi-floppy-fill"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditWord;