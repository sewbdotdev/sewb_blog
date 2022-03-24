import client from "utils/client";
import {
  OurStoryEntityResponse,
  GetFaqDocument,
  GetStoryDocument,
  FaqEntityResponse,
  UsersPermissionsUserEntityResponse,
  GetUserProfileDocument,
} from "../@customTypes/generated/graphql";

const getOurStory = async () => {
  try {
    const response = await client.request<OurStoryEntityResponse>(
      GetStoryDocument
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getFaq = async () => {
  try {
    const response = await client.request<FaqEntityResponse>(GetFaqDocument);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getUserProfile = async (variable: { id: string }) => {
  try {
    const response = await client.request<UsersPermissionsUserEntityResponse>(
      GetUserProfileDocument,
      {
        variable,
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
export { getOurStory, getFaq, getUserProfile };
