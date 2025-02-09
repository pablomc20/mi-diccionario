const WordPronunciation = ({wordObject}) => {

    const speakText = async (text) => {
        try {
            window.responsiveVoice.speak(text.split(' ')[0]);
        } catch (error) {
            console.error("Error al convertir texto a voz:", error);
        }
    };

    return (
        <div>
            <h1 className="text-center">{wordObject.word}</h1>
            <h4 className="text-center">{wordObject.translation}</h4>
            <h4 className="text-secondary text-center ">{wordObject.pronunciation}</h4>
            <div className="text-center pronunciation mb-4">
                <button onClick={() => speakText(wordObject.word)} className="btn-audio">
                    <i className="bi bi-volume-up-fill"></i>
                </button>
            </div>
        </div>
    );
};

export default WordPronunciation;