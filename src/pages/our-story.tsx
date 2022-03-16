import React from "react";
import type { GetStaticProps, NextPage } from "next";
import { dehydrate, QueryClient } from "react-query";
import Content from "@/components/Content";
import { getOurStory } from "hooks/useOurStory";
import { useGetStoryQuery } from "@customTypes/generated/graphql";
import { getClient } from "utils/client";
import DataWrapper from "@/components/DataWrapper";
import Markdown from "@/components/Markdown";

const OurStoryPage: NextPage = (props) => {
  const { data, status, error } = useGetStoryQuery(getClient());

  return (
    <Content>
      <DataWrapper status={status}>
        {data?.ourStory?.data?.attributes?.content && (
          <section className="mx-40 my-20">
            <Markdown content={data?.ourStory?.data?.attributes?.content} />
          </section>
        )}
      </DataWrapper>
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["getFAQ"], () => getOurStory());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default OurStoryPage;
