import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'article';
  image?: string;
  author?: string;
  publishDate?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  type = 'website',
  image,
  author,
  publishDate,
}) => {
  const siteUrl = 'https://transist.se';
  const defaultImage = `${siteUrl}/assets/default-og-image.jpg`;

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{title} | Transist</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical || siteUrl} />
      
      {/* Third-party cookies */}
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <meta http-equiv="Accept-CH" content="Sec-CH-UA-Platform-Version, Sec-CH-UA-Model" />
      <meta http-equiv="Feature-Policy" content="storage-access 'self' https:; sync-xhr 'self' https:; autoplay 'self' https:; clipboard-write 'self' https:" />

      {/* Open Graph */}
      <meta property="og:site_name" content="Transist" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={canonical || siteUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Article specific metadata */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishDate && <meta property="article:published_time" content={publishDate} />}
        </>
      )}

      {/* Structured Data */}
      {type === 'article' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "image": image || defaultImage,
            "author": {
              "@type": "Person",
              "name": author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Transist",
              "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/assets/logo.png`
              }
            },
            "datePublished": publishDate,
            "url": canonical || siteUrl
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;