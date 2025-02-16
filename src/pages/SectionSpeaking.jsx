import Swal from 'sweetalert2'; // Importar sweetalert2
import SpeechRecognitionContainer from "../shared/components/SpeechRecognitionContainer";
import { useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from '../features/words/hooks/useLocalStorage';
import useIsMobile from '../features/hooks/useIsMobile';
import ConfirmDialog from '../shared/components/ConfirmDialog';
import PaginationButtons from '../shared/components/PaginationButtons';
import { Button, Container } from 'react-bootstrap';

const SectionSpeaking = () => {
    const location = useLocation();
    const history = useHistory();
    const isMobile = useIsMobile('768');

    // Extraer y decodificar el parámetro de la URL
    const params = new URLSearchParams(location.search);
    const nameWord = params.get("nameWord");

    const [sentencesStorage, , ] = useLocalStorage('sentences', []);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0); // Para almacenar el puntaje
    const [porcentaje, setPorcentaje] = useState(0); // Para almacenar el puntaje

    // Función para manejar el cambio de similitud y actualizar el score
    const handleSimilarityChange = (similarity) => {
        setPorcentaje(0); // Sumar el porcentaje de similitud al score total
        setPorcentaje(prevScore => prevScore + similarity); // Guara el porcentaje de similitud al score total
    };

    const handleSumScore = () => {
        setScore(prevScore => prevScore + porcentaje); // Sumar el porcentaje de similitud al score total
    };

    const handleEvaluateResults = () => {
        let suma = score + porcentaje;
        let result = Math.round(((suma) / sentencesStorage.length) * 10) / 100;

        if (currentIndex === sentencesStorage.length - 1) {
            Swal.fire({
                title: `Tu calificación fue: ${result}`,
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "#fff url(/static/img/catjam-cat.png)",
                backgroundSize: "400px",
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("/static/img/catjam-cat.gif")
                  left top
                  no-repeat
                `
            });
            setCurrentIndex(0);
            setScore(0);
        };
    }

    // Función para navegar entre los elementos
    const nextSlide = () => {
        if (currentIndex < sentencesStorage.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handleCencelPractice = async () => {
        await ConfirmDialog({
            title: "¿Regresar a la página anterior?",
            text: "Se perderá el progreso actual.",
            onConfirm: () => {
                history.goBack()
            },
            confirmButtonText: "Si, volver"
        });
    };

    return (
        <Container className="vh-100 d-flex flex-column justify-content-center p-4">
            <h3 className={`text-center mb-4`}>{nameWord}</h3>

            {/* Contenedor de las frases */}
            {sentencesStorage.slice(currentIndex, currentIndex + 1).map((item, index) => (
                <SpeechRecognitionContainer
                    key={index}
                    originalPhrase={item}
                    onSimilarityChange={handleSimilarityChange} // Pasamos la función al hijo
                />
            ))}

            {/* Paginación con botones */}
            <PaginationButtons
                sentencesCount={sentencesStorage.length}
                currentIndex={currentIndex}
                onChangeIndex={setCurrentIndex}
            />

            {/* Botones de "Anterior" y "Siguiente" debajo del contenedor de la frase */}
            <section className="d-flex justify-content-between w-100 mt-4">
                <Button
                    className='p-3'
                    variant="outline-secondary"
                    onClick={() => handleCencelPractice()}
                >
                    <i className="bi bi-arrow-return-left"></i> {isMobile ? '' : 'Cancel'}
                </Button>

                {currentIndex === sentencesStorage.length - 1 && porcentaje !== 0 && (
                    <Button
                        className={'mp-3'}
                        variant='success'
                        onClick={() => {
                            handleEvaluateResults();
                        }}
                    >
                        {"Evaluar"}
                    </Button>
                )}

                <Button
                    className="p-3"
                    variant="outline-primary"
                    onClick={() => {
                        nextSlide();
                        handleSumScore();
                    }}
                    disabled={currentIndex >= sentencesStorage.length - 1 || porcentaje === 0}
                >
                    {isMobile ? '' : 'Next'} <i className="bi bi-chevron-right"></i>
                </Button>

            </section>

        </Container>
    );
};

export default SectionSpeaking;
