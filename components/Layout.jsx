import { Inter } from "next/font/google";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const Layout = ({ children }) => {
  return (
    <div
      className={`${inter.className} bg-[#F0EEED]`}
      suppressHydrationWarning={true}
    >
      <main className="main">
        <Nav />
        {children}
      </main>
    </div>
  );
};
