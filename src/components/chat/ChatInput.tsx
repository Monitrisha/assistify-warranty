
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    onSubmit(input);
    setInput('');
  };

  return (
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
            <Button type="submit" size="icon" className="h-8 w-8" disabled={!input.trim() || isLoading}>
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Your conversation is private and secure. Our AI is here to assist with warranty inquiries 24/7.
        </p>
      </form>
    </div>
  );
};

export default ChatInput;
