import { useEffect } from "react";

interface SEOProps {
  currentPage: string;
}

export function useSEO({ currentPage }: SEOProps) {
  useEffect(() => {
    // 1. Determine metadata based on current state
    let title = "Mudassir Javed | Executive Decision Intelligence Platform";
    let description = "Digital headquarters of Mudassir Javed (mudassirdandor), specializing in Business Intelligence, Data Analytics, and AI Automation workflows.";
    let url = "https://mudassirdandor.com";

    switch (currentPage) {
      case "solutions":
        title = "Enterprise Solutions & AI Workflows | mudassirdandor";
        description = "High-impact AI automation, data pipeline validation, processes, and Google Maps localized business intelligence methodologies.";
        url = "https://mudassirdandor.com/solutions";
        break;
      case "case-studies":
        title = "Portfolio Cases & Decision Boards | mudassirdandor";
        description = "Explore verified case studies spanning healthcare analytics, financial dashboards, retail inventory systems, and NGO scorecards.";
        url = "https://mudassirdandor.com/projects";
        break;
      case "evidence-lab":
        title = "Credibility & Evidence Lab | mudassirdandor";
        description = "Supporting deliverables, Github code repositories, transactional databases, and technical analytics artifacts.";
        url = "https://mudassirdandor.com/evidence-lab";
        break;
      case "insights":
        title = "Executive Insights & Specializations | mudassirdandor";
        description = "Analytical insights, industry commentary, and deep dives into enterprise business decision systems.";
        url = "https://mudassirdandor.com/insights";
        break;
      case "about":
        title = "About Mudassir Javed | Biography & Credentials";
        description = "Biography, academic foundations, and professional technical certifications of Mudassir Javed.";
        url = "https://mudassirdandor.com/about";
        break;
      case "contact":
        title = "Initiate Consulting Discussion | mudassirdandor";
        description = "Connect with Mudassir Javed to discuss consulting briefs, BI systems, or automated analytical pipelines.";
        url = "https://mudassirdandor.com/contact";
        break;
      case "certifications":
        title = "Professional Certifications | mudassirdandor";
        description = "Explore official technical credentials and verified certifications issued by Google, IBM, Microsoft, and leading academic institutions.";
        url = "https://mudassirdandor.com/certifications";
        break;
      case "consulting":
        title = "Consulting Methodology | mudassirdandor";
        description = "Learn more about Mudassir Javed's decision intelligence consulting framework, data analytics blueprints, and professional project execution methodologies.";
        url = "https://mudassirdandor.com/consulting";
        break;
      case "home":
      default:
        title = "Mudassir Javed | Executive Decision Intelligence Platform";
        description = "Digital headquarters of Mudassir Javed (mudassirdandor), specializing in Business Intelligence, Data Analytics, and AI Automation workflows.";
        url = "https://mudassirdandor.com/";
        break;
    }

    // 2. Update Basic Elements
    document.title = title;

    // Helper to update or create meta tags
    const updateMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Description & Standard Tags
    updateMetaTag("name", "description", description);
    updateMetaTag("name", "author", "Mudassir Javed");
    updateMetaTag("name", "robots", "index, follow");

    // Open Graph Tags (LinkedIn, Facebook, Discord, WhatsApp)
    updateMetaTag("property", "og:title", title);
    updateMetaTag("property", "og:description", description);
    updateMetaTag("property", "og:type", "website");
    updateMetaTag("property", "og:url", url);
    // Setting professional placeholder image for rich link preview metadata
    updateMetaTag("property", "og:image", "https://mudassirdandor.com/assets/og-preview.jpg");
    updateMetaTag("property", "og:site_name", "mudassirdandor Platform");

    // Twitter / X Cards
    updateMetaTag("name", "twitter:card", "summary_large_image");
    updateMetaTag("name", "twitter:title", title);
    updateMetaTag("name", "twitter:description", description);
    updateMetaTag("name", "twitter:image", "https://mudassirdandor.com/assets/og-preview.jpg");

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", url);

    // 3. Inject Structured Data Schema (JSON-LD)
    let schemaScript = document.getElementById("structured-data-jsonld");
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.setAttribute("type", "application/ld+json");
      schemaScript.setAttribute("id", "structured-data-jsonld");
      document.head.appendChild(schemaScript);
    }

    const pageType = currentPage === "about" 
      ? "ProfilePage" 
      : (currentPage === "case-studies" || currentPage === "insights" ? "CollectionPage" : "WebPage");

    const jsonLdData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "https://mudassirdandor.com/#person",
          "name": "Mudassir Javed",
          "alternateName": "mudassirdandor",
          "url": "https://mudassirdandor.com",
          "sameAs": [
            "https://github.com/mudassirdandor",
            "https://www.linkedin.com/in/mudassirdandor",
            "https://www.kaggle.com/malikzada00",
            "https://www.skills.google/public_profiles/5b997baa-bcbc-41a7-8f32-3b97bbbc4424",
            "https://www.credly.com/users/mudassirdandor",
            "https://edu.google.accredible.com/profile/mudassirjaved922949/wallet",
            "https://www.credential.net/profile/mudassirjaved/wallet",
            "https://skillshop.accredible.com/profile/b8ed979a-ef44-4211-a86c-d3d467978044",
            "https://www.freelancer.pk/u/MudassirJDev",
            "https://www.fiverr.com/users/malikzada97",
            "https://www.facebook.com/mudassirdandor",
            "https://www.facebook.com/malikzadamudassir",
            "https://www.instagram.com/mudassirdandor",
            "https://www.tiktok.com/@mudassirdandor",
            "https://x.com/mudassirdandor"
          ],
          "jobTitle": "Executive Decision Intelligence & Analytics Consultant",
          "description": "Executive Business Intelligence, Data Analytics, AI Automation, Web Development, Google Workspace Automation, and Local Business Intelligence specialist.",
          "knowsAbout": [
            "Business Intelligence",
            "Data Analytics",
            "AI Automation",
            "Web Development",
            "Google Workspace Automation",
            "Local Business Intelligence"
          ],
          "almaMater": {
            "@type": "EducationalOrganization",
            "name": "University of Balochistan",
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "University of Balochistan"
            }
          },
          "homeLocation": {
            "@type": "Place",
            "name": "Quetta, Balochistan, Pakistan"
          },
          "gender": "Male"
        },
        {
          "@type": "Organization",
          "@id": "https://mudassirdandor.com/#organization",
          "name": "mudassirdandor",
          "url": "https://mudassirdandor.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://mudassirdandor.com/assets/og-preview.jpg"
          },
          "founder": {
            "@id": "https://mudassirdandor.com/#person"
          },
          "description": "Executive Decision Intelligence Platform"
        },
        {
          "@type": "WebSite",
          "@id": "https://mudassirdandor.com/#website",
          "url": "https://mudassirdandor.com",
          "name": "mudassirdandor Executive Decision Intelligence",
          "publisher": {
            "@id": "https://mudassirdandor.com/#organization"
          },
          "author": {
            "@id": "https://mudassirdandor.com/#person"
          }
        },
        {
          "@type": pageType,
          "@id": `https://mudassirdandor.com/#webpage-${currentPage}`,
          "url": url,
          "name": title,
          "description": description,
          "isPartOf": {
            "@id": "https://mudassirdandor.com/#website"
          },
          "about": {
            "@id": "https://mudassirdandor.com/#person"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://mudassirdandor.com/#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://mudassirdandor.com"
            },
            currentPage !== "home" ? {
              "@type": "ListItem",
              "position": 2,
              "name": currentPage.charAt(0).toUpperCase() + currentPage.slice(1),
              "item": url
            } : null
          ].filter((item): item is NonNullable<typeof item> => item !== null)
        },
        {
          "@type": "FAQPage",
          "@id": "https://mudassirdandor.com/#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Who is Mudassir Javed?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Mudassir Javed is an Executive Decision Intelligence Consultant and Data Specialist operating under the professional brand mudassirdandor. Based in Quetta, Balochistan, Pakistan, he holds an MSc in Statistics from the University of Balochistan and specializes in constructing high-integrity executive dashboards that translate raw, multi-channel corporate datasets into actionable decisions."
              }
            },
            {
              "@type": "Question",
              "name": "What are his primary areas of expertise?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Mudassir specializes in five integrated domains: Business Intelligence (enterprise dashboard design, ETL pipeline creation, semantic modeling), Data Analytics (rigorous statistical reasoning, trend forecasting, diagnostics), AI Automation (LLM agent engineering, serverless workflow relays), Web Development (highly polished executive portfolio hubs), and Local Business Intelligence (Google Maps performance optimization and Share-of-Voice analytics)."
              }
            },
            {
              "@type": "Question",
              "name": "What technical tools and languages does he use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "His technical stack is fully modern and rigorously applied: Analytics & BI includes Power BI, DAX, Excel Advanced, Star-Schema Modeling, SQL Server, PostgreSQL, and Google Sheets. Languages & Frameworks include Python (Pandas, Numpy, Scikit-Learn), TypeScript, React, Tailwind CSS, and Google Apps Script. AI & Automation includes the Gemini API SDK, custom LLM prompt engineering architectures, and serverless workflow relays."
              }
            },
            {
              "@type": "Question",
              "name": "Which business sectors has he built solutions for?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Mudassir has successfully designed decision intelligence systems for Healthcare Systems (clinical ER patient wait times and resource scheduling), SaaS & Cloud Software (rolling customer clickstream analyses and predictive monthly churn classifiers), Corporate Finance (aging AP/AR accounts balances modeling and cash runway forecasting), Retail & Consumer Goods (transaction receipt market-basket rule mining), and International NGOs (geospatial resource deployment trackers)."
              }
            }
          ]
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://mudassirdandor.com/#saylani-application",
          "name": "Saylani Student Portal Application",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "author": {
            "@id": "https://mudassirdandor.com/#person"
          },
          "description": "Client-side course registration system with automatic Google Apps Script spreadsheet integration and instant PDF student card generation."
        },
        {
          "@type": "Project",
          "@id": "https://mudassirdandor.com/#projects-portfolio",
          "name": "mudassirdandor Decision Intelligence Case Studies",
          "description": "A verified portfolio of Business Intelligence dashboards, cashflow forecasts, and GIS search-of-voice maps tracking local optimization metrics.",
          "author": {
            "@id": "https://mudassirdandor.com/#person"
          }
        },
        {
          "@type": "Article",
          "@id": "https://mudassirdandor.com/#article-insights",
          "headline": "Specializations & Analytical Research",
          "description": "A curated collection of strategic analyses focusing on enterprise resource scheduling, churn modeling, and cash runway tracking.",
          "author": {
            "@id": "https://mudassirdandor.com/#person"
          },
          "publisher": {
            "@id": "https://mudassirdandor.com/#organization"
          }
        }
      ]
    };

    schemaScript.innerHTML = JSON.stringify(jsonLdData);
  }, [currentPage]);
}
