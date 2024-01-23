import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import Widgets from "@/components/Widgets";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="flex max-w-7xl mx-auto min-h-screen">
      <SideBar />
      <div className="w-full lg:mr-600  border border-gray-800 sm:ml-24 md:ml-60">
      <Header />
      {children}
      </div>
      {/* 3rd Section */}
      <div className="hidden lg:inline-flex mt-1`">
      <Widgets />
      </div>

      </div>
      </body>
    </html>
  );
}
