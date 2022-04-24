let siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000/';
siteUrl = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`;
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl,
    generateRobotsTxt: true, // (optional)
    robotsTxtOptions: {
        additionalSitemaps: [`${siteUrl}server-sitemap.xml`]
    }
    // ...other options
};
