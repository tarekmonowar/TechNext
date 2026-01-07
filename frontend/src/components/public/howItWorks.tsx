export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Paste Your Link",
      description: "Enter any long URL that you want to shorten.",
    },
    {
      number: "02",
      title: "Get Short URL",
      description: "Instantly receive a clean, short link ready to share.",
    },
    {
      number: "03",
      title: "Track & Analyze",
      description: "Monitor performance with detailed click analytics.",
    },
  ];

  return (
    <section>
      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 border-b border-gray-800 ">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
              Three Simple Steps
            </h2>
            <p className="text-muted-foreground">
              Get started in seconds. No complicated setup or technical
              knowledge required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="relative text-center">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-px bg-linear-to-r from-primary/50 to-primary/0" />
                )}
                <div className="w-24 h-24 rounded-full bg-coral-gradient flex items-center justify-center mx-auto mb-6 shadow-glow">
                  <span className="text-2xl font-display font-bold text-primary-foreground">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
