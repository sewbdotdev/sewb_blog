// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const {STRAPI_BACKEND_URL} = process.env


type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method !== "GET"){
        console.log(res)
        res.status(405).json({ message: 'Only POST requests allowed' })
        return
    }

    res.status(200).json({ message: 'Login Successful' })

    const access_token = req.query.access_token
    console.log(access_token)
    
    fetch(
      `${STRAPI_BACKEND_URL}/api/auth/google/callback?access_token=${access_token}`)
      .then(res => {
        if (res.status !== 200){
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res
      })
      .then(res => res.json())
      .then(res => console.log(res)) // res should contain the jwt and user object
      .catch(err => {
        console.log(err)
      })

}
