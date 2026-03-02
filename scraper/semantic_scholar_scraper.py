"""
Semantic Scholar Scraper for VCAIL Website.
Exclusively uses the Semantic Scholar Graph API.
Highly reliable for CI/CD, handles pagination, and rate limits natively.
"""

import time
import requests
import re
import html
import os
from typing import List, Dict, Optional

class SemanticScholarScraper:
    BASE_URL = "https://api.semanticscholar.org/graph/v1"

    def __init__(self, api_key: str = None):
        self.session = requests.Session()
        headers = {
            "Accept": "application/json",
            "User-Agent": "VCAILWebsite/2.0 (mailto:admin@cs.unc.edu)"
        }
        # Allow passing an API key to bypass strict IP rate limits in CI/CD
        api_key = api_key or os.getenv("S2_API_KEY")
        if api_key:
            headers["x-api-key"] = api_key
        self.session.headers.update(headers)

    def _get_with_retry(self, url: str, max_retries: int = 3) -> Optional[dict]:
        """Make a GET request with retry logic and S2 rate limit handling."""
        for attempt in range(max_retries):
            try:
                # Respect S2 free tier (1 request per second without API key)
                if not self.session.headers.get("x-api-key"):
                    time.sleep(1.5)
                    
                resp = self.session.get(url, timeout=30)
                
                if resp.status_code == 200:
                    return resp.json()
                elif resp.status_code == 429:
                    wait = 5 * (attempt + 1)
                    print(f"   ⏸ Rate limited by Semantic Scholar. Waiting {wait}s...")
                    time.sleep(wait)
                elif resp.status_code == 404:
                    return None
                else:
                    print(f"   ⚠ HTTP {resp.status_code}: {resp.text[:100]}")
                    time.sleep(2 ** attempt)
            except requests.RequestException as e:
                print(f"   ⚠ Request error: {e}")
                time.sleep(2 ** attempt)
        return None

    def _fetch_tldrs(self, paper_ids: List[str]) -> Dict[str, str]:
        """Fetch TLDR summaries via Paper API batch endpoint."""
        if not paper_ids:
            return {}
        tldrs = {}
        batch_size = 500
        for i in range(0, len(paper_ids), batch_size):
            batch = paper_ids[i : i + batch_size]
            if not self.session.headers.get("x-api-key"):
                time.sleep(1.5)
            try:
                resp = self.session.post(
                    f"{self.BASE_URL}/paper/batch",
                    params={"fields": "paperId,tldr"},
                    json={"ids": batch},
                    timeout=60,
                )
                if resp.status_code != 200:
                    continue
                
                for paper in resp.json():
                    # Fix: Handle null objects in the batch response array
                    if not paper or not isinstance(paper, dict):
                        continue
                        
                    pid = paper.get("paperId")
                    tldr = paper.get("tldr")
                    if pid and tldr and isinstance(tldr, dict):
                        text = tldr.get("text", "")
                        if text:
                            tldrs[pid] = text
            except requests.RequestException:
                pass
        return tldrs

    def create_slug(self, title: str) -> str:
        """Create a URL-friendly slug from title."""
        slug = html.unescape(title).lower()
        slug = re.sub(r'[^a-z0-9\s-]', '', slug)
        slug = re.sub(r'\s+', '-', slug.strip())
        return re.sub(r'-+', '-', slug)[:100]

    def format_meta(self, venue: str, year: int) -> str:
        """Format the meta field like 'CVPR 2025'."""
        return f"{venue} {year}".strip() if venue and year else (venue or str(year) or "")

    def generate_tags(self, venue: str, year: int, pub_types: list) -> List[str]:
        """Generate tags array for filtering."""
        tags = []
        pub_types = pub_types or []
        
        if "JournalArticle" in pub_types or "Review" in pub_types:
            tags.append("Journal")
        elif "Conference" in pub_types:
            tags.append("Conference")
        else:
            tags.append("Conference") 

        venue_upper = (venue or "").upper()
        # Expanded to include major robotics and embodied AI venues
        known_venues = [
            "CVPR", "ICCV", "ECCV", "NEURIPS", "ICML", "ICLR", 
            "SIGGRAPH", "CHI", "ISMAR", "IEEE VR",
            "ICRA", "IROS", "RSS", "CORL"
        ]
        
        for v in known_venues:
            if v in venue_upper:
                tags.append(v.replace(" ", ""))
                break
        
        if year:
            tags.append(str(year))
        return tags

    def scrape_author(self, author_config: dict, start_year: int = None, end_year: int = None) -> List[dict]:
        """Fetch publications for a single author with pagination support."""
        name = author_config["name"]
        s2_id = author_config.get("s2_id")

        if not s2_id:
            print(f"\n⚠ Skipping {name}: No Semantic Scholar ID (s2_id) provided.")
            return []

        print(f"\n📚 [Semantic Scholar] Fetching papers for {name} (ID: {s2_id})...")
        
        fields = "paperId,title,url,year,venue,authors,abstract,openAccessPdf,publicationTypes,citationCount,externalIds"
        limit = 500
        offset = 0
        all_papers = []

        # Fix: Pagination to handle PIs with >500 papers
        while True:
            url = f"{self.BASE_URL}/author/{s2_id}/papers?fields={fields}&limit={limit}&offset={offset}"
            data = self._get_with_retry(url)
            
            if not data:
                break
                
            batch = data.get("data", [])
            all_papers.extend(batch)
            
            if len(batch) < limit:
                break
            offset += limit

        if not all_papers:
            print(f"   ✗ Failed to fetch data or no papers found for {name}")
            return []

        paper_ids = [p.get("paperId") for p in all_papers if p.get("paperId")]
        tldrs = self._fetch_tldrs(paper_ids) if paper_ids else {}
        results = []
        
        for paper in all_papers:
            year = paper.get("year")
            if start_year and year and year < start_year: continue
            if end_year and year and year > end_year: continue

            title = paper.get("title", "")
            if not title: continue
            
            # Fix: Guard against "authors": null from the API
            authors_data = paper.get("authors") or []
            authors_list = [a.get("name", "") for a in authors_data if isinstance(a, dict)]
            
            venue = paper.get("venue", "")
            
            pdf_url = ""
            oa_pdf = paper.get("openAccessPdf")
            if oa_pdf and isinstance(oa_pdf, dict):
                pdf_url = oa_pdf.get("url", "")

            abstract = paper.get("abstract", "")
            paper_id = paper.get("paperId", "")
            tldr_text = tldrs.get(paper_id, "") if paper_id else ""
            summary_text = tldr_text if tldr_text else (abstract[:300] + "..." if abstract else "")

            pub = {
                "title": title,
                "slug": self.create_slug(title),
                "authors": ", ".join(authors_list),
                "meta": self.format_meta(venue, year),
                "image": "",
                "link": paper.get("url", ""),
                "tags": self.generate_tags(venue, year, paper.get("publicationTypes")),
                "summary": summary_text, 
                "keyContributions": [],
                "project": "",
                "_abstract": abstract,
                "_pdf_url": pdf_url,
                "_citations": paper.get("citationCount", 0),
                "_external_ids": paper.get("externalIds", {}),
                "_lab_member": name,
                "_source": "semantic_scholar"
            }
            results.append(pub)
            
        print(f"   ✓ Fetched {len(results)} papers")
        return results

    def scrape_multiple_authors(self, authors_config: List[dict], start_year: int = None, end_year: int = None) -> List[dict]:
        """Scrape publications for all lab members."""
        all_pubs = []
        for author in authors_config:
            all_pubs.extend(self.scrape_author(author, start_year, end_year))
        return all_pubs

    def deduplicate(self, publications: List[dict]) -> List[dict]:
        """Deduplicate based on S2 Corpus ID, DOI, and Slug, keeping most cited version."""
        print(f"\n🔍 Deduplicating {len(publications)} publications...")
        
        seen_corpus_ids = set()
        seen_dois = set()
        seen_slugs = set()
        unique_pubs = []

        # Sort by citations to keep the most highly-cited version of duplicates
        sorted_pubs = sorted(publications, key=lambda x: x.get("_citations", 0), reverse=True)

        for pub in sorted_pubs:
            ext_ids = pub.get("_external_ids", {})
            corpus_id = ext_ids.get("CorpusId")
            doi = ext_ids.get("DOI")
            slug = pub.get("slug", "")

            if (corpus_id and corpus_id in seen_corpus_ids) or \
               (doi and doi in seen_dois) or \
               (slug in seen_slugs):
                continue

            if corpus_id: seen_corpus_ids.add(corpus_id)
            if doi: seen_dois.add(doi)
            if slug: seen_slugs.add(slug)
            
            unique_pubs.append(pub)

        print(f"   ✓ {len(unique_pubs)} unique papers remain")
        return unique_pubs

def search_author(name: str):
    """Utility to find S2 IDs for LAB_MEMBERS config."""
    print(f"\n🔍 Searching Semantic Scholar for: {name}")
    url = f"https://api.semanticscholar.org/graph/v1/author/search?query={name}&fields=name,affiliations,paperCount,hIndex&limit=5"
    try:
        resp = requests.get(url).json()
        for i, author in enumerate(resp.get("data", [])):
            print(f"\n[{i+1}] {author.get('name')}")
            print(f"    S2 ID:      {author.get('authorId')}")
            print(f"    Papers:     {author.get('paperCount')}")
            print(f"    h-index:    {author.get('hIndex')}")
            affiliations = author.get('affiliations', [])
            print(f"    Affiliated: {', '.join(affiliations) if affiliations else 'Unknown'}")
    except Exception as e:
        print(f"Search failed: {e}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        search_author(" ".join(sys.argv[1:]))
    else:
        print("Usage: python semantic_scholar_scraper.py 'Author Name'")