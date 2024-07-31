export const metadata = {
  title: "GHMZA",
  description: "Generated by Next.js",
};
import "../Style/global.css";

import NavBar from "@/components/NavBar/NavBar";
import "../Style/global.css";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";
import { ReduxProviders } from "@/redux/Providers";
import Script from "next/script";
import CursorAnimation from "@/components/CursorAnimation/CursorAnimation";
import { Suspense } from "react";
import LoadingScreen from "@/components/LoadingScreen";

export default function RootLayout({ children }) {
  return (
    <html className="scroll-smooth ">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Script
        defer
        data-domain="ghmza-web.vercel.app"
        src="https://plausible.io/js/script.js"
      ></Script>
      <body>
        <LoadingScreen />
        <Suspense>
          <ReduxProviders>
           <CursorAnimation />
            <NavBar />
            {children}
            <Footer />
          </ReduxProviders>
        </Suspense>
      </body>
    </html>
  );
}