import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({ 
  subsets: ['latin'],
  display: 'swap',
});

export default function WorkshopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen bg-white ${robotoMono.className}`}>
      {children}
    </div>
  );
}