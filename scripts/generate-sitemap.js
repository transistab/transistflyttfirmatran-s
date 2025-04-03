import { writeFileSync } from 'fs';
import { format } from 'date-fns';

// Use relative URLs for development
const baseUrl = '';

// Get all blog posts (this would typically come from your database)
const blogPosts = [
  { slug: 'guide-till-flyttstadning', lastMod: new Date() },
  { slug: 'packa-infor-flytten', lastMod: new Date() },
  { slug: 'checklista-for-flyttning', lastMod: new Date() }
];

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${format(new Date(), 'yyyy-MM-dd')}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blogg</loc>
    <lastmod>${format(new Date(), 'yyyy-MM-dd')}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  ${blogPosts.map(post => `
  <url>
    <loc>${baseUrl}/blogg/${post.slug}</loc>
    <lastmod>${format(post.lastMod, 'yyyy-MM-dd')}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  `).join('')}
</urlset>`;

writeFileSync('public/sitemap.xml', sitemap);
console.log('Sitemap generated successfully!');