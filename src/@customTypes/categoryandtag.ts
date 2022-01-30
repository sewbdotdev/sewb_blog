import { APIResponse } from "./general";

export type CategoryOrTag = {
  id: string;
  attributes: {
    title: string;
    slug: string;
  };
};

export type CategoryOrTagResponse = {
  data: CategoryOrTag[];
} & APIResponse;
