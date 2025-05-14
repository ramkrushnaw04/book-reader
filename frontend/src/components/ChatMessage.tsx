import React from 'react';

// Define types for the ChatMessage component props
interface ChatMessageProps {
  text: string;
  align?: 'left' | 'right';
  isSelf?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, align = 'left', isSelf = false }) => {
  return (
    <div className={`flex w-full my-2 ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
          isSelf 
            ? 'bg-indigo-600 text-white' 
            : 'bg-gray-700 text-gray-100'
        }`}
      >
        <p className="">{text}</p>
      </div>
    </div>
  );
};



export default ChatMessage;