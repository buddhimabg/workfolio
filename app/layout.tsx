import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { QueryProvider } from "@/components/providers/QueryProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jobly | Find the job that fits your life",
    template: "Jobly | %s",
  },
  description:
    "Discover opportunities, grow your career, and build the future you deserve with Jobly.",
  openGraph: {
    title: "Jobly | Find the job that fits your life",
    description:
      "Discover opportunities, grow your career, and build the future you deserve with Jobly.",
    siteName: "Jobly",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobly | Find the job that fits your life",
    description:
      "Discover opportunities, grow your career, and build the future you deserve with Jobly.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-bg text-text-dark font-sans antialiased">
        <QueryProvider>
          <Navbar />
          <div className="flex flex-1 w-full max-w-[1600px] mx-auto">
            <Sidebar />
            <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
