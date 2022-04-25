import type { GetStaticProps, NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useEffect, Fragment } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import Category from '@/components/Category';
import ArticlePreview from '@/components/Cards/ArticlePreview';
import Content from '@/components/Content';
import Feature from '@/components/Feature';
import { getCategories } from 'hooks/useCategoryAndTag';
import { useInfinitePosts } from 'hooks/usePost';
import DataWrapper from '@/components/DataWrapper';
import {
    CategoryEntity,
    TagEntity,
    useGetAllCategoriesQuery,
    UsersPermissionsUser
} from '@customTypes/generated/graphql';
import { getClient } from 'utils/client';
import { useInView } from 'react-intersection-observer';
import Helpers from 'utils/helpers';

const DataCyPrefix = 'HomePage';

const Home: NextPage = (props) => {
    const postsData = useInfinitePosts();
    const { data, status } = useGetAllCategoriesQuery(
        getClient(),
        {
            page: 1,
            pageSize: 12
        },
        {
            staleTime: Helpers.getStaleTime('allCategories')
        }
    );

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && postsData.hasNextPage) {
            postsData.fetchNextPage();
        }
    }, [inView, postsData, postsData.hasNextPage]);

    const categoryData = data?.categories?.data.map((cat) => ({
        id: String(cat.id),
        attributes: {
            title: String(cat.attributes?.title),
            slug: String(cat.attributes?.slug)
        }
    }));

    return (
        <Content>
            <Feature />
            <section className={styles.container} data-cy={`${DataCyPrefix}Container`}>
                <aside className={styles.asideSection} data-cy={`${DataCyPrefix}asideSection`}>
                    <DataWrapper status={status}>
                        {categoryData && <Category data={categoryData} />}
                    </DataWrapper>
                </aside>
                <section
                    className={styles.contentSection}
                    data-cy={`${DataCyPrefix}contentSection`}
                >
                    <DataWrapper status={postsData.status}>
                        {postsData.data?.pages.map((page) => (
                            <Fragment key={page.meta.pagination.page}>
                                {page.data.map((post) => {
                                    const isMultiAuthored = post.attributes?.authors?.data
                                        ? post.attributes.authors.data.length > 1
                                        : false;
                                    const previewProps = {
                                        isMultiAuthored,
                                        authorId: post.attributes?.authors?.data[0].id ?? '',
                                        author: post.attributes?.authors?.data[0]
                                            .attributes as UsersPermissionsUser,
                                        title: post.attributes?.title ?? '',
                                        tag: post.attributes?.tags?.data[0] as TagEntity,
                                        category: post.attributes?.category?.data as CategoryEntity,
                                        description: post.attributes?.description ?? '',
                                        readTime: Number(post.attributes?.readTime),
                                        publishedAt: post.attributes?.publishedAt,
                                        slug: post.attributes?.slug ?? '',
                                        featuredURL:
                                            post.attributes?.featuredImage.data?.attributes?.url
                                    };

                                    return <ArticlePreview {...previewProps} key={post.id} />;
                                })}
                            </Fragment>
                        ))}
                        <div className="flex justify-center">
                            <button
                                ref={ref}
                                onClick={() => {
                                    postsData.fetchNextPage();
                                }}
                                disabled={!postsData.hasNextPage || postsData.isFetchingNextPage}
                                data-cy={`${DataCyPrefix}fetchMoreBtn`}
                            >
                                {postsData.hasNextPage && postsData.isFetchingNextPage
                                    ? 'Fetching...'
                                    : ''}
                            </button>
                        </div>
                        <div>
                            {postsData.isFetching && !postsData.isFetchingNextPage
                                ? 'Background Updating...'
                                : null}
                        </div>
                    </DataWrapper>
                </section>
            </section>
        </Content>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['categories', 1], () => getCategories());
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    };
};

export default Home;
