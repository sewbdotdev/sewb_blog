/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');

// const ContentSecurityPolicy = `
//   frame-ancestors giscus.app 'self';
// `;

// const securityHeaders = [
//     {
//         key: 'Content-Security-Policy',
//         value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
//     }
// ];
const nextConfig = {
    reactStrictMode: true,
    // async headers() {
    //     return [
    //         {
    //             source: '/(.*)',
    //             headers: securityHeaders
    //         }
    //     ];
    // },
    webpack: (config) => {
        // Find the base rule that contains nested rules (which contains css-loader)
        const rules = config.module.rules.find((r) => !!r.oneOf);

        // Interate over the found rules
        rules.oneOf.forEach((loaders) => {
            // Focus on the the loaders that have an array of `use` statements
            if (Array.isArray(loaders.use)) {
                // Iterate over each of the loaders
                loaders.use.forEach((l) => {
                    // Only focus on loaders that are an object and have a `loader` property set to `css-loader`
                    if (
                        typeof l !== 'string' &&
                        typeof l.loader === 'string' &&
                        /(?<!post)css-loader/.test(l.loader)
                    ) {
                        // If there are no module options originally set, skip this loader
                        if (!l.options.modules) return;
                        const { getLocalIdent, ...others } = l.options.modules;

                        // Create a new options object with the `getLocalIdent` property set to a function
                        l.options = {
                            ...l.options,
                            modules: {
                                ...others,
                                getLocalIdent: (ctx, localIdentName, localName) => {
                                    // If the class name is `dark`, return it instead of hashing it
                                    if (localName === 'dark') return localName;
                                    // Otherwise, call the original function and return the value
                                    return getLocalIdent(ctx, localIdentName, localName);
                                }
                            }
                        };
                    }
                });
            }
        });

        return config;
    },
    images: {
        domains: ['localhost', 'res.cloudinary.com', 'media.giphy.com']
    }
};

const sentryWebpackPluginOptions = {
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore
    token: process.env.SENTRY_AUTH_TOKEN,
    silent: true // Suppresses all logs
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
