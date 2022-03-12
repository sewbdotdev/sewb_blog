// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@customTypes/user";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseCookies, setCookie, destroyCookie } from "nookies";
const { STRAPI_BACKEND_URL } = process.env;
const ThirtyDays = 30 * 24 * 60 * 60;
type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== "GET") {
      console.log(res);
      res.status(405).json({ message: "Only POST requests allowed" });
      return;
    }

    const access_token = req.query.access_token;
    console.log(access_token);

    const response = await fetch(
      `${STRAPI_BACKEND_URL}/api/auth/google/callback?access_token=${access_token}`
    );
    const data = (await response.json()) as User;
    setCookie({ res }, "userJWT", data.jwt, {
      maxAge: ThirtyDays,
      path: "/",
    });
    setCookie({ res }, "userData", JSON.stringify(data.user), {
      maxAge: ThirtyDays,
      path: "/",
    });
    const cookies = parseCookies({ req });
    const { redirectTo } = cookies;
    if (redirectTo && redirectTo.length !== 0) {
      res.redirect(redirectTo).end();
    } else {
      res.redirect("/").end();
    }
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(405).end();
  }
}
