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
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { useForm } from "react-hook-form";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useSnapshotMessages } from "@/features/chat/hooks/useSnapshotMessages";
import { sendMessage } from "@/features/chat/sendMessage";

const formSchema = z.object({
  message: z.string().min(2, {
    message: "ルーム名は2文字以上入力してください",
  }),
});

export default function Room() {
  const { id } = useParams();
  const { messages, isLoading } = useSnapshotMessages(id);
  const [isSendLoading, setIsSendLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSendLoading(true);
    try {
      const roomId = await sendMessage(id, values.message);
      form.reset();
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.dir(e);
      }
    }
    setIsSendLoading(false);
  };

  return (
    <div>
      <h1 className="text-xl font-bold">ルームの作成</h1>
      <Form {...form}>
        <form className="space-y-8 mt-4">
          <FormField
            control={form.control}
            name="message"
            render={() => (
              <FormItem>
                <FormLabel>ルーム名</FormLabel>
                <FormControl>
                  <textarea placeholder="" {...form.register("message")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            className="w-full"
          >
            {isSendLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            送信
          </Button>
        </form>
      </Form>
    </div>
  );
}
