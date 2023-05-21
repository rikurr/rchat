"use client";

import { Toast, ToastProvider } from "@/common/components/ui/toast";

const ToasterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ToastProvider>
      {children}
      <Toast />
    </ToastProvider>
  );
};

export { ToasterProvider };
