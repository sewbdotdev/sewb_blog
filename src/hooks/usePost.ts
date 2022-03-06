import client from "utils/client";
import { useInfiniteQuery, useQuery } from "react-query";
import CategoryAndTagQuery from "gql/queries/categoryandtag/categoryandtag";
import {
  CategoryOrTag,
  CategoryOrTagResponse,
} from "@customTypes/categoryandtag";
import PostQuery from "gql/queries/posts/posts";
import { PostAPIResponse } from "@customTypes/post";

const getPostsByCategory = async (
  slug: string,
  page = 1,
  pageSize = 10
): Promise<PostAPIResponse> => {
  try {
    const response = await client.request(PostQuery.getPostsByCategory(), {
      slug,
      page,
      pageSize,
    });
    return response.posts;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

const getPostsByTag = async (
  slug: string,
  page = 1,
  pageSize = 10
): Promise<PostAPIResponse> => {
  try {
    const response = await client.request(PostQuery.getPostsByTags(), {
      slug,
      page,
      pageSize,
    });
    return response.posts;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

const getAllPosts = async (
  page = 1,
  pageSize = 10
): Promise<PostAPIResponse> => {
  try {
    const response = await client.request(PostQuery.getAllPosts(), {
      page,
      pageSize,
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
    ["posts"],
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
          : false,
    }
  );


  // const getPostBySlug = (): Promise<Post> => {

  // }
export { getPostsByCategory, getPostsByTag, getAllPosts, useInfinitePosts };
