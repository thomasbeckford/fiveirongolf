import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Five Iron Golf',
  description: 'Premium indoor golf experience'
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-16">{children}</div>
      <Footer />
    </>
  );
}
