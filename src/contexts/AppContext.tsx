import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Message, Task, Contract, WhatsAppMessage, WhatsAppChat, UserProfile } from '../types';

interface AppContextType {
  currentScreen: 'chat' | 'whatsapp' | 'new';
  setCurrentScreen: (screen: 'chat' | 'whatsapp' | 'new') => void;
  leftPanelOpen: boolean;
  setLeftPanelOpen: (open: boolean) => void;
  rightPanelOpen: boolean;
  setRightPanelOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  tasks: Task[];
  updateTasks: (tasks: Task[]) => void;
  contracts: Contract[];
  addContract: (contract: Omit<Contract, 'id' | 'createdAt'>) => void;
  whatsappChats: WhatsAppChat[];
  selectedChat: WhatsAppChat | null;
  setSelectedChat: (chat: WhatsAppChat | null) => void;
  whatsappMessages: WhatsAppMessage[];
  addWhatsappMessage: (message: Omit<WhatsAppMessage, 'id' | 'timestamp'>) => void;
  currentThread: string | null;
  setCurrentThread: (thread: string | null) => void;
  userProfile: UserProfile;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<'chat' | 'whatsapp' | 'new'>('chat');
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [whatsappChats, setWhatsappChats] = useState<WhatsAppChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<WhatsAppChat | null>(null);
  const [whatsappMessages, setWhatsappMessages] = useState<WhatsAppMessage[]>([]);
  const [currentThread, setCurrentThread] = useState<string | null>(null);

  const userProfile: UserProfile = {
    name: 'João Silva',
    role: 'Recepção',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const updateTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
  };

  const addContract = (contract: Omit<Contract, 'id' | 'createdAt'>) => {
    const newContract: Contract = {
      ...contract,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setContracts(prev => [...prev, newContract]);
  };

  const addWhatsappMessage = (message: Omit<WhatsAppMessage, 'id' | 'timestamp'>) => {
    const newMessage: WhatsAppMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setWhatsappMessages(prev => [...prev, newMessage]);
  };

  // Initialize mock data
  useEffect(() => {
    // Mock tasks
    const mockTasks: Task[] = [
      {
        id: '1',
        description: 'Contrato de locação - João Silva precisa assinar',
        priority: 'urgent',
        suggestion: 'Enviar lembrete via WhatsApp',
        category: 'Contratos'
      },
      {
        id: '2',
        description: 'Pagamento em atraso - Maria Santos',
        priority: 'urgent',
        suggestion: 'Ligar para negociar',
        category: 'Pagamentos'
      },
      {
        id: '3',
        description: 'Renovação de contrato - Pedro Costa',
        priority: 'medium',
        suggestion: 'Agendar reunião',
        category: 'Contratos'
      }
    ];

    // Mock WhatsApp chats
    const mockChats: WhatsAppChat[] = [
      {
        id: '1',
        name: 'João Silva',
        lastMessage: 'Preciso do contrato urgente',
        timestamp: new Date(),
        unreadCount: 2,
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
      },
      {
        id: '2',
        name: 'Maria Santos',
        lastMessage: 'Quando posso fazer o pagamento?',
        timestamp: new Date(Date.now() - 300000),
        unreadCount: 0,
        avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
      },
      {
        id: '3',
        name: 'Pedro Costa',
        lastMessage: 'Obrigado pela informação',
        timestamp: new Date(Date.now() - 600000),
        unreadCount: 1,
        avatar: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
      }
    ];

    setTasks(mockTasks);
    setWhatsappChats(mockChats);
  }, []);

  return (
    <AppContext.Provider value={{
      currentScreen,
      setCurrentScreen,
      leftPanelOpen,
      setLeftPanelOpen,
      rightPanelOpen,
      setRightPanelOpen,
      darkMode,
      setDarkMode,
      messages,
      addMessage,
      tasks,
      updateTasks,
      contracts,
      addContract,
      whatsappChats,
      selectedChat,
      setSelectedChat,
      whatsappMessages,
      addWhatsappMessage,
      currentThread,
      setCurrentThread,
      userProfile
    }}>
      {children}
    </AppContext.Provider>
  );
};