import type { MDXComponents } from "mdx/types";
import Heading from "./components/typography/heading";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => <Heading className="text-2xl font-bold" {...props} />,
    ol: (props) => <ol className="list-decimal pl-4" {...props} />,
    li: (props) => <li className="mb-4 [&_p]:mb-2" {...props} />,
    // p: (props) => <p className="text-lg mb-4" {...props} />,
  };
}
