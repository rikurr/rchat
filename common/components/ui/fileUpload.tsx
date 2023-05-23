import { PropsWithChildren } from "react";
import { Button } from "./button";

type FileUploadButtonProps = PropsWithChildren<{
  setValue: (target: string) => void;
}>;

export const FileUploadButton = ({
  setValue,
  children,
}: FileUploadButtonProps) => {
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { files } = event.target;
      const file = files?.[0];
      if (!file) {
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        return;
      }
      setValue(URL.createObjectURL(file));
    } catch {
      console.error("error");
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
