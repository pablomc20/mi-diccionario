import { useState, useRef, forwardRef, useImperativeHandle } from "react";

const AudioPlayer = forwardRef(({ audioUrl }, ref) => {
    const host = "https://media.merriam-webster.com/audio/prons/en/us/mp3/";
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const toggleAudio = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    // Exponer la función toggleAudio al componente padre
    useImperativeHandle(ref, () => ({
        toggleAudio
    }));

    return (
        <div id="audioPlayer" className="flex items-center space-x-2">
            <audio ref={audioRef} src={`${host}${audioUrl}`} onEnded={() => setIsPlaying(false)} />
            {isPlaying && <span className="text-sm text-muted-foreground">Playing...</span>}
        </div>
    );
});

export default AudioPlayer;
