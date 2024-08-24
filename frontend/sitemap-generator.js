import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

async function generateSitemap() {
  const sitemap = new SitemapStream({
    hostname: "https://lnworld-clone.onrender.com",
  });
  const writeStream = createWriteStream("./public/sitemap.xml");

  sitemap.pipe(writeStream);

  // Define your static routes
  const staticRoutes = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/search", changefreq: "daily", priority: 0.8 },
    { url: "/tag", changefreq: "daily", priority: 0.8 },
    { url: "/browse", changefreq: "daily", priority: 0.8 },
    { url: "/auth", changefreq: "monthly", priority: 0.6 },
    { url: "/ranking", changefreq: "weekly", priority: 0.7 },
    { url: "/latest-updates", changefreq: "weekly", priority: 0.7 },
    { url: "/searchadv", changefreq: "weekly", priority: 0.6 },
    { url: "/notices", changefreq: "monthly", priority: 0.5 },
    { url: "/not-found", changefreq: "monthly", priority: 0.4 },
    // Add other static routes here
  ];

  // Write static routes to sitemap
  staticRoutes.forEach(route => sitemap.write(route));

  sitemap.end();

  await streamToPromise(sitemap);
  console.log("Sitemap created successfully.");
}

generateSitemap().catch(console.error);
