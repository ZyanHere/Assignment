/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {


    domains: [
      // allow S3 bucket images
      'lastminutedeal.s3.ap-southeast-2.amazonaws.com',
      // if you ever host images on your own API domain, add it here too:
      // 'lmd-user-2ky8.onrender.com',
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
