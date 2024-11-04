import React, { useState } from 'react';
import './Chatbot.css';
import chatbotGif from './chatbot.gif'; // Ensure the GIF is placed correctly in your assets
import ChatContent from './ChatContent';

const Chatbot = () => {
    const [showChat, setShowChat] = useState(false);

    const toggleChatWindow = () => {
        setShowChat(!showChat);
    };

    return (
        <div className="chatbot-container">
            <button className="chatbot-button" onClick={toggleChatWindow}>
                <img src={chatbotGif} alt="chatbot" />
                <span className="tooltip-text">
                    Welcome! <br />
                    How can I help You? ^_^
                </span>
            </button>
            
            {showChat && (
                <div className="chat-window">
                    <ChatContent />
                </div>
            )}
        </div>
    );
};

export default Chatbot;
