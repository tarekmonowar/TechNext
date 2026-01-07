"use client";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterClient() {
  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 sm:px-10 py-12">
        <div className="p-6 sm:p-10 xl:p-16 backdrop-blur-sm w-full max-w-2xl">
          <RegisterForm />
        </div>
      </div>

      <div className="hidden relative flex-col items-center justify-center overflow-hidden md:flex lg:flex">
        <Image
          fill
          priority
          quality={100}
          src="/sign-in.jpg"
          alt="Sign In"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

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
    </div>
  );
}
