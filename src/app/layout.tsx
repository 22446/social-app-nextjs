'use client'

import Navbar from "./_components/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
import Usercontextme from "@/_contexts/Usercontextme";
import { Toaster } from "react-hot-toast";
import Authcontextme from "@/_contexts/Authcontextme";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const queryClient = new QueryClient();
export default function RootLayout({ 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Authcontextme>
      <QueryClientProvider client={queryClient}>
        <Usercontextme>
          <Navbar />
          {children}
          <Toaster/>
          </Usercontextme>
          </QueryClientProvider>
          </Authcontextme>
      </body>
    </html>
  );
}
