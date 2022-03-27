import React from 'react';
import { signIn } from 'utils/session';

const DataCyPrefix = 'AuthPromptComponent';

const AuthPrompt = () => {
    return (
        <section className="text-justify" data-cy={`${DataCyPrefix}Container`}>
            <h2 className="font-semibold mb-2 text-xl" data-cy={`${DataCyPrefix}Heading`}>
                Ooops.. You are not authenticated.
            </h2>
            <p data-cy={`${DataCyPrefix}Paragraph`}>
                Authenticating unlocks more features like commenting and many more.{' '}
                <span
                    onClick={() => {
                        signIn();
                    }}
                    className="text-red-600 cursor-pointer"
                >
                    Sign in
                </span>{' '}
                here.
            </p>
        </section>
    );
};

export default AuthPrompt;
