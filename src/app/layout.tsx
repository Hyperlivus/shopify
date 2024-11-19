import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import theme from "@/theme/theme";
import {ThemeProvider} from "@mui/material/styles";
import '../global-styles/global.css';
import CartProvider from "@/context/CartProvider";
import QueryProvider from "@/app/query";



export const metadata: Metadata = {
  title: "Shopify",
  description: "this not real shop",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
              <CartProvider>
                  <QueryProvider>
                      {children}
                  </QueryProvider>
              </CartProvider>
          </ThemeProvider>
      </AppRouterCacheProvider>
      </body>
    </html>
  );
}
