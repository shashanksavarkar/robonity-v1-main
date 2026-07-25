/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "robonity-v1-main.vercel.app",
          },
        ],
        destination: "https://robonity-gsv.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
