export interface Message {
  id: string;
  author: 'user' | 'system';
  content: string;
  timestamp: Date;
  threadId?: string;
}

export interface Task {
  id: string;
  description: string;
  priority: 'urgent' | 'medium' | 'normal';
  suggestion?: string;
  category: string;
}

export interface Contract {
  id: string;
  who: string;
  did: string;
  thisObject: string;
  when: string;
  witness?: string;
  ifOk: string;
  ifDoubt: string;
  ifNot: string;
  status: 'draft' | 'active' | 'completed';
  createdAt: Date;
}

export interface WhatsAppMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
  status: 'sent' | 'delivered' | 'read';
}

export interface WhatsAppChat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  avatar?: string;
}

export interface AISuggestion {
  id: string;
  text: string;
  priority: 'urgent' | 'medium' | 'normal';
  action: string;
}

export interface UserProfile {
  name: string;
  role: string;
  avatar?: string;
}