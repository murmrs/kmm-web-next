import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"], // Add 'md' and 'mdx'
  // turbopack: {
  //   resolveExtensions: [
  //     ".mdx",
  //     ".md",
  //     ".tsx",
  //     ".ts",
  //     ".jsx",
  //     ".js",
  //     ".mjs",
  //     ".json",
  //   ],
  // },
  eslint: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "imagedelivery.net",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "kmm-test-images.s3.us-west-1.amazonaws.com",
      },
    ],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // You can add MDX options here if needed
    remarkPlugins: [
      // Without options
      ["remark-frontmatter"],
      ["remark-mdx-frontmatter"],
      // ["remark-mdx-frontmatter", { type: "yaml", marker: "---" }],
      // With options
      // ['remark-toc', { heading: 'The Table' }],
    ],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
