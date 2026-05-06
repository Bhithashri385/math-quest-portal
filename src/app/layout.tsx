import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MathMentor AI (Grades 3–5)",
  description: "Web MVP: parent login + child profiles"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

