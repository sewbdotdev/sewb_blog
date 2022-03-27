import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import styles from '../Cards.module.css';
type CategoryCardProps = {
    title: string;
    slug: string;
};

const DataCyPrefix = 'CategoryCardComponent';

const CategoryCard: FunctionComponent<CategoryCardProps> = (props) => {
    const { title, slug } = props;
    return (
        <div className={styles.categoryCardContainer} data-cy={`${DataCyPrefix}Container`}>
            <Link href={`/category/${slug}`}>
                <a className={styles.categoryCardItem} data-cy={`${DataCyPrefix}-${title}`}>
                    {title}
                </a>
            </Link>
        </div>
    );
};

export default CategoryCard;
