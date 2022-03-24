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

export type postClaps = {
  id: string;
  attributes: {
    createdAt: string;
    updatedAt: string;
  }
}

export type Comment = {
  id: string;
  attributes: {
    content: string;
    createdAt: string;
    updatedAt: string;
  }
}

 type OmittedAttrInPost = Omit<Post, "tags" | "category"|"authors"|"featuredImage">

 export type PostBySlug = {
postClaps:{
  data: postClaps;
};
comments:{
  data: Comment;
};

 } & OmittedAttrInPost

export type PostAPIResponse = {
  data: Post[];
} & APIResponse;

