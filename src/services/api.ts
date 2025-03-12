
const API_BASE_URL = 'http://localhost:5000/api';

export interface WarrantyMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const warrantyApi = {
  // Get chat history
  getChatHistory: async () => {
    const response = await fetch(`${API_BASE_URL}/chat-history`);
    return response.json();
  },

  // Send message and get response
  sendMessage: async (message: string): Promise<WarrantyMessage> => {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    return response.json();
  },
};
