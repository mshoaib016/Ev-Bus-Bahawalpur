const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "Ev-Bus-Bahawalpur";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isGithubPages ? { output: "export" } : {}),
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? `/${repoName}` : "",
  },
};

export default nextConfig;
