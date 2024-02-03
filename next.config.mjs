/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental :{  
    serverComponentsExternalPackages : [
        '@react-dom/server'
    ]
   }
};

export default nextConfig;
