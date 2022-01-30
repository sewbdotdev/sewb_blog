import { CategoryOrTag } from "./categoryandtag";
import { APIResponse, Author, Image } from "./general";

export type Post = {
  id: string;
  attributes: {
    title: string;
    publishedAt: string;
    slug: string;
    description: string;
    readTime: number;
    tags: {
      data: CategoryOrTag[];
    };
    category: {
      data: CategoryOrTag;
    };
    authors: {
      data: Author[];
    };
    featuredImage?: {
      data: Image[];
    };
  };
};

export type PostAPIResponse = {
  data: Post[];
} & APIResponse;
