import { ThemeWrapper } from '@context/ThemeContext';
import './globals.css';
import { Noto_Sans } from 'next/font/google';

export const metadata = {
  title: 'Todo',
  description: 'Manage your day-to-day taksk',
  icons: {
    icon: '/todo.png',
    apple: '/todo.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/todo.png',
    },
  },
  manifest: '/manifest.json',
};

const noto = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto',
  fallback: ['system-ui', 'Helvetica Neue', 'Helvetica', 'Arial'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${noto.variable} font-noto`}>
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
