import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { FileText, Users, Calendar, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const NewContractScreen: React.FC = () => {
  const { addContract, setCurrentScreen, addMessage, darkMode } = useApp();
  const [formData, setFormData] = useState({
    who: '',
    did: '',
    thisObject: '',
    when: '',
    witness: '',
    ifOk: '',
    ifDoubt: '',
    ifNot: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.who.trim()) newErrors.who = 'Campo obrigatório';
    if (!formData.did.trim()) newErrors.did = 'Campo obrigatório';
    if (!formData.thisObject.trim()) newErrors.thisObject = 'Campo obrigatório';
    if (!formData.when.trim()) newErrors.when = 'Campo obrigatório';
    if (!formData.ifOk.trim()) newErrors.ifOk = 'Campo obrigatório';
    if (!formData.ifDoubt.trim()) newErrors.ifDoubt = 'Campo obrigatório';
    if (!formData.ifNot.trim()) newErrors.ifNot = 'Campo obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const contract = {
      ...formData,
      status: 'draft' as const
    };

    addContract(contract);
    
    // Create a new chat thread for this contract
    addMessage({
      author: 'system',
      content: `Contrato criado com sucesso!\n\n**Quem:** ${formData.who}\n**Fez:** ${formData.did}\n**Objeto:** ${formData.thisObject}\n**Quando:** ${formData.when}\n\nO contrato está pronto para edição, comentários e assinatura.`,
      threadId: `contract-${Date.now()}`
    });

    // Reset form
    setFormData({
      who: '',
      did: '',
      thisObject: '',
      when: '',
      witness: '',
      ifOk: '',
      ifDoubt: '',
      ifNot: ''
    });

    // Switch to chat screen
    setCurrentScreen('chat');
  };

  const inputClasses = (field: string) => `
    w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors
    ${errors[field] 
      ? 'border-red-500 focus:ring-red-500' 
      : darkMode 
        ? 'border-gray-600 bg-gray-800 text-gray-200 focus:ring-blue-400' 
        : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
    }
  `;

  return (
    <div className={`max-w-4xl mx-auto p-6 ${darkMode ? 'bg-gray-900' : ''}`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <FileText size={32} className="text-white" />
            </div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'} mb-2`}>Criar Novo Contrato</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Formulário inteligente com validações</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                <Users size={16} className="inline mr-2" />
                Quem (Who)
              </label>
              <input
                type="text"
                value={formData.who}
                onChange={(e) => handleInputChange('who', e.target.value)}
                placeholder="Ex: João Silva"
                className={inputClasses('who')}
              />
              {errors.who && (
                <p className={`mt-1 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{errors.who}</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                <Calendar size={16} className="inline mr-2" />
                Quando (When)
              </label>
              <input
                type="text"
                value={formData.when}
                onChange={(e) => handleInputChange('when', e.target.value)}
                placeholder="Ex: 15 de Janeiro de 2024"
                className={inputClasses('when')}
              />
              {errors.when && (
                <p className={`mt-1 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{errors.when}</p>
              )}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Fez (Did)
            </label>
            <input
              type="text"
              value={formData.did}
              onChange={(e) => handleInputChange('did', e.target.value)}
              placeholder="Ex: Locou o imóvel"
              className={inputClasses('did')}
            />
            {errors.did && (
              <p className={`mt-1 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{errors.did}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Objeto (This)
            </label>
            <textarea
              value={formData.thisObject}
              onChange={(e) => handleInputChange('thisObject', e.target.value)}
              placeholder="Ex: Apartamento localizado na Rua das Flores, 123"
              rows={3}
              className={inputClasses('thisObject')}
            />
            {errors.thisObject && (
              <p className={`mt-1 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{errors.thisObject}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Testemunhas (Witness) - Opcional
            </label>
            <input
              type="text"
              value={formData.witness}
              onChange={(e) => handleInputChange('witness', e.target.value)}
              placeholder="Ex: Maria Santos, Pedro Costa"
              className={inputClasses('witness')}
            />
          </div>

          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Condições</h3>
            
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                <CheckCircle size={16} className="inline mr-2 text-green-500" />
                Se OK (If OK)
              </label>
              <textarea
                value={formData.ifOk}
                onChange={(e) => handleInputChange('ifOk', e.target.value)}
                placeholder="Ex: Contrato será efetivado mediante pagamento da primeira parcela"
                rows={2}
                className={inputClasses('ifOk')}
              />
              {errors.ifOk && (
                <p className={`mt-1 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{errors.ifOk}</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                <AlertTriangle size={16} className="inline mr-2 text-yellow-500" />
                Se Dúvida (If Doubt)
              </label>
              <textarea
                value={formData.ifDoubt}
                onChange={(e) => handleInputChange('ifDoubt', e.target.value)}
                placeholder="Ex: Será realizada vistoria técnica adicional"
                rows={2}
                className={inputClasses('ifDoubt')}
              />
              {errors.ifDoubt && (
                <p className={`mt-1 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{errors.ifDoubt}</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                <XCircle size={16} className="inline mr-2 text-red-500" />
                Se Não (If Not)
              </label>
              <textarea
                value={formData.ifNot}
                onChange={(e) => handleInputChange('ifNot', e.target.value)}
                placeholder="Ex: Contrato será cancelado e valores devolvidos"
                rows={2}
                className={inputClasses('ifNot')}
              />
              {errors.ifNot && (
                <p className={`mt-1 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{errors.ifNot}</p>
              )}
            </div>
          </div>

          <div className={`flex justify-end space-x-4 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              type="button"
              onClick={() => setCurrentScreen('chat')}
              className={`px-6 py-2 border ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} rounded-lg transition-colors`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-6 py-2 ${darkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg transition-colors`}
            >
              Criar Contrato
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};