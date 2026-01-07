import { Link2, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-hero pt-16 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl  shadow-glow group-hover:scale-105 transition-transform">
                <Link2 className="w-5 h-5 " />
              </div>
              <span className="text-xl font-display font-bold text-accent">
                Shortify
              </span>
            </Link>
            <p className="text-hero-muted text-sm leading-relaxed">
              Transform long URLs into short, powerful links. Track clicks,
              analyze performance, and grow your reach.
            </p>
            <div className="flex gap-4 mt-6">
              <a className="text-hero-muted hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a className="text-hero-muted hover:text-accent transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a className="text-hero-muted hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="hidden md:block">
            <h4 className="text-accent font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#how-it-works"
                  className="text-hero-muted hover:text-accent text-sm transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-hero-muted hover:text-accent text-sm transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#apps"
                  className="text-hero-muted hover:text-accent text-sm transition-colors"
                >
                  APP
                </a>
              </li>
              <li>
                <a className="text-hero-muted hover:text-accent text-sm transition-colors">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-accent font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <a className="text-hero-muted hover:text-accent text-sm transition-colors">
                  About
                </a>
              </li>
              <li>
                <a className="text-hero-muted hover:text-accent text-sm transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a className="text-hero-muted hover:text-accent text-sm transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a className="text-hero-muted hover:text-accent text-sm transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-accent font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a className="text-hero-muted hover:text-accent text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="text-hero-muted hover:text-accent text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a className="text-hero-muted hover:text-accent text-sm transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-hero-foreground/10 mt-2 py-2 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-hero-muted text-sm">
            © {new Date().getFullYear()} Shortify. All rights reserved.
          </p>
          <p className="text-hero-muted text-sm"> Tarek Monowar</p>
        </div>
      </div>
    </footer>
  );
}
