import MenuSidebar from '@components/menu/menuSidebar';
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
        <div className="fixed top-0 bottom-0 gap-2 flex p-4 w-full">
          <MenuSidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
