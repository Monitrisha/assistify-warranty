
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Calendar, HelpCircle, CheckSquare, Clock } from 'lucide-react';

interface ChatPromptSuggestionProps {
  onSuggestionClick: (suggestion: string) => void;
}

const ChatPromptSuggestions: React.FC<ChatPromptSuggestionProps> = ({ 
  onSuggestionClick 
}) => {
  const warrantySuggestions = [
    {
      icon: <FileText className="h-4 w-4" />,
      text: "I need to file a new warranty claim",
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      text: "Schedule a service appointment",
    },
    {
      icon: <Clock className="h-4 w-4" />,
      text: "Check the status of my warranty claim",
    },
    {
      icon: <CheckSquare className="h-4 w-4" />,
      text: "Upload warranty documentation",
    },
    {
      icon: <HelpCircle className="h-4 w-4" />,
      text: "What information do I need for a warranty claim?",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
      {warrantySuggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          className="justify-start gap-2 h-auto py-3 text-left"
          onClick={() => onSuggestionClick(suggestion.text)}
        >
          {suggestion.icon}
          <span className="text-sm">{suggestion.text}</span>
        </Button>
      ))}
    </div>
  );
};

export default ChatPromptSuggestions;
