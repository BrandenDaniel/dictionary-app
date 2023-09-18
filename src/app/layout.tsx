import type { Metadata } from "next";
import { inter } from "./fonts";
import Nav from "@/components/Nav";
import "../sass/main.scss";
import FontFamilyContextProvider from "@/contexts/font-family-context";
import WordContentContextProvider from "@/contexts/word-content-context";

export const metadata: Metadata = {
  title: "Dictionary App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <FontFamilyContextProvider>
            <WordContentContextProvider>
              <Nav />
              <main>{children}</main>
            </WordContentContextProvider>
          </FontFamilyContextProvider>
        </div>
      </body>
    </html>
  );
}
