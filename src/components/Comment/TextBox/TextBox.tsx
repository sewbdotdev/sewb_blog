import React, { FunctionComponent, useState } from 'react';
import { CloudUploadIcon, UploadIcon } from '@heroicons/react/solid';
import Spinner from '@/components/CustomIcons/Spinner';
type TextBoxProps = {
    defaultValue?: string;
    autoFocus?: boolean;
    onSubmit: (value: string, cb: () => void) => void;
    loading?: boolean;
    placeHolder?: string;
    isButtonHidden?: boolean;
};

const DataCyPrefix = 'TextBoxComponent';

const TextBox: FunctionComponent<TextBoxProps> = (props) => {
    const {
        defaultValue = '',
        placeHolder = 'Speak, the world is listening...',
        autoFocus = false,
        loading = false,
        isButtonHidden = false,
        onSubmit
    } = props;
    const [text, setText] = useState(defaultValue);

    const callback = () => {
        setText('');
    };

    return (
        <div className="flex flex-col mb-5 md:w-full" data-cy={`${DataCyPrefix}Container`}>
            <textarea
                data-cy={`${DataCyPrefix}TextArea`}
                className={`rounded-md max-w-full h-${
                    text.length > 0 ? '36' : '10'
                } p-2 dark:bg-gray-700 shadow-xl focus:outline-none`}
                autoFocus={autoFocus}
                onFocus={(e) => e.target.setSelectionRange(text.length, text.length)}
                placeholder={placeHolder}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isButtonHidden) {
                        onSubmit(text, callback);
                    }
                }}
            />
            {text.length > 0 && !isButtonHidden && (
                <button
                    data-cy={`${DataCyPrefix}SubmitButton`}
                    className={`md:self-end mt-4 ${loading ? 'bg-yellow-500' : 'bg-blue-500'} ${
                        loading ? 'w-32' : 'w-24'
                    }  rounded-lg py-2 text-white  flex  justify-evenly`}
                    onClick={() => {
                        onSubmit(text, callback);
                    }}
                    disabled={loading}
                >
                    {loading && <Spinner className="animate-spin text-white h-5 w-5" />}
                    {loading ? 'Submitting' : 'Submit'}
                </button>
            )}
        </div>
    );
};

export default TextBox;
