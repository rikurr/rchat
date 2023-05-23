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
import { editUserProfile, signupUser } from "@/features/auth/postUser";
import { useAuthContext } from "@/features/auth/AuthProvider";

const formSchema = z.object({
  displayName: z.string().min(2, {
    message: "ユーザー名は2文字以上入力してください",
  }),
});

export default function SignUp() {
  const { push } = useRouter();
  const { user } = useAuthContext();

  const [photoURL, setPhotoURL] = useState<string | null>(
    user?.photoURL ?? null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: user?.displayName ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await editUserProfile({
        displayName: values.displayName,
        photoURL,
      });
      form.reset();
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.dir(e);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-sm sm:max-w-lg w-full mx-auto py-10 px-4 h-full">
      <h1 className="text-xl font-bold">プロフィールの編集</h1>
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

          <div className="grid gap-2">
            プロフィール画像
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src={photoURL ?? ""} />
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
              <FileUploadButton setValue={setPhotoURL}>
                プロフィール画像のアップロード
              </FileUploadButton>
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            更新
          </Button>
        </form>
      </Form>
    </div>
  );
}
