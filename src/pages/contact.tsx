import React from "react";
import type { GetStaticProps, NextPage } from "next";
import Content from "@/components/Content";
import { NextSeo } from "next-seo";
const ContactUsPage: NextPage = (props) => {
  const seo = {
    title: `Contact Page`,
    description: `Contact page of users on SEWB.`,
  };
  return (
    <Content classNames="text-justify">
      <NextSeo {...seo} />
      <section className=" mx-5 mt-10 md:w-1/2 md:mx-auto">
        <h1 className="text-xl font-semibold mb-5">Wanna talk to us?</h1>
        <p>The best way to reach us is through the following channels</p>
        <ul className="my-5">
          <li className="my-2 ">
            <a
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:sewb.dev@gmail.com"
            >
              sewb.dev@gmail.com
            </a>
          </li>
          <li className="my-2 ">
            on Twitter{" "}
            <a
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/themmyloluwaaa"
            >
              @themmyloluwaaa
            </a>
          </li>
          <li className="my-2 ">
            on Twitter{" "}
            <a
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/wolemercy"
            >
              @wolemercy
            </a>
          </li>
        </ul>
      </section>
    </Content>
  );
};

export default ContactUsPage;
