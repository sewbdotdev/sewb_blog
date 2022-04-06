import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import React, { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import styles from './Markdown.module.css';
import Link from 'next/link';
import Helpers from 'utils/helpers';

type MarkdownProps = {
    content: string;
};

const DataCyPrefix = 'MarkdownComponent';

const Markdown: FunctionComponent<MarkdownProps> = (props) => {
    const { content } = props;
    return (
        <ReactMarkdown
            components={{
                p: ({ node, ...props }) => (
                    <p className={styles.p} {...props} data-cy={`${DataCyPrefix}-p`} />
                ),
                ul: ({ node, ...props }) => (
                    <ul className={styles.ul} {...props} data-cy={`${DataCyPrefix}-ul`} />
                ),
                h1: ({ node, ...props }) => (
                    <h1 className={styles.h1} {...props} data-cy={`${DataCyPrefix}-h1`} />
                ),
                h2: ({ node, ...props }) => (
                    <h2 className={styles.h2} {...props} data-cy={`${DataCyPrefix}-h2`} />
                ),
                a: ({ node, ...props }) =>
                    props.href?.startsWith('/') ? (
                        <Link href={props.href}>
                            <a {...props} className={styles.a} data-cy={`${DataCyPrefix}-a`}>
                                {props.children}
                            </a>
                        </Link>
                    ) : (
                        <a
                            href={props.href}
                            rel="noopener noreferrer"
                            {...props}
                            className={styles.a}
                            data-cy={`${DataCyPrefix}-a`}
                        >
                            {props.children}
                        </a>
                    ),
                img: ({ node, ...props }) => (
                    <div
                        className="relative w-full"
                        style={{ height: 600 }}
                        data-cy={`${DataCyPrefix}ImageContainer`}
                    >
                        <Image
                            src={Helpers.getImageURL(props.src ?? '')}
                            alt={props.alt}
                            layout="fill"
                            priority
                            className={`${props.className} text-center mx-auto`}
                            data-cy={`${DataCyPrefix}-img`}
                        />
                    </div>
                ),
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/, '')}
                            style={dracula}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        />
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                }
            }}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
                [
                    rehypeSanitize,
                    {
                        ...defaultSchema,
                        attributes: {
                            ...defaultSchema.attributes,
                            code: [
                                ...(defaultSchema?.attributes?.code || []),
                                // List of all allowed languages:
                                [
                                    'className',
                                    'language-js',
                                    'language-css',
                                    'language-md',
                                    'language-python',
                                    'language-java',
                                    'language-go',
                                    'language-rust',
                                    'language-ts'
                                ]
                            ]
                        }
                    }
                ]
            ]}
        >
            {content}
        </ReactMarkdown>
    );
};

export default Markdown;
