import "./globals.css";
import type { Metadata } from "next";
import LayoutShell from "@/components/LayoutShell";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Teacher Management",
  description: "Teacher management portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutShell>{children}</LayoutShell>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
