import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jasace — Where AEC Pros Find Projects",
  description:
    "Jasace connects architects, contractors, and engineers with new projects and opportunities in the AEC industry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${inter.className} bg-navy-900 text-white`}>
        {children}
      </body>
    </html>
  );
}
