'use client';

import { useState } from 'react';
import { IconButton, Input, Button, Avatar } from '@material-tailwind/react';
import { HiMenu } from 'react-icons/hi';
import { missingProperties } from '@/app/lib/utils/utils';

interface Message {
  text: string;
  sender: 'me' | 'other';
}

interface MessageTimelineProps {
  toggleRightDrawer: () => void;
  isStatic: boolean;
}

export default function MessageTimeline({ toggleRightDrawer, isStatic }: MessageTimelineProps) {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello!', sender: 'other' },
    { text: 'Hi there!', sender: 'me' },
    { text: 'How are you?', sender: 'other' },
    { text: 'I am good, thank you!', sender: 'me' },
    { text: 'What about you?', sender: 'me' },
    { text: 'Doing well, just working on a project.', sender: 'other' },
    { text: 'That sounds interesting!', sender: 'me' },
    { text: 'Yeah, it is. How is your day going?', sender: 'other' },
    { text: 'Busy, but productive.', sender: 'me' },
    { text: 'That\'s great to hear.', sender: 'other' },
    { text: 'Thanks! What project are you working on?', sender: 'me' },
    { text: 'A web app for managing tasks.', sender: 'other' },
    { text: 'Sounds useful. Are you using React?', sender: 'me' },
    { text: 'Yes, React and Tailwind CSS.', sender: 'other' },
    { text: 'Nice combo!', sender: 'me' },
    { text: 'Thanks! What about you? Any projects?', sender: 'other' },
    { text: 'Yes, I\'m working on a chat application.', sender: 'me' },
    { text: 'Cool! What features are you adding?', sender: 'other' },
    { text: 'Real-time messaging, file sharing, and more.', sender: 'me' },
    { text: 'That sounds amazing!', sender: 'other' },
    { text: 'I\'m excited about it.', sender: 'me' },
    { text: 'Good luck with that!', sender: 'other' },
    { text: 'Thanks! Appreciate it.', sender: 'me' },
    { text: 'By the way, do you have any resources on hooks?', sender: 'other' },
    { text: 'Sure, I can share some links.', sender: 'me' },
    { text: 'That would be awesome.', sender: 'other' },
    { text: 'I\'ll send them over shortly.', sender: 'me' },
    { text: 'Great! Looking forward to it.', sender: 'other' },
    { text: 'Sent!', sender: 'me' },
    { text: 'Got it, thanks a lot!', sender: 'other' },
    { text: 'You\'re welcome!', sender: 'me' },
    { text: 'Talk to you later.', sender: 'other' },
    { text: 'Catch you later!', sender: 'me' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'me' }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex-1 bg-white shadow-md p-6 flex flex-col justify-between relative w-full max-h-screen">
      {/* Header (fixed at the top) */}
      <div className="flex-shrink-0 px-5 py-5 border-b">
      <div className='flex items-center gap-5'>
      <Avatar {...missingProperties}  src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
      <h2 className="text-2xl font-semibold  text-primary-dark">Ammar Mohammed</h2>
      </div>
      </div>
      {/* Scrollable message timeline */}
      <div className="flex-1 overflow-y-scroll mb-4 px-5">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-2 max-w-xs ${
              message.sender === 'me'
                ? 'ml-auto bg-primary text-white'
                : 'mr-auto bg-gray-light text-gray-dark'
            } rounded-lg`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Input Area (fixed at the bottom) */}
      <div className="flex-shrink-0">
        <div className="flex items-center space-x-2">
          <Input
            crossOrigin={undefined} type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border border-primary-dark focus:border-primary-dark"
            {...missingProperties}  />
          <Button {...missingProperties} onClick={handleSendMessage}  className="bg-primary hover:bg-primary-dark">
            Send
          </Button>
        </div>
      </div>

      {/* Menu Icon (only for non-static layouts) */}
      {!isStatic && (
        <IconButton {...missingProperties} 
          color="blue-gray"
          variant="text"
          onClick={toggleRightDrawer}
          className="absolute top-4 right-4 z-10 absoluteBtn focus:outline-none active:bg-transparent"
        >
          <HiMenu className="h-6 w-6 text-primary-dark" />
        </IconButton>
      )}
    </div>
  );
}
