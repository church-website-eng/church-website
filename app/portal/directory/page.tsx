import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const placeholderMembers = [
  { name: "John Williams", role: "Warden" },
  { name: "Sarah Mitchell", role: "Vestry Member" },
  { name: "Michael Lee", role: "Youth Leader" },
  { name: "Grace Lee", role: "Youth Leader" },
  { name: "Robert Chen", role: "Music Director" },
  { name: "Martha Thompson", role: "Pastoral Care" },
];

export default async function DirectoryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/portal/login");
  }

  return (
    <>
      <section className="bg-primary py-16 text-center text-white">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">
          Member Directory
        </h1>
        <p className="mt-2 text-white/70">
          Connect with fellow parishioners
        </p>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {placeholderMembers.map((member) => (
              <Card key={member.name} className="text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-primary">{member.name}</h3>
                <p className="text-xs text-muted">{member.role}</p>
              </Card>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-muted">
            Full directory with contact information will be available once the
            member database is connected.
          </p>

          <div className="mt-6 text-center">
            <Button href="/portal" variant="secondary">
              &larr; Back to Dashboard
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
