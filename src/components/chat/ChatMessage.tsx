
import React from 'react';
import { Card } from "@/components/ui/card";
import { Bot, User } from 'lucide-react';
import { WarrantyMessage } from '@/services/api';

interface ChatMessageProps {
  message: WarrantyMessage;
  formatTime: (timestamp: string) => string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, formatTime }) => {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
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
  );
};

export default ChatMessage;
