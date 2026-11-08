/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets the build process understand Tailwind CSS styles.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
