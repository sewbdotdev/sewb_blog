import React, { FunctionComponent } from 'react';
import styles from '../Cards.module.css';
import Image from 'next/image';
import DefaultImage from '/public/img/dark-feature.png';
import { Post } from '@customTypes/generated/graphql';
import Helpers from 'utils/helpers';
import Link from 'next/link';

type RelatedContentProps = {
    post: Post;
};

const DataCyPrefix = 'RelatedContentComponent';

const RelatedContent: FunctionComponent<RelatedContentProps> = (props) => {
    const { post } = props;
    const isImagePresent = Boolean(post.featuredImage.data?.attributes?.url);
    return (
        <div className={styles.relatedContentContainer} data-cy={`${DataCyPrefix}Container`}>
            <div className={styles.contentCover} data-cy={`${DataCyPrefix}ContentCoverContainer`}>
                {isImagePresent ? (
                    <Image
                        src={Helpers.getImageURL(String(post.featuredImage.data?.attributes?.url))}
                        data-cy={`${DataCyPrefix}ContentCoverImage`}
                        alt={
                            post.featuredImage.data?.attributes?.alternativeText ??
                            'the featured image of the blog post.'
                        }
                        layout="fixed"
                        width={60}
                        height={40}
                    />
                ) : (
                    <Image
                        src={DefaultImage}
                        data-cy={`${DataCyPrefix}ContentCoverImage`}
                        alt="the featured image of the blog post."
                        layout="fixed"
                        width={60}
                        height={40}
                    />
                )}
            </div>
            <div
                className={styles.relatedContentTextContainer}
                data-cy={`${DataCyPrefix}RelatedContentTextContainer`}
            >
                <Link href={`/posts/${post.slug}`}>
                    <a
                        className={styles.relatedContentTitle}
                        data-cy={`${DataCyPrefix}RelatedContentTitle`}
                    >
                        {post.title}
                    </a>
                </Link>
                <p
                    className={styles.relatedContentDescription}
                    data-cy={`${DataCyPrefix}RelatedContentDescription`}
                >
                    {post.description?.substring(0, 40)}
                </p>
            </div>
        </div>
    );
};

export default RelatedContent;
