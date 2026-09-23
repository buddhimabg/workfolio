import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workfolio | Modern Job Discovery & Hiring Platform",
  description:
    "Post open roles, manage applicants, and apply for great careers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-8 text-center text-sm text-zinc-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>
              © {new Date().getFullYear()} Workfolio. Connecting top talent with
              leading companies.
            </p>
            <div className="flex gap-6">
              <span className="hover:text-zinc-700 dark:hover:text-zinc-300">
                Privacy
              </span>
              <span className="hover:text-zinc-700 dark:hover:text-zinc-300">
                Terms
              </span>
              <span className="hover:text-zinc-700 dark:hover:text-zinc-300">
                Support
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
