import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Send, Phone, Video, MoreVertical, Search, Paperclip, Smile, ArrowLeft, Check, CheckCheck } from 'lucide-react';

export const WhatsAppScreen: React.FC = () => {
  const { whatsappChats, selectedChat, setSelectedChat, whatsappMessages, addWhatsappMessage, darkMode } = useApp();
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showChatList, setShowChatList] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [whatsappMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !selectedChat) return;

    addWhatsappMessage({
      sender: 'Você',
      content: inputValue,
      isOwn: true,
      status: 'sent'
    });

    setInputValue('');

    // Simulate response
    setTimeout(() => {
      const responses = [
        'Obrigado pela informação!',
        'Vou verificar isso.',
        'Perfeito, muito obrigado!',
        'Pode me enviar mais detalhes?',
        'Entendi, vou providenciar.'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      addWhatsappMessage({
        sender: selectedChat.name,
        content: randomResponse,
        isOwn: false,
        status: 'delivered'
      });
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredChats = whatsappChats.filter(chat =>
    chat.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleChatSelect = (chat: any) => {
    setSelectedChat(chat);
    if (window.innerWidth < 768) {
      setShowChatList(false);
    }
  };

  const handleBackToChats = () => {
    setShowChatList(true);
    setSelectedChat(null);
  };

  return (
    <div className={`flex h-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      {/* Chat List */}
      <div className={`${showChatList ? 'w-full md:w-80' : 'hidden md:block md:w-80'} ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
        {/* Header */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} p-4 border-b`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>WhatsApp</h2>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <MoreVertical size={20} className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              placeholder="Pesquisar ou começar uma nova conversa"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 ${darkMode ? 'bg-gray-700 focus:bg-gray-600 text-gray-200' : 'bg-gray-100 focus:bg-white text-gray-900'} border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm`}
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => handleChatSelect(chat)}
              className={`w-full p-3 flex items-center space-x-3 transition-colors border-b ${
                darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-100 hover:bg-gray-50'
              } ${
                selectedChat?.id === chat.id 
                  ? darkMode ? 'bg-gray-800' : 'bg-gray-100' 
                  : ''
              }`}
            >
              <div className="relative">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'} truncate`}>{chat.name}</h3>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} ml-2`}>
                    {formatTime(chat.timestamp)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} truncate flex-1`}>{chat.lastMessage}</p>
                  {chat.unreadCount > 0 && (
                    <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${!showChatList || selectedChat ? 'flex-1' : 'hidden md:flex md:flex-1'} flex flex-col`}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} p-3 border-b flex items-center justify-between`}>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleBackToChats}
                  className={`md:hidden p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-full transition-colors`}
                >
                  <ArrowLeft size={20} className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
                <img
                  src={selectedChat.avatar}
                  alt={selectedChat.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{selectedChat.name}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>online</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-full transition-colors`}>
                  <Phone size={20} className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
                <button className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-full transition-colors`}>
                  <Video size={20} className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
                <button className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-full transition-colors`}>
                  <MoreVertical size={20} className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-2"
              style={{
                backgroundImage: darkMode 
                  ? `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5ddd5' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundColor: darkMode ? '#1f2937' : '#e5ddd5'
              }}
            >
              {whatsappMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg relative ${
                      message.isOwn
                        ? darkMode ? 'bg-green-600 text-white rounded-br-none' : 'bg-green-500 text-white rounded-br-none'
                        : darkMode ? 'bg-gray-700 text-gray-200 shadow-sm rounded-bl-none' : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
                    }`}
                    style={{
                      borderRadius: message.isOwn 
                        ? '7.5px 7.5px 7.5px 0px' 
                        : '7.5px 7.5px 0px 7.5px'
                    }}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <div className="flex items-center justify-end space-x-1 mt-1">
                      <span className={`text-xs ${message.isOwn ? 'text-green-100' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formatTime(message.timestamp)}
                      </span>
                      {message.isOwn && (
                        <span className="text-green-100">
                          {message.status === 'sent' ? (
                            <Check size={12} />
                          ) : (
                            <CheckCheck size={12} />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} p-3 border-t`}>
              <form onSubmit={handleSubmit} className="flex items-end space-x-2">
                <button
                  type="button"
                  className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-full transition-colors`}
                >
                  <Paperclip size={20} className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
                <div className={`flex-1 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} rounded-full border flex items-center px-4 py-2`}>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Digite uma mensagem"
                    className={`flex-1 outline-none text-sm ${darkMode ? 'bg-transparent text-gray-200 placeholder-gray-400' : 'bg-transparent text-gray-900 placeholder-gray-500'}`}
                  />
                  <button
                    type="button"
                    className={`ml-2 p-1 ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'} rounded-full transition-colors`}
                  >
                    <Smile size={18} className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  </button>
                </div>
                <button
                  type="submit"
                  className={`p-2 ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white rounded-full transition-colors`}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className={`flex-1 flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'} max-w-md`}>
              <div className="w-64 h-64 mx-auto mb-8 opacity-20">
                <svg viewBox="0 0 303 172" width="360" height="200">
                  <path fill="currentColor" d="M229.565 160.229c-6.429-.439-10.563-1.645-14.169-2.888-5.26-1.815-9.191-3.99-13.546-7.501-6.133-4.942-10.487-11.003-13.516-18.804-1.97-5.076-2.402-8.222-2.402-17.52 0-9.297.432-12.444 2.402-17.52 3.029-7.801 7.383-13.862 13.516-18.804 4.355-3.511 8.286-5.686 13.546-7.501 3.606-1.243 7.74-2.449 14.169-2.888 6.428-.439 8.465-.546 24.695-.546s18.267.107 24.695.546c6.429.439 10.563 1.645 14.169 2.888 5.26 1.815 9.191 3.99 13.546 7.501 6.133 4.942 10.487 11.003 13.516 18.804 1.97 5.076 2.402 8.222 2.402 17.52 0 9.297-.432 12.444-2.402 17.52-3.029 7.801-7.383 13.862-13.516 18.804-4.355 3.511-8.286 5.686-13.546 7.501-3.606 1.243-7.74 2.449-14.169 2.888-6.428.439-8.465.546-24.695.546s-18.267-.107-24.695-.546zm49.39-73.226c0-13.549-10.984-24.533-24.533-24.533s-24.533 10.984-24.533 24.533 10.984 24.533 24.533 24.533 24.533-10.984 24.533-24.533zm-44.533 0c0-11.045 8.955-20 20-20s20 8.955 20 20-8.955 20-20 20-20-8.955-20-20zm36.533-25.533c0-3.314 2.686-6 6-6s6 2.686 6 6-2.686 6-6 6-6-2.686-6-6z"/>
                </svg>
              </div>
              <h3 className={`text-2xl font-light ${darkMode ? 'text-gray-300' : 'text-gray-400'} mb-2`}>WhatsApp Web</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
                Envie e receba mensagens sem precisar manter seu telefone conectado.
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-4`}>
                Use o WhatsApp em até 4 dispositivos vinculados e 1 telefone ao mesmo tempo.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};