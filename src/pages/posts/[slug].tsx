import Content from '@/components/Content';
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import DefaultErrorPage from 'next/error';
import styles from '../../styles/Content.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Author from '@/components/Author';
import { ClockIcon, CalendarIcon } from '@heroicons/react/solid';
import Related from '@/components/Related';
import { getAllPosts, getPostsBSlug } from 'hooks/usePost';
import { dehydrate, QueryClient } from 'react-query';
import { NextSeo } from 'next-seo';
import {
    useGetPostBySlugQuery,
    useGetMinimalPostsByCategoryQuery,
    PostEntity,
    UsersPermissionsUser
} from '@customTypes/generated/graphql';
import { getClient } from 'utils/client';
import DataWrapper from '@/components/DataWrapper';
import Markdown from '@/components/Markdown';

import Helpers from 'utils/helpers';
import dateFormatter from 'utils/dateFormatter';

import Giscus from '@/components/Comment/Giscus';

const DataCyPrefix = 'PostPage';

const enableComments = Helpers.booleanParser(process.env.NEXT_PUBLIC_ENABLE_COMMENTS);
const PostPage: NextPage = (props) => {
    const router = useRouter();
    // Get QueryClient from the context
    const { data, status, error } = useGetPostBySlugQuery(
        getClient(),
        {
            slug: String(router.query.slug)
        },
        {
            staleTime: Helpers.getStaleTime('posts')
        }
    );

    const relatedPosts = useGetMinimalPostsByCategoryQuery(
        getClient(),
        {
            slug: data?.posts?.data[0].attributes?.category?.data?.attributes?.slug ?? '',
            page: 1,
            pageSize: 6
        },
        {
            enabled: Boolean(data && data.posts && data.posts.data && data.posts.data.length > 0)
        }
    );

    if (router.isFallback || status === 'loading') {
        return <DataWrapper status="loading" />;
    }
    if (data && data.posts?.data.length === 0) {
        // return error page
        return <DefaultErrorPage statusCode={404} />;
    }

    const post = data?.posts?.data[0];

    const isImagePresent = Boolean(post?.attributes?.featuredImage?.data?.attributes?.url);
    const seo = {
        title: String(post?.attributes?.title),
        description: String(post?.attributes?.description),
        openGraph: {
            type: 'article',
            article: {
                publishedTime: post?.attributes?.publishedAt
            },
            locale: 'en_IE',
            url: `https://www.sewb.dev/posts/${String(router.query.slug)}`,
            images: [
                {
                    url: isImagePresent
                        ? Helpers.getImageURL(
                              post?.attributes?.featuredImage?.data?.attributes?.url ?? ''
                          )
                        : '/img/feature.jpeg',
                    width: 600,
                    height: 665,
                    alt:
                        post?.attributes?.featuredImage?.data?.attributes?.alternativeText ??
                        'Featured image of this article',
                    type: 'image/jpeg'
                }
            ]
        }
    };

    return (
        <Content classNames="overflow-y-hidden">
            <NextSeo {...seo} />
            <DataWrapper status={status}>
                {post ? (
                    <div className={styles.container} data-cy={`${DataCyPrefix}PostContainer`}>
                        <section
                            className={styles.contentContainer}
                            data-cy={`${DataCyPrefix}PostContentContainer`}
                        >
                            <div
                                className={styles.titleContainer}
                                data-cy={`${DataCyPrefix}PostTitleContainer`}
                            >
                                <h2
                                    className={styles.contentTitle}
                                    data-cy={`${DataCyPrefix}PostContentTitle`}
                                >
                                    {post.attributes?.title}
                                </h2>
                            </div>

                            <p data-cy={`${DataCyPrefix}PostContentDescription`}>
                                {post.attributes?.description}
                            </p>
                            <div
                                className="flex gap-5 pb-4"
                                data-cy={`${DataCyPrefix}PostMetaContainer`}
                            >
                                <p className="text-sm text-gray-500 flex gap-2">
                                    <CalendarIcon className="h-4 w-4 self-center" />
                                    <span data-cy={`${DataCyPrefix}PostMetaPublishedAt`}>
                                        {dateFormatter(post.attributes?.publishedAt)}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-500 flex gap-2">
                                    <ClockIcon className="h-4 w-4 self-center" />
                                    <span data-cy={`${DataCyPrefix}PostMetaReadTime`}>
                                        {post.attributes?.readTime} min read.
                                    </span>
                                </p>
                                <p className="text-sm text-gray-500 flex gap-2">
                                    <CalendarIcon className="h-4 w-4 self-center" />
                                    <span data-cy={`${DataCyPrefix}PostMetaPublishedAt`}>
                                        Updated: {dateFormatter(post.attributes?.updatedAt)}
                                    </span>
                                </p>
                            </div>
                            {isImagePresent && (
                                <div className={styles.contentCoverImage}>
                                    {isImagePresent && (
                                        <Image
                                            src={Helpers.getImageURL(
                                                post?.attributes?.featuredImage?.data?.attributes
                                                    ?.url ?? ''
                                            )}
                                            data-cy={`${DataCyPrefix}PostFeatureImage`}
                                            alt={`${post.attributes?.featuredImage.data?.attributes?.alternativeText}`}
                                            width={600}
                                            height={665}
                                            priority
                                        />
                                    )}
                                    <div
                                        className="text-center"
                                        data-cy={`${DataCyPrefix}PostMetaPublishedAt`}
                                    >
                                        <Markdown
                                            content={
                                                post.attributes?.featuredImage.data?.attributes
                                                    ?.caption ?? ''
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                            <article
                                className={styles.contentMain}
                                data-cy={`${DataCyPrefix}PostContentMain`}
                            >
                                <Markdown content={post.attributes?.content ?? ``} />
                            </article>
                            <div
                                className={styles.iconContainer}
                                data-cy={`${DataCyPrefix}PostIconContainer`}
                            ></div>
                            {enableComments && (
                                <div className="hidden md:block">
                                    <Giscus />
                                </div>
                            )}
                        </section>
                        <aside
                            className={styles.asideContainer}
                            data-cy={`${DataCyPrefix}AuthorContainer`}
                        >
                            {post.attributes?.authors?.data.map((author, i) => (
                                <Author
                                    key={author.id}
                                    data={author.attributes as UsersPermissionsUser}
                                />
                            ))}
                            <DataWrapper status={relatedPosts.status}>
                                {
                                    <Related
                                        posts={
                                            (relatedPosts.data?.posts?.data?.filter(
                                                (p) => Number(p.id) !== Number(post.id)
                                            ) as PostEntity[]) || []
                                        }
                                    />
                                }
                            </DataWrapper>
                        </aside>
                        {enableComments && (
                            <div className="md:hidden">
                                <Giscus />
                            </div>
                        )}
                    </div>
                ) : (
                    <p data-cy={`${DataCyPrefix}NoPost`}> No Post</p>
                )}
            </DataWrapper>
        </Content>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getAllPosts(1, Helpers.getMaximumPostCountForBuild());
    const postPaths = posts.data.map((post) => ({
        params: {
            slug: String(post.attributes?.slug)
        }
    }));

    return {
        paths: [...postPaths],
        fallback: 'blocking'
    };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const queryClient = new QueryClient();
    const { params } = ctx;
    await queryClient.prefetchQuery(['getPostBySlug', { slug: String(params?.slug) }], () =>
        getPostsBSlug(String(params?.slug))
    );
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            params
        },
        revalidate: 60
    };
};

export default PostPage;
