"use client";

import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
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
import { useRouter } from "next/navigation";
import { createRoom } from "@/features/chat/utils/createRoom";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "ルーム名は1文字以上入力してください",
  }),
});

export default function RoomCreate() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const roomId = await createRoom(values.name);
      form.reset();
      push(`/room/${roomId}`);
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.dir(e);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center py-10 px-4 h-full">
      <div className="max-w-sm w-full">
        <h1 className="text-xl font-bold">ルームの作成</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={() => (
                <FormItem>
                  <FormLabel>ルーム名</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...form.register("name")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              作成
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
