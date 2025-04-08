
import React, { useRef, useEffect } from 'react';
import { WarrantyMessage } from '@/services/api';
import ChatMessage from './ChatMessage';
import ChatPromptSuggestions from '@/components/ChatPromptSuggestions';
import ChatLoading from './ChatLoading';

interface ChatMessagesProps {
  messages: WarrantyMessage[];
  isLoading: boolean;
  showPrompts: boolean;
  formatTime: (timestamp: string) => string;
  onSuggestionClick: (suggestion: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isLoading,
  showPrompts,
  formatTime,
  onSuggestionClick
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} formatTime={formatTime} />
      ))}
      
      {/* Warranty claim prompts for new chat */}
      {showPrompts && messages.length === 1 && (
        <div className="p-4 rounded-lg border border-muted bg-muted/10">
          <h3 className="font-medium mb-2">How can I help with your warranty needs?</h3>
          <ChatPromptSuggestions onSuggestionClick={onSuggestionClick} />
        </div>
      )}
      
      {/* Typing indicator */}
      {isLoading && <ChatLoading />}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
