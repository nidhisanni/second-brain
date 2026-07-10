import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { DocumentProvider } from "@/context/DocumentContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Second Brain",
  description: "AI-powered memory search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <DocumentProvider>
            {children}
          </DocumentProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}