const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "Ev-Bus-Bahawalpur"; // 👈 apne exact GitHub repo ka naam yahan likho

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? `/${repoName}` : "",
  },
};

export default nextConfig;
