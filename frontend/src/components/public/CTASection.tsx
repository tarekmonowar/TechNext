import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 bg-coral-gradient">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
          Join thousands of users who trust Shortify to manage their links.
          Start shortening URLs for free today.
        </p>
        <Button>
          <Link href="/login" className="flex items-center justify-center">
            Create Free Account
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
