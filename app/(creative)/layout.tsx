import Navbar from '@/components/navbar';

export default function CreativeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-24">{children}</main>
    </>
  );
}
