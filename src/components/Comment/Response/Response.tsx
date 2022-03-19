import React, { FunctionComponent, useState } from "react";
import TestImage2 from "/public/img/test-2.jpeg";
import Image from "next/image";
import { useQueryClient } from "react-query";
import { PencilIcon, TrashIcon, XIcon } from "@heroicons/react/outline";
import {
  CommentEntity,
  GetCommentsQueryVariables,
  UpdateCommentMutationVariables,
  useUpdateCommentMutation,
} from "@customTypes/generated/graphql";
import dateFormatter from "utils/dateFormatter";
import { useSession } from "utils/session";
import TextBox from "../TextBox";
import { getClient } from "utils/client";
type ResponseProps = {
  hideLastBorder?: boolean;
  comment: CommentEntity;
  commentCacheKey: GetCommentsQueryVariables;
};

const Response: FunctionComponent<ResponseProps> = (props) => {
  const { hideLastBorder = false, comment, commentCacheKey } = props;
  const { data: userData } = useSession();
  const [editMode, setEditMode] = useState(false);

  const [data, setData] = useState(comment);
  const queryClient = useQueryClient();
  const updateComment = useUpdateCommentMutation(
    getClient(),
    {
      onSuccess: (resp) => {
        setData(resp.updateComment?.data as CommentEntity);
        queryClient.invalidateQueries("getComments");
      },
    },
    {
      Authorization: `Bearer ${userData?.jwt}`,
    }
  );

  const handleUpdate = (content: string, cb: Function) => {
    const variable = {
      content,
      id: comment.id,
    };
    updateComment.mutate(variable as UpdateCommentMutationVariables, {
      onSuccess: () => {
        cb();
        setEditMode(false);
      },
    });
  };

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
            {data.attributes?.author?.data?.attributes?.username}
          </h4>
          <p className="text-xs">
            {dateFormatter(comment.attributes?.createdAt)}
          </p>
        </div>

        {/* !(
          Number(data?.user.id) === Number(data.attributes?.author?.data?.id)
        ) &&  */}
        {
          <div className="ml-auto flex gap-5 self-center">
            {editMode ? (
              <XIcon
                className="h-6 w-7 text-red-400 cursor-pointer"
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
        }
      </div>
      {editMode ? (
        <TextBox
          defaultValue={comment.attributes?.content ?? ""}
          autoFocus={true}
          onSubmit={handleUpdate}
          loading={updateComment.isLoading}
        />
      ) : (
        <p className="text-sm">{data.attributes?.content}</p>
      )}
      {!hideLastBorder && (
        <hr className="border-gray-500 group-last:hidden mt-3" />
      )}
    </div>
  );
};

export default Response;
