"""
SEO Audit Agent
---------------
Pulls key SEO metrics for a domain using the Ahrefs API v3.
Outputs a structured audit: domain rating, backlink profile,
top organic keywords, referring domains, and top pages.

Usage:
    python agents/seo_audit.py example.com
"""

import sys
import os
import json
from datetime import date

import requests

# Load .env file
env_path = os.path.join(os.path.dirname(__file__), "..", ".env")
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                os.environ.setdefault(key.strip(), value.strip())

AHREFS_API_KEY = os.environ.get("AHREFS_API_KEY")
AHREFS_BASE_URL = "https://api.ahrefs.com/v3/site-explorer"

if not AHREFS_API_KEY:
    print("Error: AHREFS_API_KEY not found in .env")
    sys.exit(1)


def ahrefs_get(endpoint: str, params: dict) -> dict:
    """Make a GET request to the Ahrefs API."""
    headers = {
        "Accept": "application/json",
        "Authorization": f"Bearer {AHREFS_API_KEY}",
    }
    resp = requests.get(
        f"{AHREFS_BASE_URL}/{endpoint}",
        headers=headers,
        params=params,
    )
    if resp.status_code == 401:
        print("Error: Invalid API key or insufficient permissions.")
        print("Note: Ahrefs API v3 requires an Enterprise plan.")
        sys.exit(1)
    resp.raise_for_status()
    return resp.json()


def get_domain_rating(target: str) -> dict:
    """Get domain rating and Ahrefs rank."""
    print("  Fetching domain rating...")
    return ahrefs_get("domain-rating", {
        "target": target,
        "date": date.today().isoformat(),
    })


def get_backlinks_stats(target: str) -> dict:
    """Get backlinks summary stats."""
    print("  Fetching backlinks stats...")
    return ahrefs_get("backlinks-stats", {
        "target": target,
        "date": date.today().isoformat(),
    })


def get_top_organic_keywords(target: str, limit: int = 10) -> dict:
    """Get top organic keywords by traffic."""
    print("  Fetching top organic keywords...")
    return ahrefs_get("organic-keywords", {
        "target": target,
        "country": "us",
        "limit": limit,
        "select": "keyword,volume,position,traffic",
        "order_by": "traffic:desc",
    })


def get_top_pages(target: str, limit: int = 10) -> dict:
    """Get top pages by organic traffic."""
    print("  Fetching top pages...")
    return ahrefs_get("top-pages", {
        "target": target,
        "country": "us",
        "limit": limit,
        "select": "url,traffic,keywords",
        "order_by": "traffic:desc",
    })


def get_referring_domains(target: str, limit: int = 10) -> dict:
    """Get top referring domains."""
    print("  Fetching referring domains...")
    return ahrefs_get("refdomains", {
        "target": target,
        "limit": limit,
        "select": "domain,domain_rating,backlinks",
        "order_by": "domain_rating:desc",
    })


def print_audit(target: str, audit: dict):
    """Print formatted SEO audit report."""
    print("\n" + "=" * 60)
    print(f"SEO AUDIT: {target}")
    print("=" * 60)

    # Domain Rating
    dr = audit.get("domain_rating", {})
    print(f"\n--- Domain Rating ---")
    print(f"  Domain Rating: {dr.get('domain_rating', 'N/A')}")
    print(f"  Ahrefs Rank:   {dr.get('ahrefs_rank', 'N/A')}")

    # Backlinks Stats
    bl = audit.get("backlinks_stats", {})
    print(f"\n--- Backlinks Overview ---")
    print(f"  Total Backlinks:      {bl.get('live', 'N/A')}")
    print(f"  Referring Domains:    {bl.get('live_refdomains', 'N/A')}")
    print(f"  Dofollow Backlinks:   {bl.get('live_dofollow', 'N/A')}")

    # Top Keywords
    keywords = audit.get("organic_keywords", {}).get("keywords", [])
    if keywords:
        print(f"\n--- Top Organic Keywords ---")
        print(f"  {'Keyword':<30} {'Vol':<8} {'Pos':<6} {'Traffic':<8}")
        print(f"  {'-'*30} {'-'*8} {'-'*6} {'-'*8}")
        for kw in keywords:
            print(f"  {kw.get('keyword',''):<30} {kw.get('volume',''):<8} {kw.get('position',''):<6} {kw.get('traffic',''):<8}")

    # Top Pages
    pages = audit.get("top_pages", {}).get("pages", [])
    if pages:
        print(f"\n--- Top Pages by Traffic ---")
        for i, page in enumerate(pages, 1):
            print(f"  {i}. {page.get('url', '')}")
            print(f"     Traffic: {page.get('traffic', 'N/A')} | Keywords: {page.get('keywords', 'N/A')}")

    # Referring Domains
    refdoms = audit.get("referring_domains", {}).get("refdomains", [])
    if refdoms:
        print(f"\n--- Top Referring Domains ---")
        print(f"  {'Domain':<30} {'DR':<6} {'Backlinks':<10}")
        print(f"  {'-'*30} {'-'*6} {'-'*10}")
        for rd in refdoms:
            print(f"  {rd.get('domain',''):<30} {rd.get('domain_rating',''):<6} {rd.get('backlinks',''):<10}")

    print("\n" + "=" * 60)
    print("Full data saved to: seo_audit_output.json")


def main():
    if len(sys.argv) < 2:
        print("Usage: python agents/seo_audit.py <domain>")
        print("Example: python agents/seo_audit.py oleria.com")
        sys.exit(1)

    target = sys.argv[1].replace("https://", "").replace("http://", "").rstrip("/")

    print(f"Running SEO audit for: {target}")

    audit = {}
    audit["domain_rating"] = get_domain_rating(target)
    audit["backlinks_stats"] = get_backlinks_stats(target)
    audit["organic_keywords"] = get_top_organic_keywords(target)
    audit["top_pages"] = get_top_pages(target)
    audit["referring_domains"] = get_referring_domains(target)

    print_audit(target, audit)

    output_path = os.path.join(os.path.dirname(__file__), "..", "seo_audit_output.json")
    with open(output_path, "w") as f:
        json.dump({"target": target, "audit": audit}, f, indent=2)


if __name__ == "__main__":
    main()
