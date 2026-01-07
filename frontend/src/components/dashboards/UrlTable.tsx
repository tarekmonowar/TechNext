import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  BarChart3,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ShortUrl } from "@/src/Types/urlTypes";

interface UrlTableProps {
  urls: ShortUrl[];
  onDelete: (id: string) => void;
  showUser?: boolean;
}

const SHORT_DOMAIN =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export function UrlTable({ urls, onDelete, showUser = false }: UrlTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const copyToClipboard = async (url: string, id: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const truncateUrl = (url: string, maxLength: number = 50) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
  };

  const handleDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
      toast("URL deleted successfully");
    }
  };

  if (urls.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No URLs yet. Create your first short link above!</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-sm border border-border overflow-hidden hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[40%]">Original URL</TableHead>
              <TableHead>Short URL</TableHead>
              <TableHead className="text-center">Clicks</TableHead>
              <TableHead>Created</TableHead>
              {showUser && <TableHead>User</TableHead>}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls.map((url) => (
              <TableRow key={url.id} className="group">
                <TableCell>
                  <div className="flex items-start gap-2">
                    <button
                      onClick={() => toggleExpand(url.id)}
                      className="p-1 hover:bg-muted rounded shrink-0 mt-0.5"
                    >
                      {expandedIds.has(url.id) ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                    <div className="min-w-0">
                      {expandedIds.has(url.id) ? (
                        <p className="text-sm text-foreground break-all">
                          {url.originalUrl}
                        </p>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="text-sm text-foreground truncate max-w-xs cursor-help">
                              {truncateUrl(url.originalUrl)}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="max-w-md">
                            <p className="break-all">{url.originalUrl}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-primary">
                      {SHORT_DOMAIN}/{url.shortCode}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() =>
                        copyToClipboard(
                          `${SHORT_DOMAIN}/${url.shortCode}`,
                          url.id,
                        )
                      }
                    >
                      {copiedId === url.id ? (
                        <Check className="w-3.5 h-3.5 text-success" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-foreground">
                      {url.clicks.toLocaleString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(url.createdAt), "MMM d, yyyy")}
                  </span>
                </TableCell>
                {showUser && (
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {url.user?.fullName}
                    </span>
                  </TableCell>
                )}
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          asChild
                        >
                          <a
                            href={`${SHORT_DOMAIN}/${url.shortCode}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Open original URL</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteId(url.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete URL</TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="space-y-4 lg:hidden">
        {urls.map((url) => (
          <div
            key={url.id}
            className="rounded-md border border-border bg-muted/30 p-4 space-y-3"
          >
            {/* Original URL */}
            <div>
              <p className="text-xs text-muted-foreground mb-1">Original URL</p>
              <p className="text-sm break-all text-foreground">
                {truncateUrl(url.originalUrl, 80)}
              </p>
            </div>

            {/* Short URL */}
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs text-muted-foreground">Short URL</p>
                <p className="text-sm font-medium text-primary">
                  {SHORT_DOMAIN}/{url.shortCode}
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  copyToClipboard(`${SHORT_DOMAIN}/${url.shortCode}`, url.id)
                }
              >
                {copiedId === url.id ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
                <span className="font-semibold">{url.clicks}</span>
              </div>

              <span className="text-muted-foreground">
                {format(new Date(url.createdAt), "MMM d, yyyy")}
              </span>
            </div>

            {showUser && (
              <div>
                <p className="text-xs text-muted-foreground">User</p>
                <p className="text-sm">{url.user?.fullName}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={`${SHORT_DOMAIN}/${url.shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() => setDeleteId(url.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete URL</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this shortened URL? This action
              cannot be undone. All click data will be permanently lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
