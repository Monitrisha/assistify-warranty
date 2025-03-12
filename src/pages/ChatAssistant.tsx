
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, SendHorizontal, Upload, Paperclip, 
  Image, File, Mic, Bot, User
} from 'lucide-react';
import Layout from '@/components/layout/Layout';

// Sample chat messages
const initialMessages = [
  {
    role: 'assistant',
    content: 'Hello! I\'m your warranty assistant. How can I help you today?',
    timestamp: new Date().toISOString()
  }
];

const ChatAssistant = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample user queries for suggestions
  const suggestions = [
    "How do I file a warranty claim?",
    "Track my existing claim",
    "Upload warranty documents",
    "Schedule a service appointment"
  ];

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const botResponse = {
        role: 'assistant',
        content: getBotResponse(input),
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // Sample bot responses based on user input
  const getBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('file') && input.includes('claim')) {
      return "To file a warranty claim, you'll need your proof of purchase and the product's serial number. Would you like to upload these documents now, or should I guide you through the process step by step?";
    } else if (input.includes('track') && (input.includes('claim') || input.includes('status'))) {
      return "I can help you track your claim. Could you provide the claim number or the product information so I can look it up for you?";
    } else if (input.includes('upload') || input.includes('document')) {
      return "You can upload warranty documents by clicking the attachment icon in the chat or going to the Upload section in the main menu. What type of document would you like to upload?";
    } else if (input.includes('schedule') || input.includes('appointment')) {
      return "I can help you schedule a service appointment. What product do you need service for, and what's your preferred date and time?";
    } else if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! I'm your AI warranty assistant. How can I help you today?";
    } else {
      return "Thank you for your question. I'd be happy to help you with that. Could you provide more details about your warranty concern?";
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

  return (
    <Layout>
      <div className="container max-w-4xl px-4">
        <div className="flex flex-col h-[calc(100vh-9rem)]">
          {/* Chat header */}
          <div className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-medium">Warranty Assistant</h1>
                <p className="text-xs text-muted-foreground">AI-powered support</p>
              </div>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
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
            
            {/* Typing indicator */}
            {isTyping && (
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
            
            {/* Auto-scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Quick suggestions */}
          {messages.length < 3 && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input form */}
          <div className="border-t pt-4 pb-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <Button type="button" size="icon" variant="ghost">
                  <Paperclip className="h-5 w-5 text-muted-foreground" />
                </Button>
                <div className="relative flex-1">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="pr-16 py-6"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Button type="button" size="icon" variant="ghost" className="h-8 w-8">
                      <Mic className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button type="submit" size="icon" className="h-8 w-8" disabled={!input.trim()}>
                      <SendHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
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
