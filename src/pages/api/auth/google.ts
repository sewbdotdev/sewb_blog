// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
const { STRAPI_BACKEND_URL } = process.env;

type Data = {
    name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const PROVIDER = 'google';
    res.redirect(`${STRAPI_BACKEND_URL}/api/connect/${PROVIDER}`).end();
};

export default withSentry(handler);
