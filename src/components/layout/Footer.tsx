import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link href="/" className="logo" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 20, marginBottom: 0 }}>
              <span className="logo-mark"><span>P</span></span>
              <span className="logo-text">Prompt<em>Vault</em></span>
            </Link>
            <p>A curated library of prompts for the major language models. Edited weekly. No infinite scroll.</p>
          </div>
          <div>
            <h5>Library</h5>
            <ul>
              <li><Link href="/browse">Browse all</Link></li>
              <li><Link href="/#featured">Featured</Link></li>
              <li><Link href="/#categories">Categories</Link></li>
              <li><Link href="/browse">Recently added</Link></li>
            </ul>
          </div>
          <div>
            <h5>Models</h5>
            <ul>
              <li><Link href="/browse?platform=claude">Claude</Link></li>
              <li><Link href="/browse?platform=chatgpt">ChatGPT</Link></li>
              <li><Link href="/browse?platform=gemini">Gemini</Link></li>
              <li><Link href="/browse?platform=grok">Grok</Link></li>
            </ul>
          </div>
          <div>
            <h5>Project</h5>
            <ul>
              <li><Link href="#">Submit a prompt</Link></li>
              <li><Link href="#">Editorial guidelines</Link></li>
              <li><Link href="#">Changelog</Link></li>
              <li><Link href="#">GitHub</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-bar">
          <span>© 2026 PROMPTVAULT — A LIBRARY, NOT A FEED</span>
          <span>VOL.04 / BUILT WITH CARE</span>
        </div>
      </div>
    </footer>
  );
}
