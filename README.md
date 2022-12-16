# ACCESS

## Github

This is the github repository in which the code lives. There's two git branches, main and develop. Main is what's the live site and develop is for previews. (mostly sth a developer would need to worry about). Updating the repository/ changing a branch will trigger the app to deploy on Vercel, the hosting provider.

## Hosting

**Frontend**

The page is hosted on Vercel and is connected to this repository. (You log in with your GitHub account).
[Link to Vercel](https://vercel.com/ben-ditto/ditto-nation)

The way this app gets data requires access tokens from the services it connects to (patreon, shopify). It also connects to the custom server that handles Discord data. The following variables need to be defined (with those exact names) in the hosting environment, otherwise th project can't get data and any buid will fail. In the Vercel project this is done under `Settings -> Environment Variables`

**DO NOT SHARE THESE VALUES IN A NON-ENCRYPTED WAY AND DON'T STORE THEM PUBLICLY**

Variables:

- NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=yourShopifyStorefrontAccessToken
- NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store-domain.myshopify.com
- NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN=yourShopifyAdminAccessToken
- NEXT_PUBLIC_PATREON_ACCESS_TOKEN=yourPatreonAccessToken
- NEXT_PUBLIC_PATREON_CLIENT_SECRET=yourPatreonClientSecret
- NEXT_PUBLIC_PATREON_CLIENT_ID=yourPatreonClientID
- NEXT_PUBLIC_DISCORD_SERVER_DOMAIN=https://discord-server.onrender.com

The values for these come from the respective platforms and can be found there. E.g. in Shopify under `settings -> apps -> development` If a token needs to be renewed on Shopify for some reason it needs to be updated in the Vercel settings also.

The code to the Discord server is also on your GitHub in a [separate repository](https://github.com/ben-ditto/discord-server).

**Discord Server**

The discord server is a custom Node.js Server hosted on [Render](https://dashboard.render.com/) for free. On render you also log in with this GitHub account. The code is connected to [this repo](https://github.com/ben-ditto/discord-server) and any update will trigger a deploy similarly to the frontend. Here there are environment variables aswell

- CORS_DOMAINS=http://localhost:3000, https://ditto-nation.com, https://ditto-nation.vercel.app, https://ditto-nation-git-develop-ben-ditto.vercel.app/
- DISCORD_BOT_TOKEN=yourBotToken
- NODE_VERSION=16.14.1

CORS_DOMAINS defines the domains that can request data from this server. NODE_VERSION specifies the version of Node.js to be run on the server (16+). And DISCORD_BOT_TOKEN is the secret token for the bot that does all the discord stuff. Essentially you will always be able to create a new bot and replace this token and it should work the same (given it has the same access rights).

## Shopify Specifics

Most of the data on this page comes from Shopify (ditto-nation.myshopify.com). The backend is independent from the Frontend as it is a headless build and only works via the API. [reference to headless](https://www.shopify.com/plus/solutions/headless-commerce)

Updating/ adding new products will reflect on the Frontend. Checkout is handled by shopify entirely (in fact the checkout in the frontend just links to a regular shopify checkout page).
The cover image for the homepage can be altered under `settings -> brand: cover image`
Since shopify isn't really a CMS specialized on content other than Shop Stuff most other content is hard coded. (e.g. about page under pages/about in the code).

---

# CODING / DEVELOPER SECTION

Requires an installation of Node 16+, npm and git [reference](https://developer.salesforce.com/docs/atlas.en-us.mobile_sdk.meta/mobile_sdk/install_node_js.htm)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, create a file called .env at the root and add the Environment variables as referenced above.

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
