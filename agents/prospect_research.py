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
import time
import requests

# Load .env file manually (no dependency needed)
env_path = os.path.join(os.path.dirname(__file__), "..", ".env")
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                os.environ.setdefault(key.strip(), value.strip())

FIRECRAWL_API_KEY = os.environ.get("FIRECRAWL_API_KEY")
FIRECRAWL_BASE_URL = "https://api.firecrawl.dev/v1"

if not FIRECRAWL_API_KEY:
    print("Error: FIRECRAWL_API_KEY not found in .env")
    sys.exit(1)


def crawl_site(url: str) -> dict:
    """Crawl a URL using Firecrawl REST API."""
    headers = {
        "Authorization": f"Bearer {FIRECRAWL_API_KEY}",
        "Content-Type": "application/json",
    }

    # Start crawl job
    print(f"Starting crawl of {url}...")
    resp = requests.post(
        f"{FIRECRAWL_BASE_URL}/crawl",
        headers=headers,
        json={
            "url": url,
            "limit": 10,
            "scrapeOptions": {"formats": ["markdown"]},
        },
    )
    resp.raise_for_status()
    job = resp.json()

    if not job.get("success"):
        print(f"Error starting crawl: {job}")
        sys.exit(1)

    job_id = job["id"]
    print(f"Crawl started (job: {job_id}). Polling for results...")

    # Poll for completion
    while True:
        time.sleep(5)
        status_resp = requests.get(
            f"{FIRECRAWL_BASE_URL}/crawl/{job_id}",
            headers=headers,
        )
        status_resp.raise_for_status()
        result = status_resp.json()

        status = result.get("status")
        print(f"  Status: {status}")

        if status == "completed":
            return result
        elif status in ("failed", "cancelled"):
            print(f"Crawl failed: {result}")
            sys.exit(1)


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

    crawl_data = crawl_site(url)
    brief = extract_brief(crawl_data)
    print_brief(url, brief)

    output_path = os.path.join(os.path.dirname(__file__), "..", "prospect_output.json")
    with open(output_path, "w") as f:
        json.dump({"url": url, "brief": brief}, f, indent=2)


if __name__ == "__main__":
    main()
