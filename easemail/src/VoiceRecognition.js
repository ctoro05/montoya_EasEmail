import React, { useState } from 'react';

const VoiceRecognition = () => {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Sorry, your browser doesn't support speech recognition.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'es-ES';

        recognition.onstart = () => {
            setListening(true);
        };

        recognition.onspeechend = () => {
            setListening(false);
            recognition.stop();
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setTranscript(transcript);
        };

        recognition.onerror = (event) => {
            console.error('Error occurred in recognition: ', event.error);
            setListening(false);
        };

        recognition.start();
    };

    return (
        <div style={styles.container}>
            <h1>EasEmail - Voice Interaction</h1>
            <button onClick={startListening} style={styles.button}>
                {listening ? 'Listening...' : 'Talk to Computer'}
            </button>
            <div style={styles.result}>{transcript}</div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        fontFamily: 'Arial, sans-serif',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1em',
        cursor: 'pointer',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        marginBottom: '20px',
    },
    result: {
        fontSize: '1.2em',
    },
};

export default VoiceRecognition;
