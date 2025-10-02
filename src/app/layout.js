import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { DarkModeProvider } from "../../context/DarkModeContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "The Shecklist",
  description: "Discover honest album reviews, ratings, and insights on The Shecklist. Explore artists, albums, and share your own ratings with the community.",
  icons: {
    icon: "/The-Shecklist-Logo.svg",
  },
  keywords: [
    "music reviews",
    "album ratings",
    "artist reviews",
    "The Shecklist",
    "hip hop reviews",
    "rock reviews",
    "album critiques",
    "music blog",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} `}>
        <DarkModeProvider>
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}
