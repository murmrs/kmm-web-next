import LegalRenderer from "@/components/legal-renderer";
import Terms, { frontmatter } from "@/content/terms-and-conditions.mdx";

export default function TermsPage() {
  return (
    <LegalRenderer lastUpdated={frontmatter.last_updated}>
      <Terms />
    </LegalRenderer>
  );
}
