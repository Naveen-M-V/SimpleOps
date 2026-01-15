import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SimpleOps",
  description: "No More Excel and WhatsApp for your small business operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
