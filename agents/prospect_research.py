"""
Prospect Research Agent
-----------------------
Scrapes a target company's website using Firecrawl and produces
a structured prospect brief: what they do, positioning, tech signals,
team info, and potential pain points for outreach.

Usage:
    python agents/prospect_research.py https://example.com
"""

import sys
import os
import json
from dotenv import load_dotenv

load_dotenv()

FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY")

if not FIRECRAWL_API_KEY:
    print("Error: FIRECRAWL_API_KEY not found in .env")
    sys.exit(1)


def scrape_site(url: str) -> dict:
    """Scrape a URL using Firecrawl and return structured markdown content."""
    from firecrawl import FirecrawlApp

    app = FirecrawlApp(api_key=FIRECRAWL_API_KEY)

    # Crawl key pages (homepage + up to 10 subpages)
    print(f"Crawling {url}...")
    crawl_result = app.crawl_url(
        url,
        params={
            "limit": 10,
            "scrapeOptions": {
                "formats": ["markdown"],
            },
        },
        poll_interval=5,
    )

    return crawl_result


def extract_brief(crawl_data: dict) -> dict:
    """Parse crawl results into a structured prospect brief."""
    pages = crawl_data.get("data", [])

    brief = {
        "pages_scraped": len(pages),
        "content": [],
    }

    for page in pages:
        page_info = {
            "url": page.get("metadata", {}).get("sourceURL", "unknown"),
            "title": page.get("metadata", {}).get("title", ""),
            "description": page.get("metadata", {}).get("description", ""),
            "markdown_length": len(page.get("markdown", "")),
            "markdown_preview": page.get("markdown", "")[:2000],
        }
        brief["content"].append(page_info)

    return brief


def print_brief(url: str, brief: dict):
    """Print a formatted prospect research brief."""
    print("\n" + "=" * 60)
    print(f"PROSPECT RESEARCH BRIEF: {url}")
    print("=" * 60)
    print(f"\nPages analyzed: {brief['pages_scraped']}")
    print("-" * 60)

    for i, page in enumerate(brief["content"], 1):
        print(f"\n[Page {i}] {page['title']}")
        print(f"  URL: {page['url']}")
        if page["description"]:
            print(f"  Description: {page['description']}")
        print(f"  Content length: {page['markdown_length']} chars")
        print(f"\n  Preview:")
        # Print first ~500 chars of content
        preview = page["markdown_preview"][:500]
        for line in preview.split("\n"):
            if line.strip():
                print(f"    {line.strip()}")
        print()

    print("=" * 60)
    print("\nFull data saved to: prospect_output.json")


def main():
    if len(sys.argv) < 2:
        print("Usage: python agents/prospect_research.py <company_url>")
        print("Example: python agents/prospect_research.py https://oleria.com")
        sys.exit(1)

    url = sys.argv[1]
    if not url.startswith("http"):
        url = f"https://{url}"

    # Scrape
    crawl_data = scrape_site(url)

    # Extract
    brief = extract_brief(crawl_data)

    # Output
    print_brief(url, brief)

    # Save full output as JSON
    output_path = os.path.join(os.path.dirname(__file__), "..", "prospect_output.json")
    with open(output_path, "w") as f:
        json.dump({"url": url, "brief": brief}, f, indent=2)


if __name__ == "__main__":
    main()
