"use client";

import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/common/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/common/components/ui/form";
import { useForm } from "react-hook-form";
import { FirebaseError } from "firebase/app";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSnapshotMessages } from "@/features/chat/hooks/useSnapshotMessages";
import { sendMessage } from "@/features/chat/utils/sendMessage";
import { useGetRoom } from "@/features/chat/hooks/useGetRoom";
import { Message } from "./components/message";
import { MessageInUserDocument } from "@/schema/roomSchema";

const formSchema = z.object({
  message: z.string(),
});

export default function Room() {
  const { id } = useParams();
  const { data: room, isLoading: isRoomLoading } = useGetRoom(id);
  const { messages, isLoading } = useSnapshotMessages(id);
  const [isSendLoading, setIsSendLoading] = useState(false);

  // 日本語入力の監視
  const [composing, setComposition] = useState(false);
  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);

  // スクロールの制御
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: ""
    }
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const isMac = navigator.userAgentData.platform.includes("macOS");
    const shortcutPressed = isMac ? event.metaKey : event.ctrlKey;

    if (event.key == "Enter" && composing) {
      event.preventDefault();
      return;
    }
    if (shortcutPressed && event.key === "Enter") {
      form.handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSendLoading(true);
    try {
      await sendMessage(id, values.message);
      form.reset();
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.dir(e);
      }
    }
    setIsSendLoading(false);
  };

  if (isRoomLoading || isLoading) return <div>loading...</div>;

  if (!room) return <div>not found</div>;

  function groupByDate(messages: MessageInUserDocument[]) {
    return messages.reduce<{ [date: string]: MessageInUserDocument[] }>(
      (groups, message) => {
        const date = new Date(message.createdAt)
        const formattedDate = new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
        if (!groups[formattedDate]) {
          groups[formattedDate] = [];
        }
        groups[formattedDate].push(message);
        return groups;
      },
      {},
    );
  }
  const groupedMessages = groupByDate(messages);
  const dates = Object.keys(groupedMessages).sort();

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-xl font-bold">{room.name}</h1>
      </header>
      <main className="flex-1 overflow-y-scroll">
        <div className="p-4">
          {dates.map((date) => (
            <div key={date}>
              <h2 className="text-gray-600 text-sm">
                {new Date(date).toLocaleDateString()}
              </h2>
              {groupedMessages[date].map((message) => (
                <Message key={message.id} message={message} />
              ))}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <footer className="px-6 py-4 bg-gray-50 border-t">
        <Form {...form}>
          <form
            className="flex px-4 py-3 gap-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="message"
              render={() => (
                <FormItem className="flex-1">
                  <FormControl>
                    <textarea
                      className="resize-none w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      placeholder="コマンド+Enterで送信"
                      onKeyDown={handleKeyDown}
                      onCompositionStart={startComposition}
                      onCompositionEnd={endComposition}
                      {...form.register("message")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="py-2 px-4 rounded text-white text-sm"
              disabled={!form.watch("message").trim()}
            >
              {isSendLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              送信
            </Button>
          </form>
        </Form>
      </footer>
    </>
  );
}
