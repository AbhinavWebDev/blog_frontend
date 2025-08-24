import Navbar from "@/components/Navbar";
import "./globals.css";



export const metadata = {
  title: "Blog",
  description: "India's Number One Blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className='min-h-screen bg-gray-50'
      >
        <Navbar />
        <main className="max-w-5xl max-auto p-6">

          {children}
        </main>

      </body>
    </html>
  );
}
