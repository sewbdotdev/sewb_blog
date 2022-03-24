import { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { getClient } from "utils/client";
import { getCategories, getTags } from "hooks/useCategoryAndTag";
import { getAllPosts } from "hooks/usePost";
import {
  CategoriesForSitemapDocument,
  TagsForSitemapDocument,
  PostsForSitemapDocument,
  CategoryEntityResponseCollection,
  TagEntityResponseCollection,
  PostEntityResponseCollection,
} from "@customTypes/generated/graphql";

const client = getClient();
const page = 1;
const pageSize = 1000;
let siteURL = process.env.SITE_URL || "http://localhost:3000/";
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const categories = await client.request<{
    categories: CategoryEntityResponseCollection;
  }>(CategoriesForSitemapDocument, {
    page,
    pageSize,
  });
  const tags = await client.request<{ tags: TagEntityResponseCollection }>(
    TagsForSitemapDocument,
    {
      page,
      pageSize,
    }
  );
  const posts = await client.request<{ posts: PostEntityResponseCollection }>(
    PostsForSitemapDocument,
    {
      page,
      pageSize,
    }
  );

  console.log(categories, tags, posts);
  siteURL = siteURL.endsWith("/") ? siteURL : `${siteURL}/`;
  const categoryFields = categories?.categories?.data?.map((cat) => ({
    loc: `${siteURL}category/${cat?.attributes?.slug}`,
    lastmod: cat.attributes?.updatedAt
      ? new Date(cat.attributes.updatedAt).toISOString()
      : new Date().toISOString(),
  }));
  const tagFields = tags?.tags?.data?.map((tag) => ({
    loc: `${siteURL}tag/${tag?.attributes?.slug}`,
    lastmod: tag.attributes?.updatedAt
      ? new Date(tag.attributes.updatedAt).toISOString()
      : new Date().toISOString(),
  }));
  const postFields = posts?.posts?.data?.map((post) => ({
    loc: `${siteURL}posts/${post?.attributes?.slug}`,
    lastmod: post.attributes?.updatedAt
      ? new Date(post.attributes.updatedAt).toISOString()
      : new Date().toISOString(),
  }));
  const fields: ISitemapField[] = [
    ...categoryFields,
    ...tagFields,
    ...postFields,
  ];

  console.log(fields);
  return getServerSideSitemap(ctx, fields);
};

export default function Sitemap() {}
