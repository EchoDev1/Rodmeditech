import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "RodMeditech | State-of-the-Art Hospital Equipment Sales & Installation",
  description:
    "RodMeditech is a leading provider of hospital and medical equipment. We specialize in large-scale sales, installation, and maintenance of cutting-edge healthcare technology.",
  keywords: "hospital equipment, medical devices, healthcare technology, equipment installation, medical imaging, surgical equipment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
