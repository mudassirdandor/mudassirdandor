import { useEffect } from 'react';

export interface DocumentHeadOptions {
  title: string;
  description: string;
  canonical: string;
  noindex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  jsonLd?: Record<string, unknown>;
}

function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string | undefined) {
  if (!content) return;
  let element = document.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.content = content;
}

/**
 * Lightweight, zero-dependency document head manager for client-side SEO.
 * Updates document.title, meta tags (description, robots, Open Graph, Twitter),
 * canonical link, and JSON-LD structured data dynamically during client navigation.
 */
export function useDocumentHead({
  title,
  description,
  canonical,
  noindex = false,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  ogType = 'website',
  twitterTitle,
  twitterDescription,
  twitterImage,
  jsonLd,
}: DocumentHeadOptions) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Meta Description
    setMetaTag('name', 'description', description);

    // 3. Canonical Link
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    // 4. Robots
    let robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (noindex) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.name = 'robots';
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.content = 'noindex, nofollow';
    } else if (robotsMeta) {
      robotsMeta.remove();
    }

    // 5. Open Graph tags
    setMetaTag('property', 'og:title', ogTitle || title);
    setMetaTag('property', 'og:description', ogDescription || description);
    setMetaTag('property', 'og:url', ogUrl || canonical);
    setMetaTag('property', 'og:type', ogType);
    if (ogImage) {
      setMetaTag('property', 'og:image', ogImage);
    }

    // 6. Twitter tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', twitterTitle || ogTitle || title);
    setMetaTag('name', 'twitter:description', twitterDescription || ogDescription || description);
    setMetaTag('name', 'twitter:url', ogUrl || canonical);
    if (twitterImage || ogImage) {
      setMetaTag('name', 'twitter:image', twitterImage || ogImage);
    }

    // 7. JSON-LD structured data
    let scriptTag = document.querySelector<HTMLScriptElement>('script#schema-json-ld');
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'schema-json-ld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    }
  }, [
    title,
    description,
    canonical,
    noindex,
    ogTitle,
    ogDescription,
    ogUrl,
    ogImage,
    ogType,
    twitterTitle,
    twitterDescription,
    twitterImage,
    jsonLd,
  ]);
}
