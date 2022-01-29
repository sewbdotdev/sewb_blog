import client from "utils/client";
import { useQuery } from "react-query";
import CategoryAndTagQuery from "gql/queries/categoryandtag";
import { CategoryOrTagResponse } from "@customTypes/categoryandtag";

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

export { getCategories };
