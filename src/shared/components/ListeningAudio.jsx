import React, { useState } from "react";
import { Button } from "react-bootstrap";

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
        <Button data-title="Reproducir audio"
            className="btn-tooltip p-3"
            variant="secondary"
            onClick={playAudio}
            disabled={!audioURL || isAudioPlaying}
        >
            {isAudioPlaying ? <i className="bi bi-soundwave"></i> : <i className="bi bi-play-fill"></i> }
        </Button>
    );

};

export default ListeningAudio;