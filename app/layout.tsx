import type { Metadata } from "next";
// Font
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Alert
import { AlertProvider } from "@/contexts/alert-context";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "JudgeTheBeer - 专业啤酒品鉴",
  description: "从外观、香气、味道、口感多维度品鉴一杯啤酒",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <AlertProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col pt-[8vh]">{children}</main>
            <Footer />
          </div>
        </AlertProvider>
      </body>
    </html>
  );
}