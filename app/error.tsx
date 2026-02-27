"use client";

import Button from "@/components/ui/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-2 font-serif text-3xl font-bold text-primary">
          Something Went Wrong
        </h1>
        <p className="mb-6 text-muted">
          We apologize for the inconvenience. Please try again.
        </p>
        <Button variant="accent" onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
