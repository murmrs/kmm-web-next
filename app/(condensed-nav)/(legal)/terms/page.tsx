import LegalRenderer from "@/components/legal-renderer";
import Terms, { frontmatter } from "@/content/terms-and-conditions.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions for Know My Menu",
};

export default function TermsPage() {
  return (
    <LegalRenderer lastUpdated={frontmatter.last_updated}>
      <Terms />
    </LegalRenderer>
  );
}
