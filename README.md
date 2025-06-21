<h1 align="center">Welcome to DayZ Bastardos Leaderboard 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://mit-license.org/" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

## 📋 About This Project

This is an **adapted version** of the original [dayz-leaderboard-next](https://github.com/Mirasaki/dayz-leaderboard-nextjs) project, specifically customized for the **DayZ Bastardos Server**. 

**Original Copyright:** This project is based on the work of [Richard Hillebrand (Mirasaki)](https://github.com/Mirasaki) and maintains the original MIT license.

**Current Author:** [Kyriokes](https://github.com/Kyriokes) - Author of this adapted version for the DayZ Bastardos Server.

---

This is a DayZ leaderboard website created with [NextJS](https://nextjs.org) using data collected and provided by the [CFTools Data API](https://app.cftools.cloud/). This adaptation has been customized specifically for the DayZ Bastardos Server community.

> 😎 Have any questions about this Bastardos Server adaptation? Feel free to reach out!

> 💡 Have any feedback or feature suggestions for the Bastardos version? [Create a new issue](https://github.com/Kyriokes/Bastardos/issues)

## 🎮 DayZ Bastardos Server Features

- Shows the top 100 leaderboard for the DayZ Bastardos Server
- Query by in-game name **or** Steam64/CFTools ID if you're not on the leaderboard
- Display detailed player statistics for Bastardos Server players
- Customized theming and branding for the Bastardos community
- Optimized configuration for the Bastardos Server environment
- Social media previews showcasing the Bastardos community

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

**TLDR:** Fork the repo, authorize Vercel to manage your fork and watch it deploy the site to a live domain for you.

## 🔨 Installation

1. Download and extract [the latest release](https://github.com/Kyriokes/Bastardos/releases) and navigate to the newly created folder
2. Rename `.env.example` to `.env` (make sure displaying file extensions is enabled) and fill in your configuration. The **only** required variables are:
    - `CFTOOLS_API_APPLICATION_ID`: Application ID from your [CFTools Developer Apps](https://developer.cftools.cloud/applications) - Authorization has to be granted by navigating to the `Grant URL` that's displayed in your app overview
    - `CFTOOLS_API_SECRET`: Same as above, click `Reveal Secret`
    - `CFTOOLS_SERVER_API_ID`: Click `Manage Server` in your [CF Cloud Panel](https://app.cftools.cloud/dashboard) > `Settings` > `API Key` > `Server ID`
3. Rename `config.example.json` to `config.json` and customize the project for the Bastardos Server
4. Run the following commands in this exact order:

```sh
# Install dependencies
npm install

# Build the project
npm run build

# Start the project
npm run start
```

The project is now available on [port 3002](http://localhost:3002/). This is only available on your local network.

To allow anyone to reach your website basic knowledge of web-servers (like [Apache](https://apache.org/) or [Nginx](https://nginx.org/en/)) is required.

- An example Nginx file is included for your convenience.
- With this conf Nginx serves all static assets, if these fail to load (like no styles applied to the website) use the minimal conf instead

## ⚙️ Configuration

The configuration has been pre-customized for the DayZ Bastardos Server but can be further modified in the `config.json` file.

### .env

```bash
# CFTools API Credentials - The ONLY required values here
# CFTOOLS_SERVER_API_ID will only be used AS THE DEFAULT
# when using multiple server setup in the config file
CFTOOLS_API_APPLICATION_ID=
CFTOOLS_API_SECRET=
CFTOOLS_SERVER_API_ID=

# Runtime Environment - production/development/staging
NODE_ENV=production

# Development-only - Analyze the app bundle
ANALYZE=true

# If provided, uses these values for the og:image meta tag (discord embed link previews)
# If omitted, uses your branding logo from the config file as a small image
NEXT_PUBLIC_IMAGE_URL=
NEXT_PUBLIC_LARGE_OG_IMAGE=false
```

### Bastardos Server Customization

This version includes specific customizations for the DayZ Bastardos Server:
- Custom branding and theming
- Server-specific configuration
- Optimized player statistics display
- Community-focused features

## Common Issues

### ERR_ABORTED
If you're getting `net::ERR_ABORTED 404` errors, that means you have created a new production build (`npm run build`) but the process listening on your port is still trying to serve previous build files - fix this by restarting your process.

## Authors

👤 **Kyriokes** - *Author of Bastardos Server Adaptation*
- Github: [@Kyriokes](https://github.com/Kyriokes)

👤 **Richard Hillebrand (Mirasaki)** - *Original Project Creator*
- Website: [https://mirasaki.dev/](https://mirasaki.dev/)
- Github: [@Mirasaki](https://github.com/Mirasaki)

## 🤝 Contributing

Contributions, issues and feature requests are welcome for the Bastardos Server adaptation!<br />Feel free to check [issues page](https://github.com/Kyriokes/Bastardos/issues).

## Show your support

Give a ⭐️ if this Bastardos Server adaptation helped you!

## 📝 License

**Original Copyright:** Copyright © 2023 [Richard Hillebrand (Mirasaki)](https://github.com/Mirasaki).<br />
**Adaptation Copyright:** Copyright © 2024 [Kyriokes](https://github.com/Kyriokes).<br />

This project maintains the original [MIT](https://mit-license.org/) license.

---

*This project is an adaptation of the original dayz-leaderboard-next by Mirasaki, customized specifically for the DayZ Bastardos Server community.*
```

