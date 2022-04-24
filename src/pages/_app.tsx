import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Layout from '../components/Layout';
import { Hydrate, QueryClient, QueryClientProvider, setLogger } from 'react-query';
import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import Script from 'next/script';
import { captureException, captureMessage, ErrorBoundary } from '@sentry/nextjs';
import Helpers from 'utils/helpers';

setLogger({
    log: (message) => {
        captureMessage(message);
    },
    warn: (message) => {
        captureMessage(message);
    },
    error: (error) => {
        captureException(error);
    }
});

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
                        {Helpers.isProduction() && (
                            <>
                                <Script
                                    strategy="afterInteractive"
                                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                                />

                                <Script
                                    strategy="afterInteractive"
                                    id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}
                                >
                                    {`
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
                                `}
                                </Script>
                            </>
                        )}
                        <ErrorBoundary
                            fallback={({ error, componentStack, resetError }) => (
                                <React.Fragment>
                                    <div>You have encountered an error</div>
                                    <div>{error.toString()}</div>
                                    <div>{componentStack}</div>
                                </React.Fragment>
                            )}
                            showDialog
                        >
                            <Component {...pageProps} />
                        </ErrorBoundary>
                    </Layout>
                </ThemeProvider>
            </Hydrate>
            {Helpers.isDevelopment() && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
    );
}

export default MyApp;
