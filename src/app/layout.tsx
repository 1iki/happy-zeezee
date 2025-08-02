import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function LottieLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-pink-300">
      <DotLottieReact
        src="https://lottie.host/embed/3f4b13ee-8237-4d8e-bee3-dc378dcd2905/j8Gfgeo0Vz.lottie"
        loop
        autoplay
        style={{ width: 220, height: 220 }}
      />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
