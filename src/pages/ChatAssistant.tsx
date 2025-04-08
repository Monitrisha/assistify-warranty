
import React from 'react';
import Layout from '@/components/layout/Layout';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';
import ChatSkeleton from '@/components/chat/ChatSkeleton';
import { useChat } from '@/hooks/use-chat';

// Sample previous chats
const previousChats = [
  { id: 1, title: "Warranty claim for laptop", date: "2024-03-12" },
  { id: 2, title: "Phone repair inquiry", date: "2024-03-11" },
  { id: 3, title: "Warranty extension help", date: "2024-03-10" },
];

const ChatAssistant = () => {
  const {
    messages,
    isLoading,
    isInitializing,
    showPrompts,
    formatTime,
    sendMessage,
    startNewChat
  } = useChat();

  // Show loading skeleton while initializing
  if (isInitializing) {
    return <ChatSkeleton />;
  }

  const handleChatSelect = (chatId: number) => {
    console.log('Selected chat:', chatId);
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Chat History Sidebar */}
        <ChatSidebar
          previousChats={previousChats}
          onNewChatClick={startNewChat}
          onChatSelect={handleChatSelect}
        />

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <ChatMessages
            messages={messages}
            isLoading={isLoading}
            showPrompts={showPrompts}
            formatTime={formatTime}
            onSuggestionClick={sendMessage}
          />
          
          {/* Input form */}
          <ChatInput
            onSubmit={sendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ChatAssistant;
