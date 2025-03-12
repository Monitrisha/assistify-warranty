import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, SendHorizontal, Bot, User, Plus, Clock, Search } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ChatPromptSuggestions from '@/components/ChatPromptSuggestions';
import { warrantyApi, WarrantyMessage } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

// Sample previous chats
const previousChats = [
  { id: 1, title: "Warranty claim for laptop", date: "2024-03-12" },
  { id: 2, title: "Phone repair inquiry", date: "2024-03-11" },
  { id: 3, title: "Warranty extension help", date: "2024-03-10" },
];

const ChatAssistant = () => {
  const [messages, setMessages] = useState<WarrantyMessage[]>([{
    role: 'assistant',
    content: 'Hello! I\'m your warranty assistant. How can I help you today?',
    timestamp: new Date().toISOString()
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: WarrantyMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowPrompts(false);
    
    try {
      // Send message to Flask backend
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

  // Format timestamp to readable time
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  // Start a new chat
  const handleNewChat = () => {
    setMessages([{
      role: 'assistant',
      content: 'Hello! I\'m your warranty assistant. How can I help you today?',
      timestamp: new Date().toISOString()
    }]);
    setInput('');
    setShowPrompts(true);
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Chat History Sidebar */}
        <div className="w-80 border-r bg-muted/30">
          <div className="p-4 space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2"
              onClick={handleNewChat}
            >
              <Plus size={16} />
              New Chat
            </Button>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search previous chats..." 
                className="pl-9"
              />
            </div>
            
            <div className="space-y-2">
              {previousChats.map((chat) => (
                <Button
                  key={chat.id}
                  variant="ghost"
                  className="w-full justify-start text-left p-3 h-auto space-y-1"
                  onClick={() => console.log('Selected chat:', chat.id)}
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} />
                    <span className="font-medium text-sm truncate">
                      {chat.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={12} />
                    <span>{chat.date}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    message.role === 'user' ? 'bg-primary' : 'bg-muted'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <Bot className="h-4 w-4 text-foreground" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <Card className={`px-4 py-3 shadow-sm ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-foreground'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </Card>
                    <p className="text-xs text-muted-foreground px-2">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Warranty claim prompts for new chat */}
            {showPrompts && messages.length === 1 && (
              <div className="p-4 rounded-lg border border-muted bg-muted/10">
                <h3 className="font-medium mb-2">How can I help with your warranty needs?</h3>
                <ChatPromptSuggestions onSuggestionClick={handleSuggestionClick} />
              </div>
            )}
            
            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <Bot className="h-4 w-4" />
                  </div>
                  <Card className="px-4 py-3 bg-muted">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-foreground/60 animate-pulse"></div>
                      <div className="h-2 w-2 rounded-full bg-foreground/60 animate-pulse delay-75"></div>
                      <div className="h-2 w-2 rounded-full bg-foreground/60 animate-pulse delay-150"></div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input form */}
          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="relative flex items-center">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="pr-24"
                />
                <div className="absolute right-2 flex items-center gap-2">
                  <Button type="submit" size="icon" className="h-8 w-8" disabled={!input.trim()}>
                    <SendHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Your conversation is private and secure. Our AI is here to assist with warranty inquiries 24/7.
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatAssistant;
