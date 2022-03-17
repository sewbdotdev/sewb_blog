import React, { FunctionComponent } from "react";
import TestImage2 from "/public/img/test-2.jpeg";
import Image from "next/image";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
type ResponseProps = {
  hideLastBorder?: boolean;
  isCommentOwner?: boolean;
};

const Response: FunctionComponent<ResponseProps> = (props) => {
  const { hideLastBorder = false, isCommentOwner = false } = props;
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
          <h4 className="text-base font-bold">My name goes here</h4>
          <p className="text-gray-200 text-xs">Date goes here</p>
        </div>
        {!isCommentOwner && (
          <div className="ml-auto flex gap-5 self-center">
            <PencilIcon className="h-6 w-7 text-blue-500" />
            <TrashIcon className="h-6 w-7  text-yellow-500" />
          </div>
        )}
      </div>
      <p className="text-sm">
        Auctor augue mauris augue neque. Et tortor consequat id porta. Auctor
        elit sed vulputate mi sit. Porta lorem mollis aliquam ut porttitor leo.
        Integer feugiat scelerisque varius morbi. Ullamcorper dignissim cras
        tincidunt lobortis feugiat vivamus. Sed libero enim sed faucibus turpis
        in eu mi bibendum. Condimentum vitae sapien pellentesque habitant morbi
        tristique senectus et. Sodales ut etiam sit amet nisl purus. Eros donec
        ac odio tempor orci dapibus ultrices in iaculis. Fringilla ut morbi
        tincidunt augue interdum velit euismod in pellentesque. Suspendisse sed
        nisi lacus sed viverra tellus. Adipiscing commodo elit at imperdiet dui
        accumsan. Id semper risus in hendrerit.
      </p>
      {!hideLastBorder && (
        <hr className="border-gray-500 group-last:hidden mt-3" />
      )}
    </div>
  );
};

export default Response;
