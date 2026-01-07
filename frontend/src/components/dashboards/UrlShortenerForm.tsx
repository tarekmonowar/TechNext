"use client";

import { useState } from "react";
import { UrlAPI } from "@/src/lib/api";
import { Link2, Copy, Check, Loader2, ExternalLink } from "lucide-react";
import { ShortUrl } from "@/src/Types/urlTypes";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ApiError } from "@/src/Types/apiTypes";
import { Progress } from "../ui/progress";
import { useRouter, useSearchParams } from "next/navigation";

const SHORT_DOMAIN =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

interface UrlShortenerFormProps {
  onUrlCreated: (url: ShortUrl) => void;
  urlCount: number;
  maxUrls: number;
}

export function UrlShortenerForm({
  onUrlCreated,
  urlCount,
  maxUrls,
}: UrlShortenerFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefillUrl = searchParams.get("prefillUrl") || "";

  const [url, setUrl] = useState(prefillUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState<ShortUrl | null>(null);
  const [copied, setCopied] = useState(false);

  const isLimitReached = urlCount >= maxUrls;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return toast("Please enter a URL");
    if (isLimitReached)
      return toast.warning("URL limit reached . Please Upgrade Plan");

    try {
      new URL(url);
    } catch {
      return toast("Invalid URL");
    }

    try {
      setIsLoading(true);
      const res = await UrlAPI.create(url);
      if (!res.success || !res.data) {
        return toast("Failed to shorten URL");
      }
      setShortenedUrl(res.data);
      onUrlCreated(res.data);
      setUrl("");
      toast("URL shortened successfully!");
      if (prefillUrl) {
        router.replace("/dashboard");
      }
    } catch (error) {
      const err = error as ApiError;
      toast(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!shortenedUrl) return;

    const fullUrl = `${SHORT_DOMAIN}/${shortenedUrl.shortCode}`;
    await navigator.clipboard.writeText(fullUrl);

    setCopied(true);
    toast("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const progress =
    maxUrls === Infinity ? 0 : Math.min((urlCount / maxUrls) * 100, 100);

  return (
    <div className="p-6 rounded-sm bg-gray-900 border border-accent/50 shadow-soft">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Link2 className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 pr-1">
          <h3 className="font-display font-semibold text-foreground">
            Shorten a URL
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {urlCount} / {maxUrls === Infinity ? "∞" : maxUrls} URLs used
          </p>

          {maxUrls !== Infinity && (
            <Progress
              value={progress}
              className={`h-2 ${
                isLimitReached
                  ? "bg-destructive/20"
                  : progress > 80
                  ? "bg-warning/20"
                  : "bg-primary/10"
              }`}
            />
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="Paste your long URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 text-green-500"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Shorten"
            )}
          </Button>
        </div>
      </form>

      {shortenedUrl && (
        <div className="mt-4 p-4 rounded-md bg-success/10 border border-success/30 animate-fade-in">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 min-w-0">
              <Check className="w-5 h-5 text-success shrink-0" />
              <span className="font-medium text-success truncate">
                {`${SHORT_DOMAIN}/${shortenedUrl.shortCode}`}
              </span>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                {copied ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={`${SHORT_DOMAIN}/${shortenedUrl.shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
