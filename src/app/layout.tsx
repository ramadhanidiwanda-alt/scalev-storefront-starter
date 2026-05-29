import type { Metadata } from "next";
import { Rubik, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AppProvider } from "@/components/providers/app-provider";

const rubik = Rubik({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Scalev Storefront - Modern E-commerce",
  description: "Modern e-commerce storefront powered by Scalev API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__ENV__ = ${JSON.stringify({
              NEXT_PUBLIC_SCALEV_API_BASE: process.env.NEXT_PUBLIC_SCALEV_API_BASE,
              NEXT_PUBLIC_SCALEV_STORE_ID: process.env.NEXT_PUBLIC_SCALEV_STORE_ID,
              NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY: process.env.NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY,
            })};`,
          }}
        />
        <AppProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
