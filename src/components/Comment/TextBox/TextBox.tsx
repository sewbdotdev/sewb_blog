import React, { FunctionComponent, useState } from "react";

const TextBox: FunctionComponent = (props) => {
  const [text, setText] = useState("");
  return (
    <div className="flex flex-col mb-5 md:w-full sticky top-0 z-50">
      <textarea
        className={`rounded-sm max-w-full h-${
          text.length > 0 ? "36" : "10"
        } p-2 dark:bg-gray-700`}
        placeholder="Speak, the world is listening..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {text.length > 0 && (
        <button className="md:self-end mt-4 bg-blue-500 w-24 rounded-lg py-1 text-white">
          Submit
        </button>
      )}
    </div>
  );
};

export default TextBox;
