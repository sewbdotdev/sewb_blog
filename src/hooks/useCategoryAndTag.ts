import client from "utils/client";
import { useQuery } from "react-query";
import CategoryAndTagQuery from "gql/queries/categoryandtag/categoryandtag";
import {
  CategoryOrTag,
  CategoryOrTagResponse,
} from "@customTypes/categoryandtag";

const getCategories = async (
  page = 1,
  pageSize = 10
): Promise<CategoryOrTagResponse> => {
  try {
    const response = await client.request(
      CategoryAndTagQuery.getAllCategories(),
      { page, pageSize }
    );

    return response.categories;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

const getTags = async (
  page = 1,
  pageSize = 10
): Promise<CategoryOrTagResponse> => {
  try {
    const response = await client.request(CategoryAndTagQuery.getAllTags(), {
      page,
      pageSize,
    });

    return response.tags;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

const getOneCategory = async (id: number): Promise<CategoryOrTag> => {
  try {
    const response = await client.request(
      CategoryAndTagQuery.getOneCategory(),
      { id }
    );
    
    return response.category;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
const getOneTag = async (id: number): Promise<CategoryOrTag> => {
  try {
    const response = await client.request(CategoryAndTagQuery.getOneTag(), {
      id,
    });

    return response.category;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export { getCategories, getTags, getOneTag, getOneCategory };
