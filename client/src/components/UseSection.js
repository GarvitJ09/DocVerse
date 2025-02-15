import React, { useState } from 'react';
import FileUpload from './FileUpload';
import ChatInterface from './ChatInterface';
import axios from 'axios';
import '../styles/UseSection.css';

const UseSection = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  const handleFileUpload = (files) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleDeleteFile = (fileName) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  const handleSendMessage = async (message) => {
    // Add user message to chat
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: message, time: new Date() },
    ]);

    // Send message to backend
    try {
      const response = await axios.post('/api/chat', {
        message,
        files: uploadedFiles,
      });

      // Add bot response to chat
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: response.data.reply, time: new Date() },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='container'>
      <div className='file-upload-container'>
        <FileUpload onFileUpload={handleFileUpload} />
        <div className='uploaded-files'>
          <h3>Uploaded Files:</h3>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>
                {file.name}
                <button onClick={() => handleDeleteFile(file.name)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='chat-container'>
        <ChatInterface
          messages={chatMessages}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default UseSection;
