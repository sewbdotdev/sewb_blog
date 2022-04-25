import client from 'utils/client';
import { CategoryOrTag, CategoryOrTagResponse } from '@customTypes/categoryandtag';
import {
    GetAllCategoriesDocument,
    GetAllTagsDocument,
    GetOneCategoryDocument,
    GetOneTagDocument
} from '@customTypes/generated/graphql';

const getCategories = async (page = 1, pageSize = 12): Promise<CategoryOrTagResponse> => {
    try {
        const response = await client.request(GetAllCategoriesDocument, { page, pageSize });

        return response.categories;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};

const getTags = async (page = 1, pageSize = 12): Promise<CategoryOrTagResponse> => {
    try {
        const response = await client.request(GetAllTagsDocument, {
            page,
            pageSize
        });

        return response.tags;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};

const getOneCategory = async (id: number): Promise<CategoryOrTag> => {
    try {
        const response = await client.request(GetOneCategoryDocument, { id });

        return response.category;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};
const getOneTag = async (id: number): Promise<CategoryOrTag> => {
    try {
        const response = await client.request(GetOneTagDocument, {
            id
        });

        return response.category;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};

export { getCategories, getTags, getOneTag, getOneCategory };
