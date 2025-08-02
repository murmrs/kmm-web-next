import type { MDXComponents } from "mdx/types";
import Heading from "./components/typography/heading";

// Simple slugify function for heading text
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getHeadingText(children: any): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getHeadingText).join(" ");
  if (children && typeof children === "object" && "props" in children) {
    return getHeadingText(children.props.children);
  }
  return "";
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  // Helper to render a visually hidden anchor for heading id
  function HiddenAnchor({ id }: { id: string }) {
    return (
      <span
        id={id}
        style={{
          position: "absolute",
          left: 0,
          top: "-100px",
          height: 1,
          width: 1,
          overflow: "hidden",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
    );
  }

  return {
    ...components,
    h1: (props) => {
      const text = getHeadingText(props.children);
      const id = props.id || slugify(text);
      return (
        <Heading
          level={2}
          className="text-2xl font-bold mb-4 relative"
          {...props}
        >
          <HiddenAnchor id={id} />
          {props.children}
        </Heading>
      );
    },
    h2: (props) => {
      const text = getHeadingText(props.children);
      const id = props.id || slugify(text);
      return (
        <Heading className="text-2xl font-bold mb-4 relative" {...props}>
          <HiddenAnchor id={id} />
          {props.children}
        </Heading>
      );
    },
    ul: (props) => <ul className="list-disc pl-4 py-4" {...props} />,
    ol: (props) => <ol className="list-decimal pl-4" {...props} />,
    li: (props) => <li className="mb-4 [&_p]:mb-2 text-lg" {...props} />,
    p: (props) => <p className="text-lg mb-4" {...props} />,
    hr: (props) => <hr className="my-4 block" {...props} />,
  };
}
