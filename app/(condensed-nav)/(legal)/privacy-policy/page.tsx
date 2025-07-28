import LegalRenderer from "@/components/legal-renderer";
import PrivacyPolicy, { frontmatter } from "@/content/privacy-policy.mdx";

export default function PrivacyPolicyPage() {
  return (
    <LegalRenderer lastUpdated={frontmatter.last_updated}>
      <PrivacyPolicy />
    </LegalRenderer>
  );
}
