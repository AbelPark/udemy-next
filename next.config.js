/** @type {import('next').NextConfig} */

module.exports = () => {
  return {
    reactStrictMode: true,
    env: {
      mongodb_username: "udemy-test",
      mongodb_password: "dgoJkT4NEaFb6YJO",
      mongodb_cluster_name: "cluster0",
      mongodb_database: "next-auth",
    },
  };
};
