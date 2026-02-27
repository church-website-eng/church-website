import Image from "next/image";
import Button from "@/components/ui/Button";
import { defaultChurchInfo } from "@/data/defaults";

type ChurchInfo = typeof defaultChurchInfo;

export default function Hero({ churchInfo }: { churchInfo?: ChurchInfo }) {
  const info = churchInfo || defaultChurchInfo;

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center text-white">
      <Image
        src="/images/church-building.png"
        alt={`${info.cathedralName} — ${info.street}, ${info.city}`}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <Image
          src="/images/logo.jpeg"
          alt={`${info.churchName} Logo`}
          width={140}
          height={140}
          className="animate-fade-in-up mx-auto mb-6 rounded-full shadow-lg shadow-black/30"
        />
        <h1 className="animate-fade-in-up delay-100 mb-2 font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          {info.churchName}
        </h1>
        <p className="animate-fade-in-up delay-200 mb-1 text-lg font-semibold text-gold md:text-xl">
          {info.cathedralName}
        </p>
        <p className="animate-fade-in-up delay-300 mb-2 text-sm text-white/70">
          {info.subtitle}
        </p>
        <p className="animate-fade-in-up delay-500 mx-auto mb-8 mt-4 max-w-2xl text-base text-white/80 md:text-lg">
          {info.motto}
        </p>
        <div className="animate-fade-in-up delay-700 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/visit" variant="accent" size="lg">
            Plan Your Visit
          </Button>
          <Button
            href="/live"
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-primary"
          >
            Watch Live
          </Button>
        </div>
      </div>
    </section>
  );
}
