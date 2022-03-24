import React from "react";
import type { GetStaticProps, NextPage } from "next";
import Content from "@/components/Content";

const ContactUsPage: NextPage = (props) => {
  return (
    <Content classNames="text-justify">
      <section className=" mx-5 mt-10 md:w-1/2 md:mx-auto">
        <h1 className="text-xl font-semibold mb-5">Wanna talk to us?</h1>
        <p>The best way to reach us is through the following channels</p>
        <ul className="my-5">
          <li className="my-2 ">
            <a
              className="text-blue-600 hover:underline"
              target="_blank"
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
