import { Button, Container } from "react-bootstrap";

const PaginationButtons = ({ sentencesCount, currentIndex, onChangeIndex }) => {
    return (
        <Container className="d-flex justify-content-center mt-4 p-0">
            {Array.from({ length: sentencesCount }).map((_, index) => (
                <Button
                    key={index}
                    className={'rounded-circle mx-2'}
                    variant={`${index === currentIndex ? "primary" : "secondary"}`}
                    style={{ width: "12px", height: "12px", padding: 0 }}
                    onClick={() => onChangeIndex(index)}
                />
            ))}
        </Container>
    );
};

export default PaginationButtons;