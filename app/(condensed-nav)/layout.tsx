import { Footer } from "@/components/footer";
import HeaderV2 from "@/components/header-v2";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderV2 />
      {children}
      <Footer />
    </>
  );
}
