import client from "utils/client";
import { useInfiniteQuery } from "react-query";
import {
  CommentEntityResponseCollection,
  GetCommentsByPostIdDocument,
} from "@customTypes/generated/graphql";

const getCommentsByPostId = async (
  postId: string,
  page = 1,
  pageSize = 10
): Promise<CommentEntityResponseCollection> => {
  try {
    const response = await client.request(GetCommentsByPostIdDocument, {
      postId,
      page,
      pageSize,
    });
    return response.comments;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

// sets up the hook to infinitely fetch new pages
const useInfiniteComments = (id: string, enabled = false) =>
  useInfiniteQuery(
    ["comments"],
    async ({ pageParam = 1 }) => {
      return getCommentsByPostId(id, pageParam);
    },

    {
      enabled,
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

export { useInfiniteComments };
