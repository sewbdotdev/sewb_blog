import client from "utils/client";
import {
  OurStoryEntityResponse,
  GetFaqDocument,
} from "../@customTypes/generated/graphql";

const getOurStory = async () => {
  try {
    const response = await client.request<OurStoryEntityResponse>(
      GetFaqDocument
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getOurStory };
