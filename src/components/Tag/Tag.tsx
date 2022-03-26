import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import styles from './Tag.module.css';

type TagProps = {
    className?: string;
    title: string;
    containerClassName?: string;
    slug: string;
};
const DataCyPrefix = 'TagComponent';

const Tag: FunctionComponent<TagProps> = (props) => {
    const { title, className, containerClassName, slug } = props;

    return (
        <div
            className={`${styles.container} ${containerClassName}`}
            data-cy={`${DataCyPrefix}Container`}
        >
            <Link href={`/tag/${slug}`}>
                <a className={`${styles.title} ${className}`} data-cy={`${DataCyPrefix}-${title}`}>
                    {title}
                </a>
            </Link>
        </div>
    );
};

export default Tag;
