import { useState } from "react";
import Content from "@/components/Content";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import DefaultErrorPage from "next/error";
import styles from "../../styles/Content.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import TestImage2 from "/public/img/test-2.jpeg";
import Author from "@/components/Author";
import { ChatIcon, HeartIcon, XIcon } from "@heroicons/react/solid";
import Related from "@/components/Related";
import { getAllPosts, getPostsBSlug, getPostsByCategory } from "hooks/usePost";
import { dehydrate, QueryClient, useQueryClient } from "react-query";
import {
  useGetPostBySlugQuery,
  useGetCommentsQuery,
  CommentEntity,
  useCreateCommentMutation,
  CreateCommentMutationVariables,
} from "@customTypes/generated/graphql";
import { getClient } from "utils/client";
import DataWrapper from "@/components/DataWrapper";
import Markdown from "@/components/Markdown";
import Sidebar from "@/components/Comment/Sidebar";
import TextBox from "@/components/Comment/TextBox";
import Response from "@/components/Comment/Response";
import { useSession } from "utils/session";

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
  const [pageSize, setPageSize] = useState(10);

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

  const createComment = useCreateCommentMutation(
    getClient(),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getComments");
      },
    },
    {
      Authorization: `Bearer ${userData?.jwt}`,
    }
  );

  const handleCreate = (content: string, cb: Function) => {
    // console.log("content", content);
    const id = userData?.user.id;
    const variable = {
      content,
      postId: String(data?.posts?.data[0].id),
      authorId: String(userData?.user.id),
    };
    createComment.mutate(variable as CreateCommentMutationVariables, {
      onSuccess: () => cb(),
    });
  };

  if (router.isFallback || status === "loading") {
    return <DataWrapper status="loading" />;
  }
  if (data && data.posts?.data.length === 0) {
    // return error page
    return <DefaultErrorPage statusCode={404} />;
  }

  const post = data?.posts?.data;

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
              {comments.data &&
                comments.data.comments &&
                comments.data.comments.data.map((comment, i) => (
                  <Response
                    comment={comment as CommentEntity}
                    hideLastBorder={
                      Number(comments.data.comments?.data.length) - 1 === i
                    }
                    key={comment.id}
                  />
                ))}
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
                  {post[0].attributes?.title}
                </h2>
              </div>

              <p className={styles.contentDescription}>
                {post[0].attributes?.description}
              </p>
              <div className={styles.contentCoverImage}>
                <Image
                  src={TestImage2}
                  alt="the featured image of the blog post. "
                  width={800}
                  height={665}
                />
              </div>
              <article className={styles.contentMain}>
                <Markdown content={post[0].attributes?.content ?? ``} />
              </article>
              <div className={styles.iconContainer}>
                <p className={styles.icon} onClick={() => setOpen(!open)}>
                  <ChatIcon className="h-7 w-7" />
                  <span className={styles.iconText}>100</span>
                </p>
                <p className={styles.icon}>
                  <HeartIcon className="h-7 w-7 text-red-600 border-l-2 border-gray-300" />
                  <span className={styles.iconText}>100</span>
                </p>
                <p className={styles.icon}>
                  <span>👏</span>
                  <span className={styles.iconText}>100</span>
                </p>
              </div>
            </section>
            <aside className={styles.asideContainer}>
              <Author />
              <Related />
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
