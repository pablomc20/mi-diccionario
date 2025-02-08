import React, { useState } from "react";

const ListeningAudio = ({ audioURL }) => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    const playAudio = () => {
        const audioElement = new Audio(audioURL);
        audioElement.play();
        setIsAudioPlaying(true);

        audioElement.onended = () => {
            setIsAudioPlaying(false);
        };
    };

    return (
        <button data-title="Reproducir audio"
            className="btn btn-secondary btn-tooltip p-3"
            onClick={playAudio}
            disabled={!audioURL || isAudioPlaying}
        >
            {isAudioPlaying ? <i class="bi bi-soundwave"></i> : <i class="bi bi-play-fill"></i> }
        </button>
    );

};

export default ListeningAudio;