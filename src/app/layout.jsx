import '../styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'LMS Portal',
    description: 'Learning Management System for Online Education',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-slate-900 text-white min-h-screen`}>{children}</body>
        </html>
    );
}
