import { useRef } from "react";
import AudioPlayer from './AudioPlayer';

const WordPronunciation = ({wordObject}) => {
    const audioPlayerRef = useRef(null);

    return (
        <div>
            <h1 className="text-center">{wordObject.word}</h1>
            <h4 className="text-center">{wordObject.translation}</h4>
            <h4 className="text-secondary text-center ">{wordObject.pronunciation}</h4>
            <div className="text-center pronunciation mb-4">
                <button onClick={() => audioPlayerRef.current?.toggleAudio()} className="btn-audio">
                    <i className="bi bi-volume-up-fill"></i>
                </button>
                <AudioPlayer ref={audioPlayerRef} audioUrl={wordObject.audioUrl} />
            </div>
        </div>
    );
};

export default WordPronunciation;