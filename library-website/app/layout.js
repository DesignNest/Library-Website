
import "./globals.css";


export const metadata = {
  title: "Library Website",
  description: "Library Website By Mustansir",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
