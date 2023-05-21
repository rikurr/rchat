import "../styles/globals.css";
import { Inter } from "next/font/google";
import { ToasterProvider } from "@/common/providers/ToasterProvider";
import { AuthProvider } from "@/features/auth/AuthProvider";
import { Header } from "../common/layouts/Header";
import { cn } from "@/lib/utils";
import { AuthGuard } from "@/features/auth/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "rchat",
    template: `%s | rchat`,
  },
  description: "チャットアプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <AuthProvider>
        <ToasterProvider>
          <body className={cn("h-screen", inter.className)}>
            <Header />
            <AuthGuard>
              {children}
            </AuthGuard>
          </body>
        </ToasterProvider>
      </AuthProvider>
    </html>
  );
}
