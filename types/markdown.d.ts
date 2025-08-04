interface Frontmatter {
  [key: string]: string;
}

declare module "*.mdx" {
  export { default } from "*.mdx";
  export const frontmatter: Frontmatter;
}
