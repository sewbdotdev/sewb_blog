import React, { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import styles from "./Markdown.module.css";
import Link from "next/link";
import Helpers from "utils/helpers";
type MarkdownProps = {
  content: string;
};

const Markdown: FunctionComponent<MarkdownProps> = (props) => {
  const { content } = props;
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize, rehypeHighlight]}
      components={{
        p: ({ node, ...props }) => <p className={styles.p} {...props} />,
        ul: ({ node, ...props }) => <ul className={styles.ul} {...props} />,
        h1: ({ node, ...props }) => <h1 className={styles.h1} {...props} />,
        h2: ({ node, ...props }) => <h2 className={styles.h2} {...props} />,
        a: ({ node, ...props }) =>
          props.href?.startsWith("/") ? (
            <Link href={props.href}>
              <a {...props} className={styles.a}>
                {props.children}
              </a>
            </Link>
          ) : (
            <a
              href={props.href}
              target="_blank"
              rel="noopener noreferrer"
              {...props}
              className={styles.a}
            >
              {props.children}
            </a>
          ),
        img: ({ node, ...props }) => (
          <div className="relative w-full" style={{ height: 600 }}>
            <Image
              src={Helpers.getImageURL(props.src ?? "")}
              alt={props.alt}
              layout="fill"
              priority
              className={`${props.className} text-center mx-auto`}
            />
          </div>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;
