import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  // Handle user input for chatbot
  const handleChatSubmit = async (e) => {
    e.preventDefault(); 
    // Clear the user input
    setUserInput('');

    if (!userInput.trim()) return;

    // Add user input to the chat
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: userInput },
    ]);

    try {
      const response = await axios.post('https://chatbotv2-758892558646.asia-south1.run.app/chatbot', { message: userInput });

      // Add chatbot response to the chat
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: response.data.reply },
      ]);
    } catch (error) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Error: Could not fetch the response' },
      ]);
    }

    // Clear the user input
    setUserInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '10px' }}>
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              marginBottom: '10px',
            }}
          >
            <span
              style={{
                backgroundColor: msg.sender === 'user' ? '#d4edda' : '#ffffff', // Light green for user, white for bot
                color: '#000000', // Black text color
                padding: '8px',
                borderRadius: '10px',
                display: 'inline-block',
                maxWidth: '80%',
                fontSize: '16px', // Larger text size
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleChatSubmit} style={{ display: 'flex', marginTop: 'auto' }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message"
          style={{
            width: '80%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        />
        <button
          type="submit"
          style={{
            width: '18%',
            padding: '10px',
            marginLeft: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
