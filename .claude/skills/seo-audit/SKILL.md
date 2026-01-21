---
name: seo-audit
description: Conducting comprehensive SEO audits, reviews, and diagnostics. Use when users request audits, technical SEO analysis, ranking issue diagnosis, on-page optimization reviews, meta tag assessments, or general SEO health checks.
---

# SEO Audit Skill

## Overview

This skill provides comprehensive guidance for conducting SEO audits. It applies when users request audits, reviews, or diagnostics of SEO issues, technical SEO problems, ranking challenges, on-page optimization reviews, meta tag assessments, or general SEO health checks.

## Core Framework

The audit follows a prioritized approach:

1. **Crawlability & Indexation** - Can search engines discover and index the site?
2. **Technical Foundations** - Is the site fast and functional?
3. **On-Page Optimization** - Is content properly optimized?
4. **Content Quality** - Does it merit ranking?
5. **Authority & Links** - Does it have credibility?

## Initial Assessment Requirements

Before auditing, gather context about:
- Site type (SaaS, e-commerce, blog, etc.)
- Primary SEO business goals
- Priority keywords/topics
- Known issues or concerns
- Current organic traffic levels
- Recent changes or migrations
- Audit scope (full site vs. specific pages)
- Available data access (Search Console, analytics)

## Technical SEO Audit Components

### Crawlability Checks
- Robots.txt for unintentional blocks
- XML sitemap existence, submission, and quality
- Site architecture and click-depth
- Crawl budget issues (parameters, faceted navigation, session IDs)

### Indexation Assessment
- Index status via site: searches and Search Console
- Noindex tags on important pages
- Canonical tag direction and consistency
- Redirect chains or loops
- Soft 404 errors
- Duplicate content handling

### Site Speed & Core Web Vitals
- LCP (Largest Contentful Paint): < 2.5 seconds
- INP (Interaction to Next Paint): < 200ms
- CLS (Cumulative Layout Shift): < 0.1
- TTFB, image optimization, JavaScript execution, CSS delivery, caching, CDN usage

### Mobile Considerations
- Responsive design implementation
- Tap target sizes
- Viewport configuration
- No horizontal scrolling
- Content parity with desktop
- Mobile-first indexing readiness

### Security
- HTTPS across entire site
- Valid SSL certificates
- No mixed content warnings
- HTTP-to-HTTPS redirects
- HSTS headers

### URL Structure
- Readable, descriptive URLs
- Keyword inclusion where natural
- Consistent structure
- Minimal unnecessary parameters
- Lowercase, hyphen-separated format

## On-Page SEO Audit Components

### Title Tags
- Uniqueness per page
- Primary keyword positioning
- 50-60 character length
- Compelling CTR-focused copy
- Strategic brand name placement

### Meta Descriptions
- Unique per page
- 150-160 characters
- Primary keyword inclusion
- Clear value propositions
- Call-to-action elements

### Heading Structure
- Single H1 per page
- H1 contains primary keyword
- Logical H1→H2→H3 hierarchy
- Descriptive, content-aligned headings

### Content Optimization
- Primary keyword in first 100 words
- Natural related keyword usage
- Sufficient depth for topic complexity
- Search intent satisfaction
- Competitive superiority

### Image Optimization
- Descriptive file names
- Alt text on all images
- Accurate alt text descriptions
- Compressed file sizes
- Modern formats (WebP)
- Lazy loading implementation

### Internal Linking
- Well-linked important pages
- Descriptive anchor text
- Logical link relationships
- No broken internal links
- Reasonable link counts

### Keyword Targeting
- Clear per-page primary targets
- Title/H1/URL alignment
- Search intent satisfaction
- No cannibalization between pages

## Content Quality Assessment

### E-E-A-T Signals

**Experience:** First-hand demonstrations, original insights, real examples

**Expertise:** Author credentials, accuracy, proper sourcing

**Authoritativeness:** Industry recognition, citations, credentials

**Trustworthiness:** Accuracy, business transparency, contact info, privacy policies, HTTPS, security

### Content Depth
- Comprehensive topic coverage
- Follow-up question answers
- Competitive comparison
- Current, updated information

### User Engagement Signals
- Time on page metrics
- Bounce rate context
- Pages per session
- Return visit patterns

## Site-Type-Specific Issues

### SaaS/Product Sites
- Thin product page content
- Blog-product integration gaps
- Missing comparison/alternative pages
- Insufficient feature documentation
- Lack of educational content

### E-commerce
- Thin category pages
- Duplicate product descriptions
- Missing product schema
- Faceted navigation duplicates
- Out-of-stock page mishandling

### Content/Blog Sites
- Outdated, unrefreshed content
- Keyword cannibalization
- Missing topical clustering
- Weak internal linking
- Absent author pages

### Local Business
- Inconsistent Name-Address-Phone data
- Missing local schema markup
- Google Business Profile neglect
- Absent location pages
- Limited local content

## Report Output Structure

### Executive Summary
- Overall health assessment
- Top 3-5 priority issues
- Identified quick wins

### Finding Format (by category)
- Issue description
- SEO impact rating (High/Medium/Low)
- Discovery evidence
- Specific recommendations
- Implementation priority

### Prioritized Action Plan
1. Critical fixes blocking indexation/ranking
2. High-impact improvements
3. Quick wins (easy, immediate benefit)
4. Long-term recommendations

## Recommended Tools

### Free Resources
- Google Search Console (essential)
- PageSpeed Insights
- Bing Webmaster Tools
- Rich Results Test
- Mobile-Friendly Test
- Schema Validator

### Paid Options
- Screaming Frog
- Ahrefs/Semrush
- Sitebulb
- ContentKing

## Discovery Questions

When additional context is needed:
- Which pages/keywords matter most?
- Search Console access available?
- Recent migrations or changes?
- Top organic competitors?
- Current organic traffic baseline?

## Related Skills

- **programmatic-seo:** Building SEO pages at scale
- **schema-markup:** Implementing structured data
- **page-cro:** Page optimization for conversions
- **analytics-tracking:** SEO performance measurement
