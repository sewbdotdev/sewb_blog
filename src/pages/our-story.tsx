import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import Content from '@/components/Content';
import { getOurStory } from 'hooks/useStaticPages';
import { useGetStoryQuery } from '@customTypes/generated/graphql';
import { getClient } from 'utils/client';
import DataWrapper from '@/components/DataWrapper';
import Markdown from '@/components/Markdown';
import { NextSeo } from 'next-seo';
import Helpers from 'utils/helpers';

const DataCyPrefix = 'OurStoryPage';

const OurStoryPage: NextPage = (props) => {
    const { data, status, error } = useGetStoryQuery(
        getClient(),
        {},
        {
            staleTime: Helpers.getStaleTime('our-story')
        }
    );
    const seo = {
        title: `Our Story Page`,
        description: `Our story page of users on SEWB.`
    };
    return (
        <Content classNames="text-justify mx-5  md:w-1/2 md:mx-auto ">
            <NextSeo {...seo} />
            <h2
                className="text-3xl font-bold my-5 border-b-2 border-slate-800 pb-2"
                data-cy={`${DataCyPrefix}Heading`}
            >
                Our Story
            </h2>
            <DataWrapper status={status}>
                {data?.ourStory?.data?.attributes?.content && (
                    <section data-cy={`${DataCyPrefix}StoryContainer`}>
                        <Markdown content={data?.ourStory?.data?.attributes?.content} />
                    </section>
                )}
            </DataWrapper>
        </Content>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['getStory'], () => getOurStory());

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    };
};

export default OurStoryPage;
