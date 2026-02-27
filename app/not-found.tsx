import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="mb-2 text-6xl font-bold text-accent">404</p>
        <h1 className="mb-2 font-serif text-3xl font-bold text-primary">
          Page Not Found
        </h1>
        <p className="mb-6 text-muted">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="accent">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
