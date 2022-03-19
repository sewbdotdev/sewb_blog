import React, { FunctionComponent, useState } from "react";
import TestImage2 from "/public/img/test-2.jpeg";
import Image from "next/image";
import { PencilIcon, TrashIcon, XIcon } from "@heroicons/react/outline";
import { CommentEntity } from "@customTypes/generated/graphql";
import dateFormatter from "utils/dateFormatter";
import { useSession } from "utils/session";
import TextBox from "../TextBox";
type ResponseProps = {
  hideLastBorder?: boolean;
  comment: CommentEntity;
};

const Response: FunctionComponent<ResponseProps> = (props) => {
  const { hideLastBorder = false, comment } = props;
  const { data } = useSession();

  const [editMode, setEditMode] = useState(false);
  return (
    <div className="flex flex-col py-3 my-4">
      <div className="flex gap-5  mb-4">
        <div className=" h-8 w-8 ">
          <Image
            src={TestImage2}
            alt="the featured image of the blog post. "
            width={100}
            height={100}
            className="inline-block h-6 w-6 rounded-full ring-2 "
          />
        </div>
        <div className="-mt-1">
          <h4 className="text-base font-bold">
            {comment.attributes?.author?.data?.attributes?.username}
          </h4>
          <p className="text-xs">
            {dateFormatter(comment.attributes?.createdAt)}
          </p>
        </div>
        {!(
          Number(data?.user.id) === Number(comment.attributes?.author?.data?.id)
        ) && (
          <div className="ml-auto flex gap-5 self-center">
            {editMode ? (
              <XIcon
                className="h-6 w-7 text-red-400 cursor-pointer"
                // motion-safe:animate-bounce duration-100
                onClick={() => setEditMode(false)}
              />
            ) : (
              <PencilIcon
                className="h-6 w-7 text-blue-500 cursor-pointer"
                onClick={() => setEditMode(true)}
              />
            )}
            <TrashIcon className="h-6 w-7  text-yellow-500 cursor-pointer" />
          </div>
        )}
      </div>
      {editMode ? (
        <TextBox value={comment.attributes?.content ?? ""} autoFocus={true} />
      ) : (
        <p className="text-sm">{comment.attributes?.content}</p>
      )}
      {!hideLastBorder && (
        <hr className="border-gray-500 group-last:hidden mt-3" />
      )}
    </div>
  );
};

export default Response;
