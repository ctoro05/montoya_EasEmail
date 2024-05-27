import React, { useState } from 'react';
import './VoiceRecognition.css';

const VoiceRecognition = () => {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Lo siento, tu navegador no soporta el reconocimiento de voz.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'es-ES'; // Configuración para español

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
            console.error('Ocurrió un error en el reconocimiento: ', event.error);
            setListening(false);
        };

        recognition.start();
    };

    return (
        <div className="container">
            <div className="navbar">
                <h1>EasEmail</h1>
            </div>
            <div className="content">
                <h1>Redacta tu correo fácil y rápido</h1>
                <button onClick={startListening} className={`button ${listening ? 'listening' : ''}`}>
                    {listening ? 'Escuchando...' : 'Habla con Alexa!'}
                </button>
                <div className="result">{transcript}</div>
            </div>
        </div>
    );
};

export default VoiceRecognition;
