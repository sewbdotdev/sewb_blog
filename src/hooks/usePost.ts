import client from "utils/client";
import { useQuery } from "react-query";
import CategoryAndTagQuery from "gql/queries/categoryandtag";
import {
  CategoryOrTag,
  CategoryOrTagResponse,
} from "@customTypes/categoryandtag";
import PostQuery from "gql/queries/posts";
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

export { getPostsByCategory, getPostsByTag };
