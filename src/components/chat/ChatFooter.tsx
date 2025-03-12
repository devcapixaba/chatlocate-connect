
import { MessageInput } from "./MessageInput";

interface ChatFooterProps {
  onSendMessage: (content: string) => void;
}

export const ChatFooter = ({ onSendMessage }: ChatFooterProps) => {
  return (
    <MessageInput onSendMessage={onSendMessage} />
  );
};
