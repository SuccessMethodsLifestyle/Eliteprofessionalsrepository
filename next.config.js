/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_TELEGRAM_GROUP_LINK: process.env.TELEGRAM_GROUP_LINK || 'https://t.me/+your_group_invite_code',
    NEXT_PUBLIC_TELEGRAM_CHANNEL_LINK: process.env.TELEGRAM_CHANNEL_LINK || 'https://t.me/EliteProfessionals',
  }
}

module.exports = nextConfig