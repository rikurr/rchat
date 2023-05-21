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
import { loginUser } from "@/features/auth/loginUser";

const formSchema = z.object({
  email: z.string().email({
    message: "メールアドレスを入力してください",
  }),
  password: z.string().min(8, {
    message: "パスワードは8文字以上入力してください",
  }),
});

export default function SignUp() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await loginUser({
        email: values.email,
        password: values.password,
      });
      form.reset();
      push("rooms");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.dir(e);
      }
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h1 className="text-xl font-bold">ログイン</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <FormField
            control={form.control}
            name="email"
            render={() => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="" {...form.register("email")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={() => (
              <FormItem>
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <Input placeholder="" {...form.register("password")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            ログイン
          </Button>
        </form>
      </Form>
      <hr className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
      <Button
        className="w-full"
        variant="secondary"
        onClick={() => push("/signup")}
      >
        新規作成はこちら
      </Button>
    </div>
  );
}
