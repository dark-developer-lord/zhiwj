import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import ChatbotWidget from "@/components/ChatbotWidget";

const inter = Inter({ 
  subsets: ["latin", "cyrillic"], 
  variable: "--font-inter" 
});

const playfair = Playfair_Display({ 
  subsets: ["latin", "cyrillic"], 
  variable: "--font-playfair" 
});

export const metadata: Metadata = {
  title: "ZHIWJ | Premium Apparel",
  description: "Exclusive clothing collection. Tamaddoon, Metomorfoz, Bahor.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="ru">
        <body className={`${inter.variable} ${playfair.variable} font-sans bg-background text-foreground antialiased`}>
          <Header />
          <main className="min-h-screen pt-20">{children}</main>
          <ChatbotWidget />
        </body>
      </html>
    </ClerkProvider>
  );
}
