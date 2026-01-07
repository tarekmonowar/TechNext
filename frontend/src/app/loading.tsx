export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-xl animate-spin"></div>

        {/* Loading Text */}
        <div className="text-accent text-lg font-semibold tracking-wide">
          Loading...
        </div>
      </div>
    </div>
  );
}
