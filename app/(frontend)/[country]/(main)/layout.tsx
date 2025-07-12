import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export const metadata = {
  title: 'Five Iron Golf',
  description: 'Premium indoor golf experience'
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
