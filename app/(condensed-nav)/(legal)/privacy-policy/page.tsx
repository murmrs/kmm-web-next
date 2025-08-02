import LegalRenderer from "@/components/legal-renderer";
import PrivacyPolicy, { frontmatter } from "@/content/privacy-policy.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Know My Menu",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalRenderer lastUpdated={frontmatter.last_updated}>
      <PrivacyPolicy />
    </LegalRenderer>
  );
}
