import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="font-serif text-3xl font-bold md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-white/70">
            Last updated: February 27, 2026
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl space-y-8 px-4 text-foreground/80 leading-relaxed">
          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-primary">
              1. Introduction
            </h2>
            <p>
              Celestial Church of Christ, Goshen Cathedral (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to
              protecting your personal information and your right to privacy. This
              Privacy Policy explains how we collect, use, disclose, and safeguard
              your information when you visit our website goshencathedral.ca and
              use our services.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-primary">
              2. Information We Collect
            </h2>
            <p className="mb-2">We may collect the following personal information:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>Contact Information:</strong> Name, email address, phone
                number when you submit a contact form, prayer request, or visitor
                card.
              </li>
              <li>
                <strong>Sacrament Requests:</strong> Personal details provided
                when requesting baptism, naming, or other church sacraments.
              </li>
              <li>
                <strong>Newsletter Subscription:</strong> Email address when you
                subscribe to our newsletter.
              </li>
              <li>
                <strong>Facility Rental Inquiries:</strong> Name, contact details, and
                event information for rental requests.
              </li>
              <li>
                <strong>Testimonies:</strong> Name and testimony content when
                voluntarily submitted.
              </li>
              <li>
                <strong>Usage Data:</strong> We may automatically collect certain
                information about your device and browsing activity, including IP
                address, browser type, and pages visited.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-primary">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc space-y-1 pl-6">
              <li>To respond to your inquiries and prayer requests</li>
              <li>To process sacrament and hall rental requests</li>
              <li>To send newsletters and church announcements (with consent)</li>
              <li>To publish testimonies (with your explicit permission)</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-primary">
              4. Information Sharing
            </h2>
            <p>
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information only in the following
              circumstances:
            </p>
            <ul className="list-disc space-y-1 pl-6 mt-2">
              <li>With your consent</li>
              <li>With church leadership for pastoral care purposes</li>
              <li>To comply with legal requirements or court orders</li>
              <li>
                With service providers who assist in website operations (e.g.,
                email delivery), bound by confidentiality agreements
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-primary">
              5. Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational security
              measures to protect your personal information. However, no method of
              electronic transmission or storage is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-primary">
              6. Your Rights Under Canadian Privacy Law
            </h2>
            <p className="mb-2">
              Under the Personal Information Protection and Electronic Documents
              Act (PIPEDA) and applicable provincial legislation, you have the
              right to:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Access your personal information we hold</li>
              <li>Request correction of inaccurate information</li>
              <li>Withdraw consent for data processing</li>
              <li>Request deletion of your personal data</li>
              <li>File a complaint with the Privacy Commissioner of Canada</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-primary">
              7. Cookies
            </h2>
            <p>
              Our website may use cookies for essential functionality such as
              authentication and session management. We do not use tracking or
              advertising cookies.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-primary">
              8. Children&apos;s Privacy
            </h2>
            <p>
              We do not knowingly collect personal information from children under
              13. If you believe we have inadvertently collected such information,
              please contact us immediately so we can remove it.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-primary">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-serif text-xl font-bold text-primary">
              10. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy or wish to exercise
              your privacy rights, please contact us:
            </p>
            <div className="mt-3 rounded-lg bg-muted-light p-4">
              <p className="font-semibold text-primary">
                Celestial Church of Christ — Goshen Cathedral
              </p>
              <p>441 Rubidge Street, Peterborough, ON, Canada</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:goshencathedralpeterborough@gmail.com"
                  className="text-accent hover:underline"
                >
                  goshencathedralpeterborough@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
