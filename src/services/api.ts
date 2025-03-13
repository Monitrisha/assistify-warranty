
const API_BASE_URL = 'http://localhost:5000/api';

export interface WarrantyMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const warrantyApi = {
  // Get chat history
  getChatHistory: async (): Promise<WarrantyMessage[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat-history`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
      throw error;
    }
  },

  // Send message and get response
  sendMessage: async (message: string): Promise<WarrantyMessage> => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  },
};
