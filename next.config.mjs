/** @type {import('next').NextConfig} */
const nextConfig = {
    staticPageGenerationTimeout: 300,
    images: {
      domains: [
        'www.notion.so',
        'notion.so',
        'images.unsplash.com',
        'pbs.twimg.com',
        'abs.twimg.com',
        's3.us-west-2.amazonaws.com',
        'transitivebullsh.it',
        'prod-files-secure.s3.us-west-2.amazonaws.com',
        'lh3.googleusercontent.com'
      ],
      formats: ['image/avif', 'image/webp'],
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
    }
};

export default nextConfig;

