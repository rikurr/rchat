"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { initializeFirebaseApp } from "@/lib/firebase";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      initializeFirebaseApp();
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      await sendEmailVerification(userCredential.user);
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.dir(e);
      }
    }
  };

  return (
    <div className="max-w-sm sm:max-w-lg mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={() => (
              <FormItem>
                <FormLabel>ユーザーネーム</FormLabel>
                <FormControl>
                  <Input placeholder="" {...form.register("username")} />
                </FormControl>
                <FormDescription>
                  チャットルームで表示される名前です。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormDescription>
                  8文字以上のパスワードを入力してください。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">アカウント作成</Button>
        </form>
      </Form>
    </div>
  );
}
