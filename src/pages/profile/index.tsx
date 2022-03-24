import React, { useState } from "react";
import { useRouter } from "next/router";
import { NextPage, GetServerSidePropsContext } from "next";
import DefaultErrorPage from "next/error";
import Content from "@/components/Content";
import Image from "next/image";
import ProfileCoverImg from "/public/img/profile-cover.jpeg";
import DefaultUserImg from "/public/img/default-user.png";
import { getUserProfile } from "hooks/useStaticPages";
import { dehydrate, QueryClient, useQueryClient } from "react-query";
import {
  useGetUserProfileQuery,
  useUpdateMeMutation,
} from "@customTypes/generated/graphql";
import { getClient } from "utils/client";
import DataWrapper from "@/components/DataWrapper";
import Helpers from "utils/helpers";
import { useSession } from "utils/session";
import { NextSeo } from "next-seo";
const ProfilePage: NextPage = (props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;
  const { data, status, error } = useGetUserProfileQuery(getClient(), {
    id: String(id),
  });
  const [editMode, setEditMode] = useState(false);
  const { data: session } = useSession();

  const [twitterUrl, setTwitterUrl] = useState(
    data?.usersPermissionsUser?.data?.attributes?.twitterUrl ?? ""
  );
  const [linkedinUrl, setLinkedinUrl] = useState(
    data?.usersPermissionsUser?.data?.attributes?.linkedinUrl ?? ""
  );
  const [bio, setBio] = useState(
    data?.usersPermissionsUser?.data?.attributes?.bio ?? ""
  );

  const updateProfile = useUpdateMeMutation(
    getClient(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getUserProfile", { id: String(id) }]);
        reset();
        setEditMode(false);
      },
    },
    {
      Authorization: `Bearer ${session?.jwt}`,
    }
  );

  const onSubmit = () => {
    const variables = {
      bio,
      twitterUrl,
      linkedinUrl,
      id: String(id),
    };

    updateProfile.mutate(variables);
  };

  const reset = () => {
    setTwitterUrl("");
    setLinkedinUrl("");
    setBio("");
  };

  const fill = () => {
    setTwitterUrl(
      data?.usersPermissionsUser?.data?.attributes?.twitterUrl ?? ""
    );
    setLinkedinUrl(
      data?.usersPermissionsUser?.data?.attributes?.linkedinUrl ?? ""
    );
    setBio(data?.usersPermissionsUser?.data?.attributes?.bio ?? "");
  };
  if (!id || !Boolean(id)) {
    // return error page
    return <DefaultErrorPage statusCode={404} />;
  }

  const seo = {
    title: `Profile Page`,
    description: `Profile page of users on SEWB.`,
    nofollow: true,
    noindex: true,
  };

  return (
    <Content classNames="text-justify">
      <NextSeo {...seo} />
      <DataWrapper status={status}>
        <div className="h-screen   flex flex-wrap items-center  justify-center  ">
          <div className="container rounded-md lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 dark:bg-gray-900 bg-gray-200  shadow-lg    transform   duration-200 easy-in-out">
            <div className=" h-32 overflow-hidden relative">
              <Image
                src={ProfileCoverImg}
                className="w-full"
                alt="Profile page cover image"
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            <div className="flex justify-center px-5  -mt-12 z-50">
              {Boolean(
                data?.usersPermissionsUser?.data?.attributes?.avatar?.data
              ) ? (
                <img
                  className="h-32 w-32 bg-white dark:bg-gray-600 p-2 rounded-full  z-10 "
                  src={Helpers.getImageURL(
                    String(
                      data?.usersPermissionsUser?.data?.attributes?.avatar?.data
                        ?.attributes?.url
                    )
                  )}
                  alt={
                    data?.usersPermissionsUser?.data?.attributes?.avatar?.data
                      ?.attributes?.alternativeText ??
                    `${data?.usersPermissionsUser?.data?.attributes?.username} profile picture.`
                  }
                />
              ) : (
                <img
                  className="h-32 w-32 bg-white dark:bg-gray-600 p-2 rounded-full  z-10 "
                  src="/img/default-user.png"
                  alt="default profile image"
                />
              )}
            </div>
            <div className=" ">
              <div className="text-center px-14">
                <h2 className=" text-3xl font-bold">
                  {data?.usersPermissionsUser?.data?.attributes?.username}
                </h2>
                {Number(session?.user.id) === Number(id) &&
                  (editMode ? (
                    <button
                      className="rounded text-red-400 mt-2 hover:text-red-700"
                      onClick={() => setEditMode(false)}
                    >
                      Click me to cancel
                    </button>
                  ) : (
                    <button
                      className="rounded text-yellow-600 mt-2"
                      onClick={() => {
                        fill();
                        setEditMode(true);
                      }}
                    >
                      Click me to edit your profile
                    </button>
                  ))}

                {!editMode && (
                  <p className="mt-2 text-gray-600">
                    {data?.usersPermissionsUser?.data?.attributes?.bio ??
                      "No bio yet."}
                  </p>
                )}
              </div>
              {editMode && (
                <form
                  className="mx-10 mt-5"
                  onReset={(e) => reset()}
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                  }}
                >
                  <label htmlFor="twitterUrl">You twitter url.</label>
                  <input
                    className="block w-full p-2 my-2 rounded dark:bg-gray-700 shadow-xl focus:outline-none"
                    type="url"
                    id="twitterUrl"
                    value={twitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
                    placeholder="Your twitter url..."
                  />
                  <label htmlFor="linkedinUrl">Your linkedin url.</label>
                  <input
                    className="block w-full p-2 my-2 rounded dark:bg-gray-700 shadow-xl focus:outline-none"
                    type="url"
                    id="linkedinUrl"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="Your linkedin url..."
                  />
                  <div className="flex flex-col mb-5 md:w-full">
                    <label htmlFor="bio">Your bio.</label>
                    <textarea
                      className={`rounded-md max-w-full mt-2 h-${
                        bio.length > 0 ? "36" : "10"
                      } p-2 dark:bg-gray-700 shadow-xl focus:outline-none`}
                      value={bio}
                      id="bio"
                      onChange={(e) => setBio(e.target.value)}
                      placeholder={`Who is ${
                        data?.usersPermissionsUser?.data?.attributes
                          ?.username ?? "'me'"
                      } ?`}
                    ></textarea>
                  </div>
                  <div className="flex justify-end mb-3">
                    <button
                      className={`md:self-end mt-4 bg-gray-100 shadow-sm hover:text-blue-100 hover:bg-red-600 text-red-600 w-24 mr-4  rounded-lg py-2`}
                      type="reset"
                    >
                      Reset
                    </button>
                    <button
                      className={`md:self-end mt-4 bg-blue-500 w-24 hover:bg-blue-700  rounded-lg py-2 text-white`}
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
              <hr className="mt-6" />
              {(data?.usersPermissionsUser?.data?.attributes?.linkedinUrl ||
                data?.usersPermissionsUser?.data?.attributes?.twitterUrl) &&
                !editMode && (
                  <div className="flex  dark:bg-gray-800 bg-gray-300 ">
                    {data.usersPermissionsUser.data.attributes.linkedinUrl && (
                      <div className="text-center w-1/2 p-4  cursor-pointer">
                        <a
                          href={
                            data.usersPermissionsUser.data.attributes
                              .linkedinUrl
                          }
                          className="hover:text-blue-400"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Linkedin
                        </a>
                      </div>
                    )}
                    {data.usersPermissionsUser.data.attributes.twitterUrl && (
                      <div className="border-l  text-center w-1/2 p-4  cursor-pointer">
                        <a
                          href={
                            data.usersPermissionsUser.data.attributes.twitterUrl
                          }
                          className="hover:text-blue-400"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Twitter
                        </a>
                      </div>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>
      </DataWrapper>
    </Content>
  );
};

export default ProfilePage;
