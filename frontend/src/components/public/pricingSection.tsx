import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground">
            Start free and upgrade as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="p-8 rounded-2xl bg-card border border-border">
            <h3 className="text-2xl font-display font-bold text-foreground mb-2">
              Free
            </h3>
            <p className="text-muted-foreground mb-6">
              Perfect for getting started
            </p>
            <div className="mb-8">
              <span className="text-5xl font-display font-bold text-foreground">
                $0
              </span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-success" />
                Up to 100 shortened URLs
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-success" />
                Basic click analytics
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-success" />
                Standard support
              </li>
            </ul>
            <Button variant="outline" size="lg" className="w-full">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="p-8 rounded-2xl bg-hero border-2 border-primary relative overflow-hidden">
            <div className="absolute top-4 right-4 px-3 py-1 bg-coral-gradient rounded-full text-xs font-semibold text-primary-foreground">
              Popular
            </div>
            <h3 className="text-2xl font-display font-bold text-hero-foreground mb-2">
              Pro
            </h3>
            <p className="text-hero-muted mb-6">For power users and teams</p>
            <div className="mb-8">
              <span className="text-5xl font-display font-bold text-hero-foreground">
                $19
              </span>
              <span className="text-hero-muted">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-hero-foreground">
                <Check className="w-5 h-5 text-success" />
                Unlimited shortened URLs
              </li>
              <li className="flex items-center gap-3 text-hero-foreground">
                <Check className="w-5 h-5 text-success" />
                Advanced analytics
              </li>
              <li className="flex items-center gap-3 text-hero-foreground">
                <Check className="w-5 h-5 text-success" />
                Custom domains
              </li>
              <li className="flex items-center gap-3 text-hero-foreground">
                <Check className="w-5 h-5 text-success" />
                Priority support
              </li>
            </ul>
            <Button variant="default" size="lg" className="w-full">
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
