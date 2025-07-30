import { Footer } from "@/components/footer";
import Header from "@/components/header";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header showSearchBar={true} />
      {children}
      <Footer />
    </>
  );
}
