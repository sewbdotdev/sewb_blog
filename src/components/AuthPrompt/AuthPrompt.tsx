import React from "react";
import { useSession, signIn } from "utils/session";
import Link from "next/link";
const AuthPrompt = () => {
  return (
    <section className="text-justify ">
      <h2 className="font-semibold mb-2 text-xl">
        Ooops.. You are not authenticated.
      </h2>
      <p>
        Authenticating unlocks more features like commenting and many more.{" "}
        <span
          onClick={() => {
            signIn();
          }}
          className="text-red-600 cursor-pointer"
        >
          Sign in
        </span>{" "}
        here.
      </p>
    </section>
  );
};

export default AuthPrompt;
