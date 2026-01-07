import Image from "next/image";
import LoginForm from "./LoginForm";
import Link from "next/link";

export default function LoginClient() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
        <div className="relative flex flex-col items-center justify-center overflow-hidden md:flex lg:flex">
          <Image
            fill
            priority
            quality={100}
            src="/sign-in.jpg"
            alt="Sign In"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/70" />

          <div className="relative z-10 text-center px-6 sm:px-12 lg:px-16 py-12 lg:py-24 max-w-md space-y-6 text-white">
            <h1 className="text-4xl font-bold backdrop-blur-md inline-block text-accent">
              <Link href="/">Shortify</Link>
            </h1>
            <p className="text-white/80 text-sm tracking-wide">
              Short Your Long Url
            </p>

            <div className="mt-8 space-y-4 text-left bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-xl">
              {[
                {
                  title: "Secure Platform",
                  desc: "Enterprise-grade authentication & safety",
                },
                {
                  title: "Global Reach",
                  desc: "Connect with verified user worldwide",
                },
                {
                  title: "Track Your Url",
                  desc: "Track your urls within minutes",
                },
              ].map((feature, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-green-400 font-bold shrink-0">✓</span>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {feature.title}
                    </p>
                    <p className="text-white/70 text-xs">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center px-6 sm:px-10 lg:px-16 py-12 bg-background">
          <div className="w-full max-w-xl space-y-8">
            <div className="text-center">
              {/* Logo */}
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome Back
              </h1>
              <p className="text-muted-foreground text-sm">
                Sign in to your Shortify account
              </p>
            </div>

            {/* Form */}
            <div className="rounded-2xl  p-6 sm:p-8 backdrop-blur-sm">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
