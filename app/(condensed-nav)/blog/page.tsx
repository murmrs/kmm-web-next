import fs from "fs";
import path from "path";
import { BlogList } from "./blog-list";
import { PageHero } from "@/components/page-hero";
import { Hero } from "@/components/hero";
import { MarqueeBanner } from "@/components/marquee-banner";
import { RestaurantList } from "@/components/restaurant-list";
import { TagCloud } from "@/components/tag-cloud";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search-bar";
import Heading from "@/components/typography/heading";
import Header from "@/components/header";
import HeadingIntroText from "@/components/heading-intro-text";
import Paragraph from "@/components/typography/paragraph";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
type Frontmatter = {
  title: string;
  published_by?: string;
  published_date?: string;
  excerpt?: string;
  image?: string;
  category?: string;
  related?: { title: string; slug: string }[];
};

type BlogPost = {
  slug: string;
  frontmatter: Frontmatter;
};

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogDir = path.join(process.cwd(), "blog-content");
    const files = fs.readdirSync(blogDir);

    const posts: BlogPost[] = [];

    for (const file of files) {
      if (file.endsWith(".mdx")) {
        const slug = file.replace(/\.mdx$/, "");
        try {
          const imported = await import(`@/blog-content/${slug}.mdx`);
          posts.push({
            slug,
            frontmatter: imported.frontmatter as Frontmatter,
          });
        } catch (e) {
          console.error(`Error loading ${slug}:`, e);
        }
      }
    }

    // Sort by published date (newest first)
    return posts.sort((a, b) => {
      const dateA = a.frontmatter.published_date
        ? new Date(a.frontmatter.published_date).getTime()
        : 0;
      const dateB = b.frontmatter.published_date
        ? new Date(b.frontmatter.published_date).getTime()
        : 0;
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageHero
        heading="Restaurant Insights & Tips"
        image={{
          src: "/or-hakim-S2Eql9vHN3o-unsplash.jpg",
          alt: "Restaurant Insights & Tips",
          position: "center 50%",
        }}
        description="Discover the latest trends, strategies, and insights to help your restaurant thrive in today's competitive market."
      />

      <div className="flex-1">
        <BlogList posts={posts} />
      </div>
    </>
  );
}
