
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Clock, Search, MessageSquare } from 'lucide-react';

interface ChatItem {
  id: number;
  title: string;
  date: string;
}

interface ChatSidebarProps {
  previousChats: ChatItem[];
  onNewChatClick: () => void;
  onChatSelect: (chatId: number) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  previousChats,
  onNewChatClick,
  onChatSelect
}) => {
  return (
    <div className="w-80 border-r bg-muted/30">
      <div className="p-4 space-y-4">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2"
          onClick={onNewChatClick}
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
              onClick={() => onChatSelect(chat.id)}
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
  );
};

export default ChatSidebar;
