import React, { useState, useRef, useEffect } from 'react';
import { CohereClientV2 } from 'cohere-ai';
import './Chatbot.styles.scss';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const cohere = new CohereClientV2({
    token: import.meta.env.VITE_COHERE_API_KEY,
  });
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatFromApi = async (data) => {
    try {
      setLoading(true);
      const response = await cohere.chat({
        model: 'command-r-plus',
        messages: [
          {
            role: 'user',
            content: data,
          },
        ],
      });
      
    //   if (response && response.text) {
    //     return response.text;
    //   } else {
    //     throw new Error('Invalid response from Cohere API');
    //   }
    const result = response.message.content[0].text;
    return result
    } catch (e) {
      console.error('Error in text generation from API:', e);
      return 'I apologize, but I encountered an error. Please try again.';
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await fetchChatFromApi(userMessage);
      if (response) {
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again.' 
      }]);
    }
  };

  return (
    <div className="chatbot-container">
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Diet Assistant</h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.role === 'user' ? 'user' : 'assistant'}`}
              >
                <div className="message-content">
                  {message.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="message assistant">
                <div className="message-content loading">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about your diet plan..."
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={loading || !inputMessage.trim()}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot; 