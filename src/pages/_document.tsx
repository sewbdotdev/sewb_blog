import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="icon" href="/img/favicon/favicon.ico" />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/img/favicon/favicon-512x512.png"
                    />

                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/img/favicon/favicon-512x512.png"
                    />

                    <link
                        rel="icon"
                        type="image/png"
                        sizes="192x192"
                        href="/img/favicon/favicon-192x192.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="512x512"
                        href="/img/favicon/favicon-512x512.png"
                    />
                </Head>
                <body className="dark:bg-black bg-gray-200 dark:text-gray-200">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
