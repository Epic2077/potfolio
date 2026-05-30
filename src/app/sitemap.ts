import { MetadataRoute } from 'next';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ashkansadeghi.vercel.app').replace(
  /\/$/,
  '',
);

/**
 * Next.js will serve this at: /sitemap.xml
 *
 * Notes for Google Search Console (GSC):
 * - Ensure the deployed site returns HTTP 200 for https://<domain>/sitemap.xml
 * - Submit the sitemap URL exactly as https://<domain>/sitemap.xml
 * - URLs inside the sitemap must be absolute and on the same canonical origin.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Add your indexable routes here.
  // If you have more pages (e.g. /work, /projects, /blog), include them.
  const routes: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency']; priority: number }> = [
    { path: '/', changeFrequency: 'monthly', priority: 1.0 },
    // { path: '/projects', changeFrequency: 'monthly', priority: 0.8 },
    // { path: '/about', changeFrequency: 'yearly', priority: 0.6 },
    // { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
