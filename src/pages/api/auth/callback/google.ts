// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from '@customTypes/user';
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { getClient } from 'utils/client';
import { withSentry } from '@sentry/nextjs';
import Helpers from 'utils/helpers';

const { STRAPI_BACKEND_URL } = process.env;
const ThirtyDays = 30 * 24 * 60 * 60;
type Data = {
    message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'GET') {
            res.status(405).json({ message: 'Only POST requests allowed' });
            return;
        }

        const access_token = req.query.access_token;

        const response = await fetch(
            `${STRAPI_BACKEND_URL}/api/auth/google/callback?access_token=${access_token}`
        );
        const data = (await response.json()) as User;
        setCookie({ res }, 'userJWT', data.jwt, {
            maxAge: ThirtyDays,
            path: '/',
            // todo test that this two additions doesn't cause side effect
            secure: Helpers.isProduction()
        });
        setCookie({ res }, 'userData', JSON.stringify(data.user), {
            maxAge: ThirtyDays,
            path: '/',
            // todo test that this two additions doesn't cause side effect
            secure: Helpers.isProduction()
        });

        const client = getClient();
        client.setHeader('Authorization', `Bearer ${data.jwt}`);
        const cookies = parseCookies({ req });
        const { redirectTo } = cookies;
        if (redirectTo && redirectTo.length !== 0) {
            res.redirect(redirectTo).end();
        } else {
            res.redirect('/').end();
        }
    } catch (error) {
        console.log(error);
        res.status(405).end();
    }
};

export default withSentry(handler);
