import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBlock } from "@/components/cta-block";

type Frontmatter = {
  title: string;
  published_by?: string;
  published_date?: string;
  image?: string;
  related?: { title: string; slug: string }[];
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let Post, frontmatter: Frontmatter;
  try {
    const imported = await import(`@/blog-content/${slug}.mdx`);
    Post = imported.default;
    frontmatter = imported.frontmatter as Frontmatter;
  } catch (e) {
    notFound();
  }

  // Fallbacks for frontmatter
  const {
    title = "Untitled",
    published_by,
    published_date,
    image,
  } = frontmatter || {};

  // Parse related articles from the end of the MDX file (if not in frontmatter)
  let relatedLinks: { title: string; slug: string }[] = [];
  if (frontmatter?.related) {
    relatedLinks = frontmatter.related;
  } else {
    // Try to extract from the MDX file itself
    try {
      const filePath = path.join(process.cwd(), "blog-content", `${slug}.mdx`);
      const content = fs.readFileSync(filePath, "utf8");
      const relatedSection = content.match(/## Related Articles([\s\S]*)/);
      if (relatedSection) {
        const linkRegex = /\[([^\]]+)\]\(\/blog\/([^)]+)\)/g;
        let match;
        while ((match = linkRegex.exec(relatedSection[1]))) {
          relatedLinks.push({ title: match[1], slug: match[2] });
        }
      }
    } catch (e) {
      // ignore
    }
  }

  return (
    <main>
      {/* Hero Area */}
      <div className="relative rounded-lg overflow-hidden mb-8 shadow-lg bg-white">
        {image && (
          <div className="w-full h-64 relative">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        )}
        <div className="absolute top-0 left-0 w-full h-64 flex flex-col justify-end p-8 z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            {title}
          </h1>
          <div className="mt-2 text-white/90 text-sm">
            {published_by && <span>By {published_by}</span>}
            {published_by && published_date && <span className="mx-2">·</span>}
            {published_date && (
              <span>
                {new Date(published_date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <article className="container space-y-4">
        <Post />
      </article>

      {/* Related Articles */}
      {relatedLinks.length > 0 && (
        <section className="container my-12">
          <h2 className="text-xl font-semibold mb-4">Related Articles</h2>
          <ul className="space-y-2">
            {relatedLinks.map((rel) => (
              <li key={rel.slug}>
                <Link
                  href={`/blog/${rel.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {rel.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <CtaBlock
        className="-mb-12"
        heading="Ready to get started?"
        text="Get started with Know My Menu"
        buttonText="Get Started"
        buttonLink="/"
      />
    </main>
  );
}

export function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "blog-content"));
  const slugs = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
  return slugs;
}

export const dynamicParams = false;
