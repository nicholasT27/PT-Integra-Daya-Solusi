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
  // The blog used to be called "Insights". Old links to /insights keep working by forwarding to /blog.
  async redirects() {
    return [
      { source: "/insights", destination: "/blog", permanent: true },
      { source: "/insights/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
