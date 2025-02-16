import { Container, Button } from "react-bootstrap";

const WordPronunciation = ({ wordObject }) => {

    const speakText = async (text) => {
        try {
            window.responsiveVoice.speak(text.split(' ')[0]);
        } catch (error) {
            console.error("Error al convertir texto a voz:", error);
        }
    };

    return (
        <Container className="text-center">
            <h1>{wordObject.word}</h1>
            <h4>{wordObject.translation}</h4>
            <h4 className="text-muted">{wordObject.pronunciation}</h4>
            <div className="pronunciation mb-1">
                <Button variant="success" onClick={() => speakText(wordObject.word)}>
                    <i className="bi bi-volume-up-fill"></i>
                </Button>
            </div>
        </Container>
    );
};

export default WordPronunciation;