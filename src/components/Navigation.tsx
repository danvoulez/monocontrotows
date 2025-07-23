import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { MessageSquare, MessageCircle, FileText, ChevronDown } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { currentScreen, setCurrentScreen, setCurrentThread, darkMode, setDarkMode } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleScreenChange = (screen: 'chat' | 'whatsapp' | 'new') => {
    setCurrentScreen(screen);
    setDropdownOpen(false);
    if (screen === 'chat') {
      setCurrentThread(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
      <div className="flex justify-center">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex items-center space-x-2 px-4 py-2 ${darkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-50 text-green-600'} rounded-lg transition-colors`}
          >
            <span className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-green-600'}`}>minicontratos</span>
            <ChevronDown 
              size={16} 
              className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} 
            />
          </button>

          {dropdownOpen && (
            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'} rounded-lg shadow-lg z-50`}>
              <div className="py-1">
                <button
                  onClick={() => handleScreenChange('chat')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                    currentScreen === 'chat' 
                      ? darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-700'
                      : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <MessageSquare size={18} />
                  <span className="font-medium">Chat</span>
                </button>

                <button
                  onClick={() => handleScreenChange('whatsapp')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                    currentScreen === 'whatsapp' 
                      ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-50 text-green-700'
                      : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <MessageCircle size={18} />
                  <span className="font-medium">WhatsApp</span>
                </button>

                <button
                  onClick={() => handleScreenChange('new')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                    currentScreen === 'new' 
                      ? darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-50 text-purple-700'
                      : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FileText size={18} />
                  <span className="font-medium">Novo Contrato</span>
                </button>
                
                <div className={`border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'} my-1`}></div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-full px-4 py-3 text-left text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'} transition-colors`}
                >
                  {darkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};