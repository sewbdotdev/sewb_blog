import { Fragment, useEffect, useState } from "react";
import Content from "@/components/Content";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import DefaultErrorPage from "next/error";
import styles from "../../styles/Content.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Author from "@/components/Author";
import {
  ChatIcon,
  ClockIcon,
  XIcon,
  CalendarIcon,
} from "@heroicons/react/solid";
import Related from "@/components/Related";
import { getAllPosts, getPostsBSlug } from "hooks/usePost";
import { dehydrate, QueryClient, useQueryClient } from "react-query";
import {
  useGetPostBySlugQuery,
  useGetCommentsQuery,
  CommentEntity,
  useCreateCommentMutation,
  CreateCommentMutationVariables,
  useGetMinimalPostsByCategoryQuery,
  PostEntity,
  usePostCommentCountQuery,
  UsersPermissionsUser,
} from "@customTypes/generated/graphql";
import { getClient } from "utils/client";
import DataWrapper from "@/components/DataWrapper";
import Markdown from "@/components/Markdown";
import Sidebar from "@/components/Comment/Sidebar";
import TextBox from "@/components/Comment/TextBox";
import Response from "@/components/Comment/Response";
import { useSession } from "utils/session";
import Helpers from "utils/helpers";
import dateFormatter from "utils/dateFormatter";
import { useInfiniteComments } from "hooks/useComment";
import { useInView } from "react-intersection-observer";

const PostPage: NextPage = (props) => {
  const router = useRouter();
  // Get QueryClient from the context
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { data: userData } = useSession();
  const { data, status, error } = useGetPostBySlugQuery(getClient(), {
    slug: String(router.query.slug),
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [postVars, setPostVars] = useState({
    page,
    pageSize,
    postId: String(data?.posts?.data[0].id),
  });
  const comments = useGetCommentsQuery(
    getClient(),
    {
      postId: String(data?.posts?.data[0].id),
      page,
      pageSize,
    },
    {
      enabled: Boolean(
        data &&
          data.posts &&
          data.posts.data &&
          data.posts.data.length > 0 &&
          open
      ),
    }
  );

  const infiniteComments = useInfiniteComments(String(data?.posts?.data[0].id));

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && infiniteComments.hasNextPage) {
      infiniteComments.fetchNextPage();
    }
  }, [inView, infiniteComments.hasNextPage]);

  const createComment = useCreateCommentMutation(
    getClient(),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getComments");
        queryClient.invalidateQueries("comments");
      },
    },
    {
      Authorization: `Bearer ${userData?.jwt}`,
    }
  );

  const postCommentStats = usePostCommentCountQuery(getClient(), {
    postSlug: String(router.query.slug),
  });

  const handleCreate = (content: string, cb: Function) => {
    // console.log("content", content);
    const variable = {
      content,
      postId: String(data?.posts?.data[0].id),
      authorId: String(userData?.user.id),
    };
    createComment.mutate(variable as CreateCommentMutationVariables, {
      onSuccess: () => cb(),
    });
  };

  const relatedPosts = useGetMinimalPostsByCategoryQuery(
    getClient(),
    {
      slug:
        data?.posts?.data[0].attributes?.category?.data?.attributes?.slug ?? "",
      page: 1,
      pageSize: 6,
    },
    {
      enabled: Boolean(
        data && data.posts && data.posts.data && data.posts.data.length > 0
      ),
    }
  );

  if (router.isFallback || status === "loading") {
    return <DataWrapper status="loading" />;
  }
  if (data && data.posts?.data.length === 0) {
    // return error page
    return <DefaultErrorPage statusCode={404} />;
  }

  const post = data?.posts?.data[0];

  const isImagePresent = Boolean(
    post?.attributes?.featuredImage?.data?.attributes?.url
  );

  console.log(infiniteComments);
  return (
    <Content classNames="overflow-y-hidden">
      <Sidebar isOpen={open} setIsOpen={setOpen} noBackdrop={false}>
        <DataWrapper status={comments.status}>
          <section>
            <section className="py-8 px-4 relative">
              <div className="flex justify-between mb-10">
                <h1 className="text-base md:text-xl font-bold">
                  Comments{" "}
                  {comments.data &&
                    comments.data.comments &&
                    `(${comments.data.comments.meta.pagination.total})`}
                </h1>
                <XIcon
                  className="h-7 w-7 mr-10 text-gray-400 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              {/* TODO add it get's better when you're logged in component for unauthenticated users to login instead of seeing the text box.  */}
              <TextBox
                onSubmit={handleCreate}
                loading={createComment.isLoading}
              />
            </section>
            <hr className="border-gray-500" />
            <section
              className="py-8 px-4"
              key={comments.data?.comments?.data.length}
            >
              {/* {comments.data &&
                comments.data.comments &&
                comments.data.comments.data.map((comment, i) => (
                  <Response
                    commentCacheKey={postVars}
                    comment={comment as CommentEntity}
                    hideLastBorder={
                      Number(comments.data.comments?.data.length) - 1 === i
                    }
                    key={comment.id}
                  />
                ))} */}
              {infiniteComments.data &&
                infiniteComments.data?.pages.map((page) => {
                  console.log(page);
                  return (
                    <Fragment key={page.meta.pagination.page}>
                      {page.data.map((comment) => {
                        return (
                          <Response
                            commentCacheKey={postVars}
                            comment={comment as CommentEntity}
                            // hideLastBorder={
                            //   Number(comments.data.comments?.data.length) - 1 === i
                            // }
                            key={comment.id}
                          />
                        );

                        // return <ArticlePreview {...previewProps} key={project.id} />;
                      })}
                    </Fragment>
                  );
                })}
              <div className="flex justify-center">
                <button
                  ref={ref}
                  onClick={() => {
                    infiniteComments.fetchNextPage();
                  }}
                  disabled={
                    !infiniteComments.hasNextPage ||
                    infiniteComments.isFetchingNextPage
                  }
                >
                  {infiniteComments.hasNextPage &&
                  infiniteComments.isFetchingNextPage
                    ? "Fetching..."
                    : ""}
                </button>
              </div>
              <div>
                {infiniteComments.isFetching &&
                !infiniteComments.isFetchingNextPage
                  ? "Background Updating..."
                  : null}
              </div>
            </section>
          </section>
        </DataWrapper>
      </Sidebar>
      <DataWrapper status={status}>
        {post ? (
          <div className={styles.container}>
            <section className={styles.contentContainer}>
              <div className={styles.titleContainer}>
                <h2 className={styles.contentTitle}>
                  {post.attributes?.title}
                </h2>
              </div>

              <p>{post.attributes?.description}</p>
              <div className="flex gap-5 pb-4">
                <p className="text-sm text-gray-500 flex gap-2">
                  <CalendarIcon className="h-4 w-4 self-center" />
                  <span>{dateFormatter(post.attributes?.publishedAt)}</span>
                </p>
                <p className="text-sm text-gray-500 flex gap-2">
                  <ClockIcon className="h-4 w-4 self-center" />
                  <span>{post.attributes?.readTime} min read.</span>
                </p>
              </div>
              {isImagePresent && (
                <div className={styles.contentCoverImage}>
                  {isImagePresent && (
                    <Image
                      src={Helpers.getImageURL(
                        post?.attributes?.featuredImage?.data?.attributes
                          ?.url ?? ""
                      )}
                      alt="the featured image of the blog post. "
                      width={600}
                      height={665}
                    />
                  )}
                  <div className="text-center">
                    <Markdown
                      content={
                        post.attributes?.featuredImage.data?.attributes
                          ?.caption ?? ""
                      }
                    />
                  </div>
                </div>
              )}
              <article className={styles.contentMain}>
                <Markdown content={post.attributes?.content ?? ``} />
              </article>
              <div className={styles.iconContainer}>
                <p className={styles.icon} onClick={() => setOpen(!open)}>
                  <ChatIcon className="h-7 w-7" />
                  <span className={styles.iconText}>
                    {postCommentStats.data?.comments?.meta.pagination.total ??
                      0}
                  </span>
                </p>
                {/* TODO: retrieve post claps and post likes */}
                {/* <p className={styles.icon}>
                  <HeartIcon className="h-7 w-7 text-red-600" />
                  <span className={styles.iconText}>100</span>
                </p>
                <p className={styles.icon}>
                  <span>👏</span>
                  <span className={styles.iconText}>100</span>
                </p> */}
              </div>
            </section>
            <aside className={styles.asideContainer}>
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
          </div>
        ) : (
          <p> No Post</p>
        )}
      </DataWrapper>
    </Content>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts(1, 100);
  const postPaths = posts.data.map((post) => ({
    params: {
      slug: post.attributes.slug,
    },
  }));

  return {
    paths: [...postPaths],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const queryClient = new QueryClient();
  const { params } = ctx;
  await queryClient.prefetchQuery(
    ["getPostBySlug", { slug: params?.slug }],
    () => getPostsBSlug(String(params?.slug))
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      params,
    },
    revalidate: 10,
  };
};

export default PostPage;
