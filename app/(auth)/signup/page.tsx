"use client";

import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/ui/avatar";
import { useForm } from "react-hook-form";

import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileUploadButton } from "@/common/components/ui/fileUpload";
import { signupUser } from '@/features/auth/signupUser';

const formSchema = z.object({
  displayName: z.string().min(2, {
    message: "ユーザー名は2文字以上入力してください",
  }),
  email: z.string().email({
    message: "メールアドレスを入力してください",
  }),
  password: z.string().min(8, {
    message: "パスワードは8文字以上入力してください",
  }),
});

export default function SignUp() {
  const { push } = useRouter();
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await signupUser({
        displayName: values.displayName,
        email: values.email,
        password: values.password,
        photoURL
      })
      form.reset();
      push("dashboard");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.dir(e);
      }
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h1 className="text-xl font-bold">アカウント作成</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <FormField
            control={form.control}
            name="displayName"
            render={() => (
              <FormItem>
                <FormLabel>ユーザーネーム</FormLabel>
                <FormControl>
                  <Input placeholder="" {...form.register("displayName")} />
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
                  <Input
                    placeholder=""
                    type="password"
                    {...form.register("password")}
                  />
                </FormControl>
                <FormDescription>
                  8文字以上のパスワードを入力してください。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-2">
            プロフィール画像
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src={photoURL ?? ""} />
                <AvatarFallback>未設定</AvatarFallback>
              </Avatar>
              <FileUploadButton setValue={setPhotoURL}>
                プロフィール画像のアップロード
              </FileUploadButton>
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            アカウント作成
          </Button>
        </form>
      </Form>
      <hr className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
      <Button
        className="w-full"
        variant="secondary"
        onClick={() => push("/login")}
      >
        ログインはこちら
      </Button>
    </div>
  );
}
