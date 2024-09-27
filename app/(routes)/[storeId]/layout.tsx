import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function StoreLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { storeId: string };
}>) {
  return (
    <>
      <Navbar params={params} />
      {children}
      <Footer />
    </>
  );
}