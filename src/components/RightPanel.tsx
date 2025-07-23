import React from 'react';
import { useApp } from '../contexts/AppContext';
import { AlertCircle, CheckCircle, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const RightPanel: React.FC = () => {
  const { tasks, currentScreen, rightPanelOpen, setRightPanelOpen, darkMode } = useApp();

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertCircle size={16} className="text-red-500" />;
      case 'medium':
        return <Clock size={16} className="text-yellow-500" />;
      default:
        return <CheckCircle size={16} className="text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    if (darkMode) {
      switch (priority) {
        case 'urgent':
          return 'border-l-red-500 bg-red-900 bg-opacity-20 hover:bg-red-900 hover:bg-opacity-30';
        case 'medium':
          return 'border-l-yellow-500 bg-yellow-900 bg-opacity-20 hover:bg-yellow-900 hover:bg-opacity-30';
        default:
          return 'border-l-gray-500 bg-gray-800 hover:bg-gray-700';
      }
    } else {
      switch (priority) {
        case 'urgent':
          return 'border-l-red-500 bg-red-50 hover:bg-red-100';
        case 'medium':
          return 'border-l-yellow-500 bg-yellow-50 hover:bg-yellow-100';
        default:
          return 'border-l-gray-500 bg-gray-50 hover:bg-gray-100';
      }
    }
  };

  if (!rightPanelOpen) {
    return (
      <button
        onClick={() => setRightPanelOpen(true)}
        className={`fixed top-4 right-4 z-50 ${darkMode ? 'bg-gray-800 text-gray-200 border-gray-600' : 'bg-white text-gray-700 border-gray-200'} p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border`}
      >
        <ChevronLeft size={20} />
      </button>
    );
  }

  const getContent = () => {
    if (currentScreen === 'whatsapp') {
      return {
        title: 'Assistente IA',
        subtitle: 'Sugestões para o chat atual',
        content: (
          <div className="space-y-4">
            <div className={`${darkMode ? 'bg-blue-900 bg-opacity-30 border-blue-700' : 'bg-blue-50 border-blue-200'} border rounded-xl p-4 hover:bg-opacity-40 transition-colors`}>
              <div className="flex items-start justify-between mb-2">
                <h4 className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>Sugestão de Resposta</h4>
                <span className={`text-xs ${darkMode ? 'text-blue-400 bg-blue-800' : 'text-blue-600 bg-blue-200'} px-2 py-1 rounded-full`}>IA</span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-700'} mb-3 leading-relaxed`}>
                "Olá! Posso ajudá-lo com o contrato hoje. Preciso de alguns dados para dar continuidade."
              </p>
              <div className="flex space-x-2">
                <button className={`px-3 py-1.5 ${darkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white text-sm rounded-lg transition-colors`}>
                  Inserir
                </button>
                <button className={`px-3 py-1.5 ${darkMode ? 'bg-gray-700 border-blue-600 text-blue-300 hover:bg-gray-600' : 'bg-white border-blue-300 text-blue-700 hover:bg-blue-50'} border text-sm rounded-lg transition-colors`}>
                  Editar
                </button>
              </div>
            </div>

            <div className={`${darkMode ? 'bg-orange-900 bg-opacity-30 border-orange-700' : 'bg-orange-50 border-orange-200'} border rounded-xl p-4 hover:bg-opacity-40 transition-colors`}>
              <div className="flex items-start justify-between mb-2">
                <h4 className={`font-medium ${darkMode ? 'text-orange-300' : 'text-orange-800'}`}>Alerta Contextual</h4>
                <AlertCircle size={16} className={`${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              </div>
              <p className={`text-sm ${darkMode ? 'text-orange-200' : 'text-orange-700'} mb-2`}>
                Cliente com pendência de pagamento
              </p>
              <div className={`flex items-center text-xs ${darkMode ? 'text-orange-400 bg-orange-800' : 'text-orange-600 bg-orange-100'} px-2 py-1 rounded-lg`}>
                <Clock size={12} className="mr-1" />
                Última interação: 3 dias atrás
              </div>
            </div>

            <div className={`${darkMode ? 'bg-green-900 bg-opacity-30 border-green-700' : 'bg-green-50 border-green-200'} border rounded-xl p-4 hover:bg-opacity-40 transition-colors`}>
              <div className="flex items-start justify-between mb-2">
                <h4 className={`font-medium ${darkMode ? 'text-green-300' : 'text-green-800'}`}>Documento Pronto</h4>
                <CheckCircle size={16} className={`${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <p className={`text-sm ${darkMode ? 'text-green-200' : 'text-green-700'} mb-3`}>
                Contrato de locação atualizado disponível
              </p>
              <button className={`w-full px-3 py-1.5 ${darkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} text-white text-sm rounded-lg transition-colors`}>
                Enviar Documento
              </button>
            </div>

            <div className={`${darkMode ? 'bg-purple-900 bg-opacity-30 border-purple-700' : 'bg-purple-50 border-purple-200'} border rounded-xl p-4 hover:bg-opacity-40 transition-colors`}>
              <div className="flex items-start justify-between mb-2">
                <h4 className={`font-medium ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>Resposta Rápida</h4>
                <span className={`text-xs ${darkMode ? 'text-purple-400 bg-purple-800' : 'text-purple-600 bg-purple-200'} px-2 py-1 rounded-full`}>Sugestão</span>
              </div>
              <div className="space-y-2">
                <button className={`w-full text-left p-2 ${darkMode ? 'bg-gray-800 border-purple-600 hover:bg-gray-700' : 'bg-white border-purple-200 hover:bg-purple-50'} border rounded-lg transition-colors text-sm`}>
                  "Vou verificar isso para você"
                </button>
                <button className={`w-full text-left p-2 ${darkMode ? 'bg-gray-800 border-purple-600 hover:bg-gray-700' : 'bg-white border-purple-200 hover:bg-purple-50'} border rounded-lg transition-colors text-sm`}>
                  "Pode me enviar mais detalhes?"
                </button>
                <button className={`w-full text-left p-2 ${darkMode ? 'bg-gray-800 border-purple-600 hover:bg-gray-700' : 'bg-white border-purple-200 hover:bg-purple-50'} border rounded-lg transition-colors text-sm`}>
                  "Obrigado pela informação!"
                </button>
              </div>
            </div>
          </div>
        )
      };
    }

    if (currentScreen === 'new') {
      return {
        title: 'Assistente de Contratos',
        subtitle: 'Dicas e validações',
        content: (
          <div className="space-y-4">
            <div className={`${darkMode ? 'bg-blue-900 bg-opacity-30 border-blue-700' : 'bg-blue-50 border-blue-200'} border rounded-xl p-4 hover:bg-opacity-40 transition-colors`}>
              <div className="flex items-start justify-between mb-2">
                <h4 className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>Dica de Preenchimento</h4>
                <span className={`text-xs ${darkMode ? 'text-blue-400 bg-blue-800' : 'text-blue-600 bg-blue-200'} px-2 py-1 rounded-full`}>IA</span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-700'} mb-3 leading-relaxed`}>
                Use linguagem clara e objetiva. Evite termos técnicos desnecessários.
              </p>
            </div>

            <div className={`${darkMode ? 'bg-green-900 bg-opacity-30 border-green-700' : 'bg-green-50 border-green-200'} border rounded-xl p-4 hover:bg-opacity-40 transition-colors`}>
              <div className="flex items-start justify-between mb-2">
                <h4 className={`font-medium ${darkMode ? 'text-green-300' : 'text-green-800'}`}>Modelo Sugerido</h4>
                <CheckCircle size={16} className={`${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <p className={`text-sm ${darkMode ? 'text-green-200' : 'text-green-700'} mb-3`}>
                Contrato de locação residencial padrão disponível
              </p>
              <button className={`w-full px-3 py-1.5 ${darkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} text-white text-sm rounded-lg transition-colors`}>
                Aplicar Modelo
              </button>
            </div>

            <div className={`${darkMode ? 'bg-yellow-900 bg-opacity-30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border rounded-xl p-4 hover:bg-opacity-40 transition-colors`}>
              <div className="flex items-start justify-between mb-2">
                <h4 className={`font-medium ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>Validação</h4>
                <AlertCircle size={16} className={`${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              </div>
              <p className={`text-sm ${darkMode ? 'text-yellow-200' : 'text-yellow-700'} mb-2`}>
                Certifique-se de preencher todos os campos obrigatórios
              </p>
              <div className={`text-xs ${darkMode ? 'text-yellow-400' : 'text-yellow-600'} space-y-1`}>
                <div>• Quem (Who) - obrigatório</div>
                <div>• Fez (Did) - obrigatório</div>
                <div>• Objeto (This) - obrigatório</div>
                <div>• Quando (When) - obrigatório</div>
              </div>
            </div>
          </div>
        )
      };
    }

    // Default chat content
    return {
      title: 'Lista de Tarefas',
      subtitle: 'Curadas por IA',
      content: (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`border-l-4 rounded-xl p-4 transition-all duration-200 cursor-pointer ${getPriorityColor(task.priority)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getPriorityIcon(task.priority)}
                  <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wide`}>
                    {task.category}
                  </span>
                </div>
                <ArrowRight size={14} className={`${darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'} transition-colors`} />
              </div>
              
              <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-3 leading-relaxed`}>
                {task.description}
              </p>
              
              {task.suggestion && (
                <div className={`${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white bg-opacity-50 border-gray-200'} rounded-lg p-2 border`}>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1 font-medium`}>Sugestão da IA:</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{task.suggestion}</p>
                </div>
              )}
            </div>
          ))}
          
          <div className={`mt-6 p-4 ${darkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900 border-blue-700' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'} rounded-xl border`}>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <h4 className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>Sistema Runtime</h4>
            </div>
            <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-700'} leading-relaxed`}>
              Monitorando contratos, prazos e pendências em tempo real
            </p>
            <div className={`mt-2 text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              Última atualização: agora
            </div>
          </div>
        </div>
      )
    };
  };

  const { title, subtitle, content } = getContent();

  return (
    <div className={`fixed right-0 top-0 h-full w-80 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-2xl z-40 flex flex-col transition-transform duration-300 ease-out ${rightPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
        <div>
          <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{title}</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{subtitle}</p>
        </div>
        <button
          onClick={() => setRightPanelOpen(false)}
          className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
        >
          <ChevronRight size={16} className={`${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
        </button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {content}
      </div>
    </div>
  );
};