import type { MDXComponents } from "mdx/types";
import Heading from "./components/typography/heading";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => (
      <Heading level={2} className="text-2xl font-bold mb-4" {...props} />
    ),
    h2: (props) => <Heading className="text-2xl font-bold mb-4" {...props} />,
    ul: (props) => <ul className="list-disc pl-4 py-4" {...props} />,
    ol: (props) => <ol className="list-decimal pl-4" {...props} />,
    li: (props) => <li className="mb-4 [&_p]:mb-2 text-lg" {...props} />,
    p: (props) => <p className="text-lg mb-4" {...props} />,
    hr: (props) => <hr className="my-4 block" {...props} />,
  };
}
