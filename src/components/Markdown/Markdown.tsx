import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import styles from './Markdown.module.css';
import Link from 'next/link';
import Helpers from 'utils/helpers';
import { useTheme } from 'next-themes';
import { DocumentDuplicateIcon } from '@heroicons/react/solid';
import RemarkEmoji from 'remark-emoji';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkDirective from 'remark-directive';
import rehypeFormat from 'rehype-format';
import remarkPluginForKeyTakeaway from 'utils/plugins/remarkPluginForKeyTakeaway';
import remarkSmartypants from 'remark-smartypants';

type MarkdownProps = {
    content: string;
};

const DataCyPrefix = 'MarkdownComponent';

const Markdown: FunctionComponent<MarkdownProps> = (props) => {
    const { content } = props;
    const { theme } = useTheme();
    const [style, setStyle] = useState(dracula);

    useEffect(() => {
        setStyle(theme === 'dark' ? dracula : vs);
    }, [theme]);
    return (
        <ReactMarkdown
            components={{
                p: ({ node, ...props }) => (
                    <p className={styles.p} {...props} data-cy={`${DataCyPrefix}-p`} />
                ),
                ul: ({ node, ordered, ...props }) => (
                    <ul className={styles.ul} {...props} data-cy={`${DataCyPrefix}-ul`} />
                ),
                h1: ({ node, ...props }) => (
                    <h1 className={styles.h1} {...props} data-cy={`${DataCyPrefix}-h1`} />
                ),
                h2: ({ node, ...props }) => (
                    <h2 className={styles.h2} {...props} data-cy={`${DataCyPrefix}-h2`} />
                ),
                h3: ({ node, ...props }) => (
                    <h3 className={styles.h3} {...props} data-cy={`${DataCyPrefix}-h2`} />
                ),
                h4: ({ node, ...props }) => (
                    <h4 className={styles.h4} {...props} data-cy={`${DataCyPrefix}-h2`} />
                ),

                sup: ({ node, ...props }) => <sup {...props} />,
                sub: ({ node, ...props }) => <sub {...props} />,
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
                    <div className="relative w-full" data-cy={`${DataCyPrefix}ImageContainer`}>
                        <Image
                            src={Helpers.getImageURL(props.src ?? '')}
                            alt={props.alt}
                            quality="90"
                            layout="responsive"
                            priority
                            width={600}
                            height={500}
                            unoptimized={Helpers.shouldImageBeUnoptimized(props.src)}
                            className={`${props.className} text-center mx-auto`}
                            data-cy={`${DataCyPrefix}-img`}
                        />
                    </div>
                ),
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const text = String(children).replace(/\n$/, '');
                    return !inline && match ? (
                        <div className={styles.syntaxdiv}>
                            <SyntaxHighlighter
                                style={style}
                                codeTagProps={{
                                    className: 'w-5/6'
                                }}
                                showLineNumbers={true}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            >
                                {text}
                            </SyntaxHighlighter>
                            <CopyToClipboard text={text}>
                                <DocumentDuplicateIcon
                                    className=" absolute top-3 text-gray-300 dark:text-gray-700 hover:text-gray-800 hover:dark:text-gray-300 cursor-pointer mr-3"
                                    height="25"
                                    width="25"
                                />
                            </CopyToClipboard>
                        </div>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                }
            }}
            remarkPlugins={[
                remarkGfm,
                remarkDirective,
                remarkPluginForKeyTakeaway,
                RemarkEmoji,
                remarkToc,
                remarkUnwrapImages,
                remarkSmartypants
            ]}
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
                                [...Helpers.getSupportedLanguages()]
                            ],
                            sub: [
                                ...(defaultSchema?.attributes?.sub || []),
                                // List of all allowed languages:
                                ['className']
                            ],
                            sup: [
                                ...(defaultSchema?.attributes?.sup || []),
                                // List of all allowed languages:
                                ['className']
                            ]
                        }
                    }
                ],
                rehypeAccessibleEmojis,
                rehypeSlug,
                rehypeFormat
            ]}
        >
            {content}
        </ReactMarkdown>
    );
};

export default Markdown;
