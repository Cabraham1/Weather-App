import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import theme from "./theme";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import QueryClientProvider from "../../utils/ReactQueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "Weather App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider>
        <html lang="en">
          <body className={poppins.className}>
            <Toaster position="top-center" />
            {children}
          </body>
        </html>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
