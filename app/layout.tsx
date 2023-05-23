import "../styles/globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/features/auth/AuthProvider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "rchat",
  },
  description: "チャットアプリケーション",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <AuthProvider>
        <body className={cn("h-screen", inter.className)}>
          <main>{children}</main>
        </body>
      </AuthProvider>
    </html>
  );
}
