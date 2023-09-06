/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.resolve.fallback = {
            "magic-sdk": false,
            "@walletconnect/ethereum-provider": false,
            "@web3auth/web3auth": false,
        }
        return config
    },
    output: "export",
}

module.exports = nextConfig
