import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBlock } from "@/components/cta-block";
import { Calendar, User } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

type Frontmatter = {
  title: string;
  published_by?: string;
  published_date?: string;
  excerpt?: string;
  image?: string;
  category?: string;
  related?: { title: string; slug: string }[];
};

function extractTocFromMdx(
  content: string
): { text: string; id: string; level: number }[] {
  // Extract headings (## and ###) for TOC
  const lines = content.split("\n");
  const toc: { text: string; id: string; level: number }[] = [];
  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      // Generate an id similar to how MDX/remark-slug would
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      toc.push({ text, id, level });
    }
  }
  return toc;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let Post,
    frontmatter: Frontmatter,
    mdxContent: string = "";
  try {
    const imported = await import(`@/blog-content/${slug}.mdx`);
    Post = imported.default;
    frontmatter = imported.frontmatter as Frontmatter;
    // Read raw MDX for TOC and related
    const filePath = path.join(process.cwd(), "blog-content", `${slug}.mdx`);
    mdxContent = fs.readFileSync(filePath, "utf8");
  } catch (e) {
    notFound();
  }

  // Fallbacks for frontmatter
  const {
    title = "Untitled",
    published_by,
    published_date,
    image,
    excerpt,
  } = frontmatter || {};

  // Table of Contents
  const toc = extractTocFromMdx(mdxContent);

  // Parse related articles from the end of the MDX file (if not in frontmatter)
  let relatedLinks: { title: string; slug: string }[] = [];
  if (frontmatter?.related) {
    relatedLinks = frontmatter.related;
  } else {
    // Try to extract from the MDX file itself
    try {
      const relatedSection = mdxContent.match(/## Related Articles([\s\S]*)/);
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
    <>
      {/* Hero Area - inside container, not full width, image is padding-less */}
      <div className="container mx-auto px-4 mt-8 mb-8">
        <div className="rounded-2xl shadow-lg bg-gradient-to-br from-primary/10 to-white/80 border border-primary/10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden p-0">
          {image && (
            <div className="flex-1 self-stretch aspect-video">
              <img
                src={image}
                alt={title}
                className="object-cover w-full h-full block"
              />
            </div>
          )}
          <div className="flex-1 flex flex-col gap-3 p-6 md:p-10">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
              {title}
            </h1>
            {excerpt && (
              <p className="text-lg text-muted-foreground mb-2 max-w-prose">
                {excerpt}
              </p>
            )}
            <div className="flex items-center gap-4 text-muted-foreground text-sm mb-2">
              {published_by && (
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {published_by}
                </span>
              )}
              {published_by && published_date && (
                <span className="mx-2">·</span>
              )}
              {published_date && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
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
      </div>

      {/* Blog Content + Table of Contents */}
      <main className="container mx-auto px-4 flex-1">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Table of Contents - sticky on desktop */}
          {toc.length > 0 && (
            <aside className="hidden md:block md:w-1/4 lg:w-1/5">
              <div className="sticky top-28">
                <div className="font-semibold text-primary mb-2 text-base">
                  On this page
                </div>
                <ul className="list-none pl-0 space-y-1 text-sm">
                  {toc.map((item) => (
                    <li
                      key={item.id}
                      className={item.level === 2 ? "ml-0" : "ml-4"}
                    >
                      <a
                        href={`#${item.id}`}
                        className="hover:underline text-black/80"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          {/* Main Article */}
          <div
            className={cn(
              "w-full",
              toc.length > 0 ? "md:w-3/4 lg:w-4/5" : "md:w-full"
            )}
          >
            <article className="prose prose-neutral max-w-none w-full mx-auto">
              <Post />
            </article>

            {/* Related Articles */}
            {relatedLinks.length > 0 && (
              <section className="my-12">
                <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
                <ul className="space-y-2">
                  {relatedLinks.map((rel) => (
                    <li key={rel.slug}>
                      <Link
                        href={`/blog/${rel.slug}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {rel.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </main>

      {/* CTA - full width, outside container */}
      <div className="w-full mt-16">
        <CtaBlock
          className="-mb-12"
          heading="Your food, presented just the way you want it."
          text="Help your customers answer the question, 'What's on the menu?'"
          buttonText="Get Started"
          buttonLink="/list-your-restaurant"
        />
      </div>
    </>
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
