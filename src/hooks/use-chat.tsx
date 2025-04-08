
import { useState, useEffect } from 'react';
import { warrantyApi, WarrantyMessage } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export const useChat = () => {
  const [messages, setMessages] = useState<WarrantyMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [showPrompts, setShowPrompts] = useState(true);
  const { toast } = useToast();

  // Format timestamp to readable time
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Load chat history on component mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const history = await warrantyApi.getChatHistory();
        setMessages(history);
        if (history.length > 1) {
          setShowPrompts(false);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load chat history. Please refresh the page.",
          variant: "destructive",
        });
        // Set default welcome message if can't load history
        setMessages([{
          role: 'assistant',
          content: 'Hello! I\'m your warranty assistant. How can I help you today?',
          timestamp: new Date().toISOString()
        }]);
      } finally {
        setIsInitializing(false);
      }
    };

    fetchChatHistory();
  }, [toast]);

  // Send a new message
  const sendMessage = async (input: string) => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: WarrantyMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setShowPrompts(false);
    
    try {
      // Send message to backend
      const response = await warrantyApi.sendMessage(input);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Start a new chat
  const startNewChat = () => {
    setMessages([{
      role: 'assistant',
      content: 'Hello! I\'m your warranty assistant. How can I help you today?',
      timestamp: new Date().toISOString()
    }]);
    setShowPrompts(true);
  };

  return {
    messages,
    isLoading,
    isInitializing,
    showPrompts,
    formatTime,
    sendMessage,
    startNewChat
  };
};
