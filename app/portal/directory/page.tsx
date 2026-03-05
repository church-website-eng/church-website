import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { getContent } from "@/lib/content";
import { defaultDirectory } from "@/data/defaults";
import { FiPhone, FiMail } from "react-icons/fi";

type DirectoryEntry = {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  ministry: string;
  photoUrl: string;
};

export default async function DirectoryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/portal/login");
  }

  const directory = await getContent("directory", defaultDirectory);
  const items: DirectoryEntry[] = directory.items || [];

  // Group by ministry
  const grouped: Record<string, DirectoryEntry[]> = {};
  for (const item of items) {
    const key = item.ministry || "General";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  }
  const ministries = Object.keys(grouped).sort();

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
          {items.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted">
              The member directory is being set up. Please check back later.
            </p>
          ) : (
            <div className="space-y-10">
              {ministries.map((ministry) => (
                <div key={ministry}>
                  <h2 className="mb-4 font-serif text-xl font-bold text-primary">
                    {ministry}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {grouped[ministry].map((member) => (
                      <Card key={member.id} className="text-center">
                        {member.photoUrl ? (
                          <img
                            src={member.photoUrl}
                            alt={member.name}
                            className="mx-auto mb-3 h-16 w-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                            {member.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <h3 className="font-semibold text-primary">
                          {member.name}
                        </h3>
                        {member.title && member.title !== member.name && (
                          <p className="text-xs text-muted">{member.title}</p>
                        )}
                        <div className="mt-2 flex items-center justify-center gap-3">
                          {member.phone && (
                            <a
                              href={`tel:${member.phone}`}
                              className="text-accent hover:text-accent-light"
                              title={member.phone}
                            >
                              <FiPhone size={14} />
                            </a>
                          )}
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="text-accent hover:text-accent-light"
                              title={member.email}
                            >
                              <FiMail size={14} />
                            </a>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <Button href="/portal" variant="secondary">
              &larr; Back to Dashboard
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
