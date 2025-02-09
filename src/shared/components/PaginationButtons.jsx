const PaginationButtons = ({ sentencesCount, currentIndex, onChangeIndex }) => {
    return (
        <div className="d-flex justify-content-center mt-4">
            {Array.from({ length: sentencesCount }).map((_, index) => (
                <button
                    key={index}
                    className={`btn btn-sm rounded-circle mx-2 ${index === currentIndex ? "btn-primary" : "btn-secondary"}`}
                    style={{ width: "12px", height: "12px", padding: 0 }}
                    onClick={() => onChangeIndex(index)}
                />
            ))}
        </div>
    );
};

export default PaginationButtons;