import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      {/* Big 404 Text */}
      <h1 className="text-[8rem] font-bold text-accent mb-6 animate-pulse">
        TechNext <span className="text-red-600">404</span>
      </h1>

      {/* Message */}
      <p className="text-center text-xl md:text-2xl mb-6 text-white/70">
        Oops! The page you are looking for does not exist.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-5 py-2 bg-accent text-black font-semibold rounded-lg hover:bg-accent/80 transition"
        >
          Go Home
        </Link>
        <Link
          href="/"
          className="inline-block px-6 py-2 border border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-black transition"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}
