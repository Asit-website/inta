/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_SECRET:"Instacertify",
    NEXTAUTH_URL:"https://www.instacertify.com/",
    next:{
      api_url:"https://www.instacertify.com/api/v1/"
    },

    server : {
		path:"https://admin.instacertify.com/",
   		api:"https://admin.instacertify.com/api/",
      	jwt_secret:"UOUkeFnqauTf3qw0Hy6pv1JQq572l82gRBgnNbemPEjV2bTG2Bg0A3avm1svL9gs"
    }
  },
  reactStrictMode: false,
  experimental: {
      scrollRestoration: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['admin.instacertify.com','cdn11.bigcommerce.com'],
  }
}

module.exports = nextConfig