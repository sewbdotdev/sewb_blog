import Content from '@/components/Content';
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import styles from '../../styles/CategoryOrTag.module.css';
import contentStyles from '../../styles/Content.module.css';
import { CollectionIcon, TagIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import ArticlePreview from '@/components/Cards/ArticlePreview';
import Category from '@/components/Category';
import { getCategories, getTags } from 'hooks/useCategoryAndTag';
import { dehydrate, QueryClient } from 'react-query';
import { CategoryOrTag } from '@customTypes/categoryandtag';
import { getPostsByCategory, getPostsByTag, useInfinitePostByPtype } from 'hooks/usePost';
import { Fragment, useEffect } from 'react';
import {
    CategoryEntity,
    TagEntity,
    UsersPermissionsUser,
    useGetAllCategoriesQuery,
    useGetAllTagsQuery
} from '@customTypes/generated/graphql';
import DataWrapper from '@/components/DataWrapper';
import { useInView } from 'react-intersection-observer';
import { NextSeo } from 'next-seo';
import Helpers from 'utils/helpers';
import { getClient } from 'utils/client';
interface Props {
    data: CategoryOrTag | undefined;
}

const DataCyPrefix = 'PtypePage';

const CategoryOrTagPage: NextPage<Props> = (props) => {
    const router = useRouter();
    const { ptype, slug } = router.query;
    const postData = useInfinitePostByPtype(String(slug), String(ptype));
    const variables = {
        page: 1,
        pageSize: 10
    };

    const tagQuery = useGetAllTagsQuery(getClient(), variables, {
        enabled: ptype === 'tag'
    });
    const categoryQuery = useGetAllCategoriesQuery(getClient(), variables, {
        enabled: ptype === 'category'
    });

    const categoryData = categoryQuery.data?.categories?.data.map((cat) => ({
        id: String(cat.id),
        attributes: {
            title: String(cat.attributes?.title),
            slug: String(cat.attributes?.slug)
        }
    }));

    const tagData = tagQuery.data?.tags?.data.map((tag) => ({
        id: String(tag.id),
        attributes: {
            title: String(tag.attributes?.title),
            slug: String(tag.attributes?.slug)
        }
    }));

    const { ref, inView } = useInView();
    useEffect(() => {
        if (inView && postData.hasNextPage) {
            postData.fetchNextPage();
        }
    }, [inView, postData, postData.hasNextPage]);

    const seo = {
        title: `${Helpers.capitalize(Helpers.replace(String(slug)))} ${Helpers.capitalize(
            String(ptype)
        )}`,
        description: `Post ${ptype} on SEWB Blog.`
    };

    return (
        <Content classNames="overflow-y-hidden">
            <NextSeo {...seo} />
            <div className={contentStyles.container} data-cy={`${DataCyPrefix}Container`}>
                <section
                    className={contentStyles.contentContainer}
                    data-cy={`${DataCyPrefix}ContentContainer`}
                >
                    <div
                        className={styles.titleContainer}
                        data-cy={`${DataCyPrefix}TitleContainer`}
                    >
                        {ptype === 'category' ? (
                            <CollectionIcon
                                className="h-5 w-5 self-center"
                                data-cy={`${DataCyPrefix}CollectionIcon`}
                            />
                        ) : (
                            <TagIcon
                                className="h-5 w-5 self-center"
                                data-cy={`${DataCyPrefix}TagIcon`}
                            />
                        )}
                        <h2
                            className={contentStyles.contentTitle}
                            data-cy={`${DataCyPrefix}ContentTitle`}
                        >
                            {Helpers.capitalize(Helpers.replace(String(slug)))}
                        </h2>
                    </div>

                    <section
                        className={styles.contentPreviewContainer}
                        data-cy={`${DataCyPrefix}ContentPreviewContainer`}
                    >
                        <DataWrapper status={postData.status}>
                            {postData?.data?.pages && postData?.data?.pages?.length > 0 ? (
                                postData?.data?.pages?.map((page) => (
                                    <Fragment key={page.meta.pagination.page}>
                                        {page.data.length > 0 ? (
                                            page.data.map((post) => {
                                                const isMultiAuthored = post.attributes?.authors
                                                    ?.data
                                                    ? post.attributes.authors.data.length > 1
                                                    : false;
                                                const previewProps = {
                                                    isMultiAuthored,
                                                    author: post.attributes?.authors?.data[0]
                                                        .attributes as UsersPermissionsUser,
                                                    title: post.attributes?.title ?? '',
                                                    tag: post.attributes?.tags
                                                        ?.data[0] as TagEntity,
                                                    category: post.attributes?.category
                                                        ?.data as CategoryEntity,
                                                    description: post.attributes?.description ?? '',
                                                    readTime: Number(post.attributes?.readTime),
                                                    publishedAt: post.attributes?.publishedAt,
                                                    slug: post.attributes?.slug ?? '',
                                                    featuredURL:
                                                        post.attributes?.featuredImage.data
                                                            ?.attributes?.url,
                                                    authorId:
                                                        post.attributes?.authors?.data[0].id ?? ''
                                                };

                                                return (
                                                    <ArticlePreview
                                                        {...previewProps}
                                                        key={post.id}
                                                    />
                                                );
                                            })
                                        ) : (
                                            <p>Oops, no post yet for this {ptype} :)</p>
                                        )}
                                    </Fragment>
                                ))
                            ) : (
                                <p>No Post yet for this {ptype}</p>
                            )}
                            <div className="flex justify-center">
                                <button
                                    ref={ref}
                                    onClick={() => {
                                        postData.fetchNextPage();
                                    }}
                                    data-cy={`${DataCyPrefix}fetchMoreBtn`}
                                    disabled={!postData.hasNextPage || postData.isFetchingNextPage}
                                >
                                    {postData.hasNextPage && postData.isFetchingNextPage
                                        ? 'Fetching...'
                                        : ''}
                                </button>
                            </div>
                            <div>
                                {postData.isFetching && !postData.isFetchingNextPage
                                    ? 'Background Updating...'
                                    : null}
                            </div>
                        </DataWrapper>
                    </section>
                </section>
                <aside
                    className={`${styles.asideContainer}`}
                    data-cy={`${DataCyPrefix}AsideContainer`}
                >
                    <h2 className="text-lg font-bold capitalize">
                        Other amazing {ptype === 'category' ? 'categories' : 'tags'}.
                    </h2>
                    <DataWrapper status={ptype === 'tag' ? tagQuery.status : categoryQuery.status}>
                        {ptype === 'tag' ? (
                            <Category
                                isTag={ptype === 'tag'}
                                heading={`Discover More ${'Tags'}`}
                                data={tagData ?? []}
                            />
                        ) : (
                            <Category
                                isTag={ptype === 'tag'}
                                heading={`Discover More ${'Categories'}`}
                                data={categoryData ?? []}
                            />
                        )}
                    </DataWrapper>
                </aside>
            </div>
        </Content>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const responseOne = await getCategories();
    const responseTwo = await getTags();
    const categoryPaths = responseOne.data.map((cat) => ({
        params: {
            ptype: 'category',
            slug: cat.attributes.slug
        }
    }));
    const tagPaths = responseTwo.data.map((tag) => ({
        params: {
            ptype: 'tag',
            slug: tag.attributes.slug
        }
    }));
    return {
        paths: [...categoryPaths, ...tagPaths],
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const queryClient = new QueryClient();
    const { params } = ctx;
    if (params && params.ptype) {
        if (params.ptype === 'tag') {
            await queryClient.prefetchQuery(
                ['posts', { ptype: 'tag', slug: String(params.slug) }],
                () => getPostsByTag(String(params.slug))
            );
        } else {
            await queryClient.prefetchQuery(
                ['posts', { ptype: 'category', slug: String(params.slug) }],
                () => getPostsByCategory(String(params.slug))
            );
        }
    }
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            params
        },
        revalidate: 60
    };
};

export default CategoryOrTagPage;
