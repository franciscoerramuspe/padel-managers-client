import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import FloatingSupport from "@/components/support/FloatingSupport"; 
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Padel Managers",
  description: "Sistema de gestión para clubes de padel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
} 