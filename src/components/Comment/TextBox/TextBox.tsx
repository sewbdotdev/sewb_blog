import React, { FunctionComponent, useState } from "react";

type TextBoxProps = {
  value?: string;
  autoFocus?: boolean;
};

const TextBox: FunctionComponent<TextBoxProps> = (props) => {
  const { value = "", autoFocus = false } = props;
  const [text, setText] = useState(value);
  return (
    <div className="flex flex-col mb-5 md:w-full">
      <textarea
        className={`rounded-md max-w-full h-${
          text.length > 0 ? "36" : "10"
        } p-2 dark:bg-gray-700 shadow-xl focus:outline-none`}
        autoFocus={autoFocus}
        defaultValue={value}
        onFocus={(e) => e.target.setSelectionRange(text.length, text.length)}
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
