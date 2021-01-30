import React from 'react';
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed.jsx';

import LoginForm from './components/LoginForm.jsx';

import './App.css';

const App = () => {
  if (!localStorage.getItem('username')) return <LoginForm />;
  return (
    <ChatEngine
      height="100vh"
      projectID="2f46755d-8101-4617-9e51-1a72f3ad8a3f"
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    ></ChatEngine>
  );
};

export default App;
