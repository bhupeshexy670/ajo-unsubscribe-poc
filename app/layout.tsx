import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AJO Unsubscribe POC",
  description: "Adobe Journey Optimizer One-Click Unsubscribe Test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}