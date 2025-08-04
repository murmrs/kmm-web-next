"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowRight, Calendar, Filter, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

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

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get unique categories
  const categories = useMemo(() => {
    const cats = posts
      .map((post) => post.frontmatter.category)
      .filter(Boolean) as string[];
    return ["all", ...Array.from(new Set(cats))];
  }, [posts]);

  // Filter posts by category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") return posts;
    return posts.filter(
      (post) => post.frontmatter.category === selectedCategory
    );
  }, [posts, selectedCategory]);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Filter by Category</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredPosts.map((post) => (
          <Card
            key={post.slug}
            className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              {/* Image */}
              {post.frontmatter.image && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.frontmatter.image}
                    alt={post.frontmatter.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              )}

              <CardHeader className="pb-3">
                {/* Category Badge */}
                {post.frontmatter.category && (
                  <Badge variant="secondary" className="w-fit mb-2">
                    {post.frontmatter.category}
                  </Badge>
                )}

                {/* Title */}
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  {post.frontmatter.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pb-3">
                {/* Excerpt */}
                <CardDescription className="text-sm leading-relaxed">
                  {post.frontmatter.excerpt}
                </CardDescription>
              </CardContent>

              <CardFooter className="pt-0">
                <div className="flex items-center justify-between w-full">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {post.frontmatter.published_by && (
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{post.frontmatter.published_by}</span>
                      </div>
                    )}
                    {post.frontmatter.published_date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {format(
                            new Date(post.frontmatter.published_date),
                            "MMM d, yyyy"
                          )}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Read More Arrow */}
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">No posts found</h3>
          <p className="text-muted-foreground mb-4">
            {selectedCategory === "all"
              ? "No blog posts available yet."
              : `No posts found in the "${selectedCategory}" category.`}
          </p>
          {selectedCategory !== "all" && (
            <Button
              variant="outline"
              onClick={() => setSelectedCategory("all")}
            >
              View all posts
            </Button>
          )}
        </div>
      )}

      {/* Newsletter Signup */}
      {/* <div className="hidden sm:block bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8 text-center mt-auto">
        <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
        <p className="text-muted-foreground mb-4 max-w-md mx-auto">
          Get the latest restaurant insights and tips delivered to your inbox.
        </p>
        <div className="flex gap-2 w-full max-w-md mx-auto mb-4">
          <Input
            placeholder="Enter your email"
            className="w-full bg-white h-auto border-none"
          />
          <Button size="lg">Subscribe to Newsletter</Button>
        </div>
      </div> */}
    </main>
  );
}
