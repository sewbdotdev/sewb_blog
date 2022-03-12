// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { STRAPI_BACKEND_URL } = process.env;

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
    const data = await response.json();

    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(405).end();
  }
}
