import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/option-b", "/option-c", "/option-d"],
      },
    ],
    sitemap: "https://jasace.com/sitemap.xml",
  };
}
