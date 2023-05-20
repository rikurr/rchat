import { initializeFirebaseApp } from "@/lib/firebase";
import "../styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "rchat",
    template: `%s | rchat`,
  },
  description: "チャットアプリ",
};

initializeFirebaseApp();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
