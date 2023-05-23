import { FC } from "react";
import { MessageInUserDocument } from "@/schema/roomSchema";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/ui/avatar";

type Props = {
  message: MessageInUserDocument;
};

export const Message: FC<Props> = ({ message }) => {
  return (
    <div className="flex items-start mb-4 text-sm gap-2">
      <Avatar>
        <AvatarImage src={message.user.photoURL ?? ""} />
        <AvatarFallback>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            className="lucide lucide-user-2"
          >
            <circle cx="12" cy="8" r="5"></circle>
            <path d="M20 21a8 8 0 1 0-16 0"></path>
          </svg>
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 overflow-hidden">
        <div>
          <span className="font-bold">{message.user.displayName}</span>
          <span className="text-gray-500 text-xs ml-2">
            {new Date(message.createdAt).toLocaleTimeString()}
          </span>
        </div>
        <p className="text-black leading-normal">{message.text}</p>
      </div>
    </div>
  );
};
