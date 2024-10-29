import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai'; // Make sure this package is installed

const API_KEY = "AIzaSyDvbPNSdkPaii_FPptrUecMdSEGtpNMOgY"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);

const ChatContent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null); // Reference to track the end of messages
  let chat;

  const safetySettings = [
      {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
  ];

  const initializeChat = async () => {
      if (!chat) {
          chat = await genAI
              .getGenerativeModel({ model: "gemini-pro", safetySettings })
              .startChat({
                  history: [],
                  generationConfig: {
                      maxOutputTokens: 4000, // Adjust tokens limit if needed
                  },
              });
      }
      return chat;
  };

  const sendMessage = async (prompt) => {
      if (prompt.trim() === "") return;

      // Add user message to the chat
      setMessages((prev) => [...prev, { sender: 'user', text: prompt }]);
      setInput("");

      // Show loading animation
      setLoading(true);

      try {
          // Initialize chat if not already done
          const model = await initializeChat();

          // Send the message to the Gemini API
          const result = await model.sendMessage(prompt);
          const response = await result.response;

          if (response) {
              const text = await response.text();
              setMessages((prev) => [...prev, { sender: 'ai', text }]);
          } else {
              setMessages((prev) => [
                  ...prev,
                  { sender: 'ai', text: "This content is not safe for display based on current settings." }
              ]);
          }
      } catch (error) {
          console.error("Error during message generation:", error);
          setMessages((prev) => [
              ...prev,
              { sender: 'ai', text: "This content is not safe for display based on current settings or an internal error." }
          ]);
      } finally {
          setLoading(false); // Hide loading animation
      }
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
          sendMessage(input);
      }
  };
  
  const handleSendClick = () => sendMessage(input);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
      if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
  };

  // Auto-scroll whenever messages are updated
  useEffect(() => {
      scrollToBottom();
  }, [messages]);

  return (
      <div className="chat-container">
          <div id="output-field" className="output-field">
              I help you, please ask me any thing....
          </div>
          <div id="output-container" className="output-container">
              {messages.map((msg, index) => (
                   <div
                   key={index}
                   className={msg.sender === 'user' ? 'user-message' : 'ai-message'}
                   dangerouslySetInnerHTML={msg.isMarkdown ? { __html: msg.text } : { __html: marked(msg.text) }}
               />
              ))}
              
              {/* Show loading dots while waiting for AI response */}
              {loading && (
                  <div className="ai-message loading">
                      <div className="loading-dot"></div>
                      <div className="loading-dot"></div>
                      <div className="loading-dot"></div>
                  </div>
              )}

              {/* Reference for auto-scrolling */}
              <div ref={messagesEndRef} />
          </div>
          <div className="input-group">
              <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="form-control"
                  placeholder="Type your prompt here..."
              />
              <button onClick={handleSendClick} className="btn btn-primary">Send</button>
          </div>
      </div>
  );
};

export default ChatContent;
