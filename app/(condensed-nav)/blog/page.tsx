import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

// Blog post data structure
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  featured?: boolean;
  image?: string;
}

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    id: "example-blog",
    title:
      "The Future of Restaurant Technology: AI-Powered Menu Recommendations",
    excerpt:
      "Discover how artificial intelligence is revolutionizing the way restaurants create and optimize their menus, leading to better customer satisfaction and increased revenue.",
    category: "Technology",
    readTime: "8 min read",
    publishDate: "2024-01-15",
    featured: true,
    image: "/blog/ai-restaurant-tech.jpg",
  },
  {
    id: "example-blog-2",
    title: "Seasonal Menu Planning: A Complete Guide for Restaurant Owners",
    excerpt:
      "Learn the best practices for creating seasonal menus that delight customers while maximizing profitability and reducing food waste.",
    category: "Menu Planning",
    readTime: "12 min read",
    publishDate: "2024-01-10",
  },
  {
    id: "customer-preferences",
    title: "Understanding Customer Preferences: Data-Driven Menu Optimization",
    excerpt:
      "How to use customer data and analytics to create menus that perfectly match your target audience's tastes and dietary needs.",
    category: "Analytics",
    readTime: "10 min read",
    publishDate: "2024-01-08",
  },
  {
    id: "sustainability",
    title:
      "Sustainable Menu Design: Eco-Friendly Practices for Modern Restaurants",
    excerpt:
      "Explore sustainable practices that can be integrated into your menu planning to reduce environmental impact while attracting eco-conscious customers.",
    category: "Sustainability",
    readTime: "6 min read",
    publishDate: "2024-01-05",
  },
  {
    id: "pricing-strategies",
    title: "Strategic Menu Pricing: Balancing Profitability and Customer Value",
    excerpt:
      "Master the art of menu pricing with proven strategies that maximize profit margins while maintaining customer satisfaction and loyalty.",
    category: "Business Strategy",
    readTime: "9 min read",
    publishDate: "2024-01-03",
  },
  {
    id: "digital-menus",
    title:
      "Digital Menu Solutions: Enhancing Customer Experience in the Digital Age",
    excerpt:
      "From QR codes to interactive displays, discover how digital menu solutions are transforming the dining experience and streamlining operations.",
    category: "Technology",
    readTime: "7 min read",
    publishDate: "2024-01-01",
  },
];

// Get featured post
const featuredPost = blogPosts.find((post) => post.featured);

// Group posts by category
const postsByCategory = blogPosts.reduce((acc, post) => {
  if (!post.featured) {
    // Exclude featured post from category lists
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
  }
  return acc;
}, {} as Record<string, BlogPost[]>);

// Category colors
const categoryColors: Record<string, string> = {
  Technology: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "Menu Planning":
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Analytics:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  Sustainability:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  "Business Strategy":
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background -my-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Restaurant Insights & Tips
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover the latest trends, strategies, and best practices for
              restaurant success. From menu optimization to customer experience,
              we've got you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {Object.keys(categoryColors).map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="text-sm px-4 py-2"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post Section */}
      {featuredPost && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Featured Article
              </h2>
              <p className="text-muted-foreground">
                Our most popular and insightful content
              </p>
            </div>

            <div className="bg-card rounded-2xl overflow-hidden shadow-lg border">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                  <div className="absolute inset-0 bg-muted" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Tag className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                      <p className="text-muted-foreground">Featured Image</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <Badge
                    variant="secondary"
                    className={`w-fit mb-4 ${
                      categoryColors[featuredPost.category]
                    }`}
                  >
                    {featuredPost.category}
                  </Badge>

                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(featuredPost.publishDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>

                  <Link href={`/blog/${featuredPost.id}`}>
                    <Button className="w-fit group">
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categorized Posts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              All Articles
            </h2>
            <p className="text-muted-foreground">
              Browse our latest insights by category
            </p>
          </div>

          <div className="space-y-16">
            {Object.entries(postsByCategory).map(([category, posts]) => (
              <div key={category}>
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-2xl font-bold text-foreground">
                    {category}
                  </h3>
                  <div className="flex-1 h-px bg-border" />
                  <Badge variant="outline" className="text-sm">
                    {posts.length} articles
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-card rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-shadow"
                    >
                      <div className="h-48 bg-muted relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center p-4">
                            <Tag className="w-8 h-8 text-muted-foreground/60 mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground">
                              Article Image
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <Badge
                          variant="secondary"
                          className={`w-fit mb-3 text-xs ${
                            categoryColors[post.category]
                          }`}
                        >
                          {post.category}
                        </Badge>

                        <h4 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                          {post.title}
                        </h4>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(post.publishDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <Link href={`/blog/${post.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full group"
                          >
                            Read More
                            <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get the latest restaurant insights, tips, and trends delivered
            directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-foreground bg-background/10 border border-background/20 focus:outline-none focus:ring-2 focus:ring-background/50"
            />
            <Button variant="secondary" className="whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
