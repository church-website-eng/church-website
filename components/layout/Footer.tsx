import Link from "next/link";
import Image from "next/image";
import { FiFacebook, FiYoutube, FiInstagram, FiMail, FiMusic } from "react-icons/fi";
import { getContent } from "@/lib/content";
import { defaultChurchInfo, defaultServiceTimes } from "@/data/defaults";

export default async function Footer() {
  const [churchInfo, serviceTimes] = await Promise.all([
    getContent("church_info", defaultChurchInfo),
    getContent("service_times", defaultServiceTimes),
  ]);

  const socialLinks = [
    { href: churchInfo.facebookUrl, icon: <FiFacebook size={20} />, label: "Facebook" },
    { href: churchInfo.youtubeUrl, icon: <FiYoutube size={20} />, label: "YouTube" },
    { href: churchInfo.instagramUrl, icon: <FiInstagram size={20} />, label: "Instagram" },
    { href: (churchInfo as typeof churchInfo & { audiomackUrl?: string }).audiomackUrl, icon: <FiMusic size={20} />, label: "Audiomack" },
    { href: churchInfo.email ? `mailto:${churchInfo.email}` : "", icon: <FiMail size={20} />, label: "Email" },
  ];

  return (
    <footer className="border-t border-border bg-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        {/* Church info */}
        <div>
          <div className="mb-3 flex items-center gap-3">
            <img
              src={(churchInfo as typeof churchInfo & { logoUrl?: string }).logoUrl || "/images/logo.jpeg"}
              alt="CCC Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h3 className="text-lg font-bold font-serif">
              {churchInfo.churchName}
            </h3>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            {churchInfo.cathedralName}<br />
            Ayo Mother Parish<br />
            {churchInfo.street}<br />
            {churchInfo.city}, {churchInfo.province}<br />
            Arch Diocese of Canada | National Headquarter
          </p>
        </div>

        {/* Service times */}
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gold">
            Service Times
          </h4>
          <ul className="space-y-1 text-sm text-white/70">
            {serviceTimes.services.map((s) => (
              <li key={s.day}>{s.day}: {s.times[0]}</li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gold">
            Quick Links
          </h4>
          <ul className="space-y-1 text-sm">
            {[
              { label: "About Us", href: "/about" },
              { label: "Sermons", href: "/sermons" },
              { label: "Events", href: "/events" },
              { label: "Give Online", href: "/give" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/70 transition hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gold">
            Follow Us
          </h4>
          <div className="flex gap-4">
            {socialLinks.map((link) =>
              link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/70 transition-all duration-200 hover:text-gold hover:scale-110"
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ) : null,
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50">
        <p>&copy; {new Date().getFullYear()} {churchInfo.churchName} — {churchInfo.cathedralName}. All rights reserved.</p>
        <Link href="/privacy" className="mt-1 inline-block text-white/40 transition hover:text-gold">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
