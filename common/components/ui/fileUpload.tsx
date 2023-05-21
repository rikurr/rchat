import { PropsWithChildren } from "react";
import { Button } from "./button";
import { useToast } from "@/common/hooks/use-toast";

type FileUploadButtonProps = PropsWithChildren<{
  setValue: (target: string) => void;
}>;

export const FileUploadButton = ({
  setValue,
  children,
}: FileUploadButtonProps) => {
  const { toast } = useToast();
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { files } = event.target;
      const file = files?.[0];
      if (!file) {
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "エラー",
          description:
            "画像サイズが大きすぎます。10MB以下の画像を使用してください",
        });
        return;
      }
      setValue(URL.createObjectURL(file));
    } catch {
      toast({
        title: "エラー",
        description: "ファイルアップロードに失敗しました",
      });
    }
  };
  return (
    <>
      <Button type="button" variant="outline">
        <label
          htmlFor="imageFile"
          className="w-full h-full grid place-content-center"
        >
          {children}
        </label>
      </Button>
      <input
        type="file"
        accept="image/*"
        id="imageFile"
        className="hidden"
        onChange={onChange}
      />
    </>
  );
};
