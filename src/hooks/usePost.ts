import { getClient } from 'utils/client';
import { useInfiniteQuery, useQuery } from 'react-query';
import { PostAPIResponse } from '@customTypes/post';
import {
    GetPostsByCategoryDocument,
    GetPostsByTagDocument,
    PostEntityResponseCollection,
    GetPostBySlugDocument,
    GetAllPostsDocument
} from '@customTypes/generated/graphql';

const client = getClient();

const getPostsByCategory = async (slug: string, page = 1, pageSize = 10) => {
    try {
        const response = await client.request<{
            posts: PostEntityResponseCollection;
        }>(GetPostsByCategoryDocument, {
            slug,
            page,
            pageSize
        });
        return response.posts;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};

const getPostsByTag = async (slug: string, page = 1, pageSize = 10) => {
    try {
        const response = await client.request<{
            posts: PostEntityResponseCollection;
        }>(GetPostsByTagDocument, {
            slug,
            page,
            pageSize
        });
        return response.posts;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};

const getAllPosts = async (page = 1, pageSize = 10): Promise<PostEntityResponseCollection> => {
    try {
        const response = await client.request(GetAllPostsDocument, {
            page,
            pageSize
        });
        return response.posts;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};

// sets up the hook to infinitely fetch new pages
const useInfinitePosts = () =>
    useInfiniteQuery(
        ['posts'],
        async ({ pageParam = 1 }) => getAllPosts(pageParam),

        {
            refetchOnWindowFocus: false,
            getPreviousPageParam: (firstPage) =>
                firstPage.meta.pagination.pageCount !== 0
                    ? firstPage.meta.pagination.page !== 1
                        ? firstPage.meta.pagination.page - 1
                        : false
                    : false,
            getNextPageParam: (lastPage) =>
                lastPage.meta.pagination.pageCount !== 0
                    ? lastPage.meta.pagination.page !== lastPage.meta.pagination.pageCount
                        ? lastPage.meta.pagination.page + 1
                        : false
                    : false
        }
    );
const useInfinitePostByPtype = (slug: string, ptype: string) =>
    useInfiniteQuery(
        ['posts', { ptype, slug }],
        async ({ pageParam = 1 }) => {
            if (ptype === 'tag') {
                return getPostsByTag(slug, pageParam);
            } else {
                return getPostsByCategory(slug, pageParam);
            }
        },
        {
            refetchOnWindowFocus: false,
            getPreviousPageParam: (firstPage) =>
                firstPage.meta.pagination.pageCount !== 0
                    ? firstPage.meta.pagination.page !== 1
                        ? firstPage.meta.pagination.page - 1
                        : false
                    : false,
            getNextPageParam: (lastPage) =>
                lastPage.meta.pagination.pageCount !== 0
                    ? lastPage.meta.pagination.page !== lastPage.meta.pagination.pageCount
                        ? lastPage.meta.pagination.page + 1
                        : false
                    : false
        }
    );

const getPostsBSlug = async (slug: string, page = 1, pageSize = 10): Promise<PostAPIResponse> => {
    try {
        const response = await client.request(GetPostBySlugDocument, {
            slug,
            page,
            pageSize
        });
        return response;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};
export {
    getPostsByCategory,
    getPostsByTag,
    getAllPosts,
    useInfinitePosts,
    getPostsBSlug,
    useInfinitePostByPtype
};
