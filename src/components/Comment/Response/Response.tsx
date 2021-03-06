import React, { FunctionComponent, useState } from 'react';
import DefaultUser from '/public/img/default-user.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { PencilIcon, TrashIcon, XIcon } from '@heroicons/react/outline';
import {
    CommentEntity,
    CommentEntityResponseCollection,
    GetCommentsQueryVariables,
    UpdateCommentMutationVariables,
    useDeleteCommentMutation,
    useUpdateCommentMutation
} from '@customTypes/generated/graphql';
import dateFormatter from 'utils/dateFormatter';
import { useSession } from 'utils/session';
import TextBox from '../TextBox';
import { getClient } from 'utils/client';
import Helpers from 'utils/helpers';
type ResponseProps = {
    hideLastBorder?: boolean;
    comment: CommentEntity;
    commentCacheKey: GetCommentsQueryVariables;
};

const DataCyPrefix = 'ResponseComponent';

const Response: FunctionComponent<ResponseProps> = (props) => {
    const { hideLastBorder = false, comment, commentCacheKey } = props;
    const { data: session } = useSession();
    const [editMode, setEditMode] = useState(false);
    const router = useRouter();
    const [data, setData] = useState(comment);
    const queryClient = useQueryClient();
    const updateComment = useUpdateCommentMutation(
        getClient(),
        {
            onSuccess: (resp) => {
                setData(resp.updateComment?.data as CommentEntity);
                queryClient.invalidateQueries('getComments');
            }
        },
        {
            Authorization: `Bearer ${session?.jwt}`
        }
    );

    const handleUpdate = (content: string, cb: Function) => {
        const variable = {
            content,
            id: comment.id
        };
        updateComment.mutate(variable as UpdateCommentMutationVariables, {
            onSuccess: () => {
                cb();
                setEditMode(false);
            }
        });
    };

    const deleteComment = useDeleteCommentMutation(
        getClient(),
        {
            // onMutate: async (commentToDelete) => {
            //   console.log(commentToDelete);

            //   await queryClient.cancelQueries(["getComments", commentCacheKey]);

            //   // Snapshot the previous value
            //   const previousTodo = queryClient.getQueryData([
            //     "getComments",
            //     commentCacheKey,
            //   ]) as { comments: CommentEntityResponseCollection };
            //   console.log(previousTodo);
            //   const savedTodo = previousTodo;
            //   const commentToDeleteIndex = previousTodo.comments.data.findIndex(
            //     (d) => Number(d.id) === Number(commentToDelete.id)
            //   );

            //   let newComments = [...previousTodo.comments.data];
            //   if (commentToDeleteIndex !== -1) {
            //     newComments = newComments.splice(commentToDeleteIndex, 1);
            //   }

            //   console.log(newComments, "ddkdkdk");

            //   previousTodo.comments.data = newComments;

            //   console.log(previousTodo);
            //   queryClient.setQueryData(
            //     ["getComments", commentCacheKey],
            //     previousTodo
            //   );
            //   return { savedTodo };
            // },

            // onError: (err, commentToDelete, context) => {
            //   queryClient.setQueryData(
            //     ["getComments", commentCacheKey],
            //     // @ts-ignore
            //     context.savedTodo
            //   );
            // },
            onSuccess: (resp) => {
                queryClient.invalidateQueries('getComments');
            }
        },
        {
            Authorization: `Bearer ${session?.jwt}`
        }
    );

    const handleDelete = () => {
        deleteComment.mutate({ id: String(data.id) });
    };

    const isImagePresent = Boolean(
        comment.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.url
    );

    return (
        <div className="flex flex-col py-3 my-4" data-cy={`${DataCyPrefix}Container`}>
            <div className="flex gap-5  mb-4">
                <div className=" h-8 w-8 ">
                    {isImagePresent ? (
                        <Image
                            src={Helpers.getImageURL(
                                comment.attributes?.author?.data?.attributes?.avatar?.data
                                    ?.attributes?.url ?? ''
                            )}
                            data-cy={`${DataCyPrefix}AuthorImage`}
                            onClick={() => {
                                if (comment.attributes?.author?.data?.id) {
                                    router.push(`/profile?id=${comment.attributes.author.data.id}`);
                                } else {
                                    router.push(`/profile?`);
                                }
                            }}
                            alt="the featured image of the blog post. "
                            width={100}
                            height={100}
                            className="inline-block h-6 w-6 rounded-full ring-2 "
                        />
                    ) : (
                        <Image
                            src={DefaultUser}
                            alt="the featured image of the blog post. "
                            width={100}
                            height={100}
                            onClick={() => {
                                if (comment.attributes?.author?.data?.id) {
                                    router.push(`/profile?id=${comment.attributes.author.data.id}`);
                                } else {
                                    router.push(`/profile?`);
                                }
                            }}
                            data-cy={`${DataCyPrefix}AuthorImage`}
                            className="inline-block h-6 w-6 rounded-full ring-2 "
                        />
                    )}
                </div>
                <div className="-mt-1">
                    <h4
                        className="text-base font-bold cursor-pointer"
                        data-cy={`${DataCyPrefix}AuthorName`}
                        onClick={() => {
                            if (comment.attributes?.author?.data?.id) {
                                router.push(`/profile?id=${comment.attributes.author.data.id}`);
                            } else {
                                router.push(`/profile?`);
                            }
                        }}
                    >
                        {data.attributes?.author?.data?.attributes?.username}
                    </h4>
                    <p className="text-xs" data-cy={`${DataCyPrefix}CommentCreatedAt`}>
                        {dateFormatter(comment.attributes?.createdAt)}
                    </p>
                </div>

                {/* !(
          Number(data?.user.id) === Number(data.attributes?.author?.data?.id)
        ) &&  */}
                {Number(session?.user.id) === Number(data.attributes?.author?.data?.id) && (
                    <div className="ml-auto flex gap-5 self-center">
                        {editMode ? (
                            <XIcon
                                className="h-6 w-7 text-red-400 cursor-pointer"
                                onClick={() => setEditMode(false)}
                                data-cy={`${DataCyPrefix}XButton`}
                            />
                        ) : (
                            <PencilIcon
                                className="h-6 w-7 text-blue-500 cursor-pointer"
                                onClick={() => setEditMode(true)}
                                data-cy={`${DataCyPrefix}EditButton`}
                            />
                        )}
                        <TrashIcon
                            className="h-6 w-7  text-yellow-500 cursor-pointer"
                            onClick={() => handleDelete()}
                            data-cy={`${DataCyPrefix}DeleteButton`}
                        />
                    </div>
                )}
            </div>
            {editMode ? (
                <TextBox
                    defaultValue={comment.attributes?.content ?? ''}
                    autoFocus={true}
                    onSubmit={handleUpdate}
                    loading={updateComment.isLoading}
                />
            ) : (
                <p className="text-sm" data-cy={`${DataCyPrefix}AuthorComment`}>
                    {data.attributes?.content}
                </p>
            )}
            {!hideLastBorder && <hr className="border-gray-500 group-last:hidden mt-3" />}
        </div>
    );
};

export default Response;
