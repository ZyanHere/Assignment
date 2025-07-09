/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
    domains: [
      'lastminutedeal.s3.ap-southeast-2.amazonaws.com',
      'example.com',
      // any other hosts you fetch images from…
    ],
    // alternatively, you can use `remotePatterns` for more control:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'lastminutedeal.s3.ap-southeast-2.amazonaws.com',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  },
//     ignoreBuildErrors: true,

};

export default nextConfig;
