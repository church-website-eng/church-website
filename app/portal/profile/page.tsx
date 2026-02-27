import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/portal/login");
  }

  return (
    <>
      <section className="bg-primary py-16 text-center text-white">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">
          My Profile
        </h1>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-2xl px-4">
          <Card className="p-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                {session.user?.name?.charAt(0) || "M"}
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-primary">
                  {session.user?.name}
                </h2>
                <p className="text-sm text-muted">{session.user?.email}</p>
              </div>
            </div>

            <div className="space-y-4 border-t border-border pt-6">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Full Name
                </label>
                <p className="text-foreground">{session.user?.name}</p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Email
                </label>
                <p className="text-foreground">{session.user?.email}</p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Member Since
                </label>
                <p className="text-foreground">2026</p>
              </div>
            </div>

            <div className="mt-6">
              <Button href="/portal" variant="secondary">
                &larr; Back to Dashboard
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
