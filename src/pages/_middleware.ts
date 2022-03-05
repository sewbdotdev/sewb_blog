import { NextResponse, NextRequest } from 'next/server'
const {STRAPI_BACKEND_URL} = process.env
export async function middleware(req: NextRequest, ev: any) {
    const { pathname } = req.nextUrl
    if (pathname == '/connect-with-google') {
        const PROVIDER = "google"
        console.log(STRAPI_BACKEND_URL + `/api/connect/${PROVIDER}`)
        return NextResponse.redirect(STRAPI_BACKEND_URL + `/api/connect/${PROVIDER}`)
    }
    return NextResponse.next()
}

