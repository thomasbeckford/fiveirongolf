import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  return {
    title: `Five Iron Golf - ${country}`,
    description: `Find locations of Five Iron Golf`,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
