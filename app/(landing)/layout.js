
import { Inter } from "next/font/google";
import "../../app/globals.css";

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes';
import SideBar from "@/components/SideBar";
import Widgets from "@/components/Widgets";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {

  return (
    <ClerkProvider
    appearance={{ baseTheme: dark }}
     >
    <html lang="en" >
      <body className={inter.className}>
      <div className="flex max-w-7xl mx-auto min-h-screen">
        <SideBar />
        {children}
        <div className="hidden lg:inline-flex max-w-96">
          <Widgets />
        </div>
      </div>
      </body>
    </html>
    </ClerkProvider>
  );
}
