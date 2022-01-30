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
    tags?: CategoryOrTag[];
    category?: CategoryOrTag;
    authors: Author[];
    featuredImage?: Image[];
  };
};

export type PostAPIResponse = {
  data: Post[];
} & APIResponse;
