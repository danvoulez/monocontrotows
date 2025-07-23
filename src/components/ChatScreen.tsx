import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Send, User, Bot, RotateCcw, Plus } from 'lucide-react';

export const ChatScreen: React.FC = () => {
  const { messages, addMessage, currentThread, darkMode } = useApp();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    addMessage({
      author: 'user',
      content: inputValue,
      threadId: currentThread || undefined
    });

    setInputValue('');
    setIsTyping(true);

    // Simulate AI response with typing indicator
    setTimeout(() => {
      const responses = [
        'Entendi sua solicitação. Posso ajudá-lo com isso de forma detalhada.',
        'Vou verificar essas informações para você. Um momento, por favor.',
        'Baseado no que você mencionou, posso sugerir algumas opções interessantes.',
        'Preciso de mais algumas informações para dar continuidade da melhor forma.',
        'Excelente! Vou processar isso imediatamente e retornar com uma resposta completa.',
        'Compreendo perfeitamente. Deixe-me elaborar uma resposta adequada para sua situação.',
        'Ótima pergunta! Vou explicar isso passo a passo para você.'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      addMessage({
        author: 'system',
        content: randomResponse,
        threadId: currentThread || undefined
      });
      
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatMessage = (content: string) => {
    let formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`([^`]+)`/g, `<code class="${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'} px-2 py-1 rounded text-sm font-mono">$1</code>`)
      .replace(/```([^`]+)```/g, `<pre class="${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'} p-3 rounded-lg text-sm font-mono overflow-x-auto"><code>$1</code></pre>`)
      .replace(/^### (.*$)/gm, `<h3 class="text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mt-4 mb-2">$1</h3>`)
      .replace(/^## (.*$)/gm, `<h2 class="text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mt-4 mb-2">$1</h2>`)
      .replace(/^# (.*$)/gm, `<h1 class="text-2xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mt-4 mb-2">$1</h1>`)
      .replace(/^\* (.*$)/gm, `<li class="ml-4">$1</li>`)
      .replace(/^- (.*$)/gm, `<li class="ml-4">$1</li>`)
      .replace(/\n/g, '<br>');
    
    // Wrap lists
    formatted = formatted.replace(/(<li.*?>.*?<\/li>)/g, '<ul class="list-disc list-inside space-y-1">$1</ul>');
    
    return formatted;
  };

  const filteredMessages = currentThread 
    ? messages.filter(msg => msg.threadId === currentThread)
    : messages.filter(msg => !msg.threadId);

  return (
    <div className={`flex flex-col h-full ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {filteredMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md mx-auto px-4">
              <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-5xl font-bold leading-none -mt-1">m</span>
              </div>
              <h3 className={`text-2xl font-semibold ${darkMode ? 'text-gray-100' : 'text-green-600 font-bold'} mb-2`}>
                {currentThread ? `${currentThread}` : 'Como posso ajudar?'}
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                {currentThread 
                  ? `Vamos conversar sobre ${currentThread}. Faça suas perguntas!`
                  : 'Inicie uma conversa!'}
              </p>
            </div>
          </div>
        ) : (
          <div className="px-4 py-6 space-y-6">
            {filteredMessages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.author === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex space-x-3 max-w-3xl ${message.author === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.author === 'user'
                      ? darkMode ? 'bg-blue-700' : 'bg-blue-600'
                      : 'bg-green-500'
                  }`}>
                    {message.author === 'user' ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <span className="text-white text-sm font-bold">m</span>
                    )}
                  </div>
                  <div className={`flex-1 ${message.author === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block px-4 py-3 rounded-2xl ${
                      message.author === 'user'
                        ? darkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'
                        : darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div
                        className="text-sm leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: formatMessage(message.content)
                        }}
                      />
                    </div>
                    <div className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} ${message.author === 'user' ? 'text-right' : ''}`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex space-x-3 max-w-3xl">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">m</span>
                  </div>
                  <div className="flex-1">
                    <div className={`inline-block px-4 py-3 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className="flex space-x-1">
                        <div className={`w-2 h-2 ${darkMode ? 'bg-gray-500' : 'bg-gray-400'} rounded-full animate-bounce`}></div>
                        <div className={`w-2 h-2 ${darkMode ? 'bg-gray-500' : 'bg-gray-400'} rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                        <div className={`w-2 h-2 ${darkMode ? 'bg-gray-500' : 'bg-gray-400'} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className={`border-t ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'} p-4`}>
        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={currentThread ? `Perguntando sobre ${currentThread}...` : 'Envie uma mensagem...'}
              className={`w-full px-4 py-3 border ${darkMode ? 'border-gray-600 bg-gray-800 text-gray-200 focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'} rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent resize-none text-sm leading-relaxed`}
              style={{ minHeight: '48px', maxHeight: '200px' }}
              rows={1}
            />
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className={`p-3 rounded-full transition-all duration-200 ${
              inputValue.trim()
                ? darkMode ? 'bg-blue-700 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                : darkMode ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};