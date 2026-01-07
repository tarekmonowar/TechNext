"use client";
import { ArrowRight, Check, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/src/Types/apiTypes";
import { UrlAPI } from "@/src/lib/api";

const SHORT_DOMAIN =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function HeroComponents() {
  const { data: session } = useSession();
  const router = useRouter();

  const [Url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isShortening, setIsShortening] = useState(false);

  const handleShorten = async () => {
    if (!Url) {
      toast("Please enter a URL");
      return;
    }
    try {
      new URL(Url);
    } catch {
      return toast("Invalid URL");
    }

    if (session?.user) {
      setIsShortening(true);
      try {
        const res = await UrlAPI.create(Url);
        if (!res.success || !res.data) {
          toast("Failed to shorten URL");
          return;
        }
        setShortUrl(`${SHORT_DOMAIN}/${res.data.shortCode}`);
        toast("URL shortened successfully!");
      } catch (error) {
        const err = error as ApiError;
        toast(err.message);
      } finally {
        setIsShortening(false);
      }
    } else {
      toast("Please Log In Fist.");
      router.push(`/login?prefillUrl=${encodeURIComponent(Url)}`);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast("Copied to clipboard!");
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative border-b border-gray-800 min-h-screen flex items-center pt-20">
        {/* Background Pattern */}

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-hero-foreground/10 border border-hero-foreground/20 text-hero-muted text-sm mb-8 animate-fade-up">
              <span className="w-3 h-3 rounded-full bg-accent animate-pulse" />
              Trusted by 10,000+ users worldwide
            </div>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-hero-foreground mb-6 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Shorten, Share & <span className="text-gradient">Track</span> Your
              Links
            </h1>

            <p
              className="text-lg md:text-xl text-hero-muted max-w-2xl mx-auto mb-10 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Transform long URLs into short, powerful links. Track clicks,and
              grow your reach with our intelligent link management platform.
            </p>

            {/* Demo URL Shortener */}
            <div
              className="max-w-2xl mx-auto mb-10 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="bg-navy-light rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  placeholder="Paste your long URL here..."
                  value={Url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 px-4 py-2 bg-transparent border border-hero-foreground/20 rounded-xl text-hero-foreground placeholder:text-hero-muted focus:outline-none focus:border-primary transition-colors"
                />
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleShorten}
                  disabled={isShortening}
                  className="whitespace-nowrap"
                >
                  {isShortening ? "Shortening..." : "Shorten URL"}
                </Button>
              </div>

              {shortUrl && (
                <div className="border border-accent/50 mt-4 p-4  rounded-sm">
                  <div className="text-blue-400 text-left">
                    For Tracking Please visit Dashboards{" "}
                  </div>
                  <div className=" bg-success/10 flex items-center justify-between gap-4 animate-fade-in">
                    <div className="flex items-center gap-2 text-success">
                      <Check className="w-5 h-5 text-accent" />
                      <span className="font-medium">{shortUrl}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyToClipboard}
                      >
                        <Copy className="w-4 h-4 text-green-400" />
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 text-accent" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Button variant="outline" className="group">
                <Link href="/register" className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="default">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
