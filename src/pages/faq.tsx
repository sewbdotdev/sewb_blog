import React from "react";
import type { GetStaticProps, NextPage } from "next";
import { dehydrate, QueryClient } from "react-query";
import Content from "@/components/Content";
import { getFaq } from "hooks/useStaticPages";
import { useGetFaqQuery } from "@customTypes/generated/graphql";
import { getClient } from "utils/client";
import DataWrapper from "@/components/DataWrapper";
import Markdown from "@/components/Markdown";

const FAQPage: NextPage = (props) => {
  const { data, status, error } = useGetFaqQuery(getClient());
  return (
    <Content classNames="text-justify">
      <DataWrapper status={status}>
        {data?.faq?.data?.attributes?.content?.map((faq) => {
          return (
            <section className=" mx-5  md:w-1/2 md:mx-auto">
              <ul className="py-2 mt-5 ">
                <li>
                  <h2 className="text-xl font-semibold">{faq?.Question} ?</h2>
                  <Markdown content={faq?.Answer ?? ""} />
                </li>
              </ul>
            </section>
          );
        })}
      </DataWrapper>
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["getFAQ"], () => getFaq());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default FAQPage;
