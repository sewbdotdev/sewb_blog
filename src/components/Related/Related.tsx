import { Post, PostEntity } from '@customTypes/generated/graphql';
import Image from 'next/image';
import React, { FunctionComponent } from 'react';
import RelatedContent from '../Cards/RelatedContent';
import styles from './Related.module.css';
import TestImage1 from '/public/img/test-1.jpg';

type RelatedProps = {
    posts: PostEntity[];
};
const DataCyPrefix = 'RelatedComponent';

const Related: FunctionComponent<RelatedProps> = (props) => {
    const { posts } = props;
    return (
        <section className={styles.container} data-cy={`${DataCyPrefix}Container`}>
            <h3 className={styles.title} data-cy={`${DataCyPrefix}Heading`}>
                Related
            </h3>
            {posts.length > 0 ? (
                posts.map((post) => <RelatedContent key={post.id} post={post.attributes as Post} />)
            ) : (
                <p> No related post.</p>
            )}
        </section>
    );
};

export default Related;
