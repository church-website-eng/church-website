import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import Card from "@/components/ui/Card";
import { getContent } from "@/lib/content";
import { defaultChurchInfo, defaultServiceTimes, defaultContactPage } from "@/data/defaults";
import ContactForm from "./ContactForm";

export default async function ContactPage() {
  const [churchInfo, serviceTimes, contactPage] = await Promise.all([
    getContent("church_info", defaultChurchInfo),
    getContent("service_times", defaultServiceTimes),
    getContent("contact_page", defaultContactPage),
  ]);

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">
          Contact Us
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          {contactPage.subtitle}
        </p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact form */}
            <ContactForm
              formHeading={contactPage.formHeading}
              successMessage={contactPage.successMessage}
            />

            {/* Info cards */}
            <div className="space-y-6">
              <Card>
                <div className="flex items-start gap-4">
                  <FiMapPin className="mt-1 text-accent" size={20} />
                  <div>
                    <h3 className="font-semibold text-primary">Address</h3>
                    <p className="text-sm text-muted">
                      {churchInfo.cathedralName}<br />
                      {churchInfo.churchName}<br />
                      {churchInfo.street}<br />
                      {churchInfo.city}, {churchInfo.province}<br />
                      Arch Diocese of Canada
                    </p>
                  </div>
                </div>
              </Card>

              {churchInfo.phone && (
                <Card>
                  <div className="flex items-start gap-4">
                    <FiPhone className="mt-1 text-accent" size={20} />
                    <div>
                      <h3 className="font-semibold text-primary">Phone</h3>
                      <p className="text-sm text-muted">
                        <a href={`tel:${churchInfo.phone}`} className="hover:text-accent">
                          {churchInfo.phone}
                        </a>
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {!churchInfo.phone && (
                <Card>
                  <div className="flex items-start gap-4">
                    <FiPhone className="mt-1 text-accent" size={20} />
                    <div>
                      <h3 className="font-semibold text-primary">Phone</h3>
                      <p className="text-sm text-muted">Contact the parish office</p>
                    </div>
                  </div>
                </Card>
              )}

              <Card>
                <div className="flex items-start gap-4">
                  <FiMail className="mt-1 text-accent" size={20} />
                  <div>
                    <h3 className="font-semibold text-primary">Email</h3>
                    <p className="text-sm text-muted">
                      <a href={`mailto:${churchInfo.email}`} className="hover:text-accent">
                        {churchInfo.email}
                      </a>
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-4">
                  <FiClock className="mt-1 text-accent" size={20} />
                  <div>
                    <h3 className="font-semibold text-primary">Service Times</h3>
                    <div className="text-sm text-muted space-y-0.5">
                      {serviceTimes.services.map((s: { day: string; times: string[] }) => (
                        <p key={s.day}>{s.day}: {s.times[0]}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {contactPage.officeHours && (
                <Card>
                  <div className="flex items-start gap-4">
                    <FiClock className="mt-1 text-accent" size={20} />
                    <div>
                      <h3 className="font-semibold text-primary">Office Hours</h3>
                      <p className="text-sm text-muted">{contactPage.officeHours}</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Map */}
              <div className="h-64 overflow-hidden rounded-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2838.5!2d-78.3197!3d44.3001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s441+Rubidge+Street%2C+Peterborough%2C+ON!5e0!3m2!1sen!2sca!4v1"
                  className="h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Goshen Cathedral Location"
                />
              </div>

              {contactPage.additionalInfo && (
                <p className="text-sm text-muted italic">
                  {contactPage.additionalInfo}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
