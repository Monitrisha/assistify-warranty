
import React from 'react';
import { Card } from "@/components/ui/card";
import { Bot } from 'lucide-react';

const ChatLoading: React.FC = () => {
  return (
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
  );
};

export default ChatLoading;
