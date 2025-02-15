import React, { useState } from 'react';

const ChatInterface = ({ messages, onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className='chat-interface'>
      <div className='messages-container'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === 'user' ? 'user-message' : 'bot-message'
            }`}
          >
            <div className='message-sender'>
              {msg.sender === 'user' ? 'You' : 'Bot'}
            </div>
            <div className='message-text'>{msg.text}</div>
            <div className='message-time'>{msg.time.toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
      <div className='input-container'>
        <input
          type='text'
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder='Type your message...'
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
