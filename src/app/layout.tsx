import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ReduxProvider from "@/components/layouts/ReduxProvider";
import { SocketProvider } from "@/components/layouts/SocketContext";
// import { GoogleReCaptchaProvider } from "@google-recaptcha/react";
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
  title: "TASKARU",
  description: "Task Management App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          {/* <GoogleReCaptchaProvider
            type="v3"
            siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          > */}
            <SocketProvider>
              {children}
            </SocketProvider>
          {/* </GoogleReCaptchaProvider> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
