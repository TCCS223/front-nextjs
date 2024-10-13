import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./context/UserContext";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
    title: "Urban",
    description: "Estética Automotiva",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-br">
            <UserProvider>
                <body className={inter.className}>{children}</body>
            </UserProvider>
        </html>
    );
}
