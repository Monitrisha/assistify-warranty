
import React from 'react';
import Layout from '@/components/layout/Layout';

const ChatSkeleton: React.FC = () => {
  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="w-80 border-r bg-muted/30">
          <div className="p-4 space-y-4">
            <div className="h-10 bg-muted/50 rounded-md animate-pulse"></div>
            <div className="h-10 bg-muted/50 rounded-md animate-pulse"></div>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-muted/50 rounded-md animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 py-4 px-6 space-y-4">
            <div className="h-12 w-3/4 bg-muted/50 rounded-md animate-pulse"></div>
          </div>
          <div className="border-t p-4">
            <div className="h-10 bg-muted/50 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatSkeleton;
