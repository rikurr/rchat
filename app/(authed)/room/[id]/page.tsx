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

const formSchema = z.object({
  message: z.string(),
});

export default function Room() {
  const { id } = useParams();
  const { data: room, isLoading: isRoomLoading } = useGetRoom(id);
  const { messages, isLoading } = useSnapshotMessages(id);
  const [isSendLoading, setIsSendLoading] = useState(false);

  // スクロールの制御
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

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

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-xl font-bold">{room.name}</h1>
      </header>
      <main className="flex-1 overflow-y-scroll" ref={messagesEndRef}>
        <div className="p-4">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <footer className="px-6 py-4 bg-gray-50 border-t">
        <Form {...form}>
          <form className="flex items-center px-4 py-3">
            <FormField
              control={form.control}
              name="message"
              render={() => (
                <FormItem>
                  <FormControl>
                    <input
                      className="flex-1 border rounded py-2 px-3 mr-4 text-sm text-gray-700"
                      placeholder="コマンド+Enterで送信"
                      {...form.register("message")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              className="py-2 px-4 rounded text-white text-sm"
              disabled={!form.watch("message")}
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
