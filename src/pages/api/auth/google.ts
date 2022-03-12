// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const { STRAPI_BACKEND_URL } = process.env;

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const PROVIDER = "google";
  return res.redirect(`${STRAPI_BACKEND_URL}/api/connect/${PROVIDER}`).end();
}
