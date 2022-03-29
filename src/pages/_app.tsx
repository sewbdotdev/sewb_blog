import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Layout from '../components/Layout';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <ThemeProvider attribute="class">
                    <Layout>
                        <DefaultSeo
                            {...SEO}
                            additionalMetaTags={[
                                {
                                    httpEquiv: 'content-type',
                                    content: 'text/html; charset=utf-8'
                                },
                                {
                                    name: 'viewport',
                                    content: 'width=device-width, initial-scale=1'
                                }
                            ]}
                        />
                        {process.env.NODE_ENV === 'production' && (
                            <>
                                <Script
                                    strategy="lazyOnload"
                                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                                />

                                <Script strategy="lazyOnload">
                                    {`
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS});
                                `}
                                </Script>
                            </>
                        )}
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </Hydrate>
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
    );
}

export default MyApp;
