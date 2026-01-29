import type { NextConfig } from "next"

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com", "cdn.auth0.com"],
    },
}

export default nextConfig
