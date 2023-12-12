import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import chaticon from '../../assets/chaticon.webp'

const ChatButton = () => {
  const navigate = useNavigate();
  const location = useLocation()

  const handleButtonClick = () => {
    navigate("/ai")
  };

  if (location.pathname === '/ai') {
    return null;
  }

  return (
    <div className="chat-button-container">
        <img onClick={handleButtonClick} className='chat-icon' src={chaticon} alt="button to chatbot" />
    </div>
  );
};

export default ChatButton;