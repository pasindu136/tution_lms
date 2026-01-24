import '@/styles/globals.css';
import { Inter } from "next/font/google";
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "APEX Institute - Educational Platform",
    description: "Sri Lanka's Premium Learning Management System",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={inter.className}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
