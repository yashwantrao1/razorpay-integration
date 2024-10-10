
import localFont from "next/font/local";
import "./globals.css";






export default function RootLayout({ children, pageProps  }) {


  
  return (
    <html lang="en">
      <head>
        <script async src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
