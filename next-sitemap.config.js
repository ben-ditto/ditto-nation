/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://ditto-nation.vercel.app/', // Production
    generateRobotsTxt: true // (optional)
    // ...other options
}