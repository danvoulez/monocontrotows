import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { Navigation } from './components/Navigation';
import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { ChatScreen } from './components/ChatScreen';
import { WhatsAppScreen } from './components/WhatsAppScreen';
import { NewContractScreen } from './components/NewContractScreen';

const AppContent: React.FC = () => {
  const { currentScreen, leftPanelOpen, rightPanelOpen, darkMode } = useApp();

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'chat':
        return <ChatScreen />;
      case 'whatsapp':
        return <WhatsAppScreen />;
      case 'new':
        return <NewContractScreen />;
      default:
        return <ChatScreen />;
    }
  };

  return (
    <div className={`h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      <div className="flex-1 flex overflow-hidden">
        <LeftPanel />
        
        <div className={`flex-1 flex transition-all duration-300 ${leftPanelOpen ? 'ml-80' : 'ml-0'} ${rightPanelOpen ? 'mr-80' : 'mr-0'} relative`}>
          <div className="flex-1 flex flex-col">
            {renderCurrentScreen()}
          </div>
        </div>
        
        <RightPanel />
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;