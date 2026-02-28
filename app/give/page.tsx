"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import { FiCopy, FiCheck, FiHeart, FiDollarSign, FiSend } from "react-icons/fi";

interface Fund {
  name: string;
  email: string;
}

interface GiveSettings {
  funds: Fund[];
  presetAmounts: number[];
  headerQuote: string;
  autoDepositEnabled: boolean;
  taxDeductible: boolean;
}

const defaultSettings: GiveSettings = {
  funds: [
    { name: "General Tithe", email: "info@cccgoshencathedral.ca" },
    { name: "Building Fund", email: "info@cccgoshencathedral.ca" },
    { name: "Missions & Evangelism", email: "info@cccgoshencathedral.ca" },
    { name: "Youth Ministry", email: "info@cccgoshencathedral.ca" },
    { name: "Welfare & Outreach", email: "info@cccgoshencathedral.ca" },
    { name: "Thanksgiving Offering", email: "info@cccgoshencathedral.ca" },
    { name: "Special Seed / Harvest", email: "info@cccgoshencathedral.ca" },
    { name: "Other Donations", email: "info@cccgoshencathedral.ca" },
  ],
  presetAmounts: [25, 50, 100, 250],
  headerQuote: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
  autoDepositEnabled: true,
  taxDeductible: true,
};

export default function GivePage() {
  const [settings, setSettings] = useState<GiveSettings>(defaultSettings);
  const [amount, setAmount] = useState<number | "">("");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedFund, setSelectedFund] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/content/give")
      .then((r) => r.json())
      .then((res) => {
        if (res.value) {
          setSettings({ ...defaultSettings, ...res.value });
        }
      })
      .catch(() => {});
  }, []);

  const currentFund = settings.funds[selectedFund] || settings.funds[0];
  const displayAmount = amount || Number(customAmount) || 0;

  const copyEmail = async () => {
    await navigator.clipboard.writeText(currentFund.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const suggestedMessage = `${currentFund.name}${displayAmount ? ` - $${displayAmount}` : ""}`;

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">
          Give Online
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          &ldquo;{settings.headerQuote}&rdquo; &mdash; 2 Corinthians 9:7
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-white/50">
          Celestial Church of Christ &mdash; Goshen Cathedral
        </p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                <FiSend className="text-gold" size={28} />
              </div>
              <h2 className="font-serif text-2xl font-bold text-primary">
                Interac e-Transfer
              </h2>
              <p className="mt-1 text-sm text-muted">
                Send your donation directly from your banking app
              </p>
            </div>

            {/* Fund designation */}
            <div className="mb-6">
              <label className="mb-3 block text-sm font-semibold text-primary">
                Select Fund
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {settings.funds.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedFund(i); setCopied(false); }}
                    className={`rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                      selectedFund === i
                        ? "border-gold bg-gold/10 text-primary"
                        : "border-border text-foreground/70 hover:border-gold/50"
                    }`}
                  >
                    <span className="block font-semibold">{f.name}</span>
                    <span className="block text-xs text-muted mt-0.5">{f.email}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Email to send to */}
            <div className="mb-8 rounded-xl border-2 border-gold/30 bg-gold/5 p-5 text-center">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
                Send e-Transfer to
              </p>
              <p className="mb-1 text-lg font-bold text-primary break-all">
                {currentFund.email}
              </p>
              <p className="mb-3 text-xs text-muted">
                for <strong>{currentFund.name}</strong>
              </p>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-light hover:scale-[1.02] active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <FiCheck size={16} /> Copied!
                  </>
                ) : (
                  <>
                    <FiCopy size={16} /> Copy Email
                  </>
                )}
              </button>
            </div>

            {/* Amount helper */}
            <div className="mb-6">
              <label className="mb-3 block text-sm font-semibold text-primary">
                <FiDollarSign className="mr-1 inline" size={14} />
                Amount (for your reference)
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {settings.presetAmounts.map((a) => (
                  <button
                    key={a}
                    onClick={() => {
                      setAmount(a);
                      setCustomAmount("");
                    }}
                    className={`rounded-lg border-2 px-4 py-3 text-lg font-bold transition-all duration-200 ${
                      amount === a
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-border text-foreground hover:border-gold/50"
                    }`}
                  >
                    ${a}
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setAmount("");
                  }}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  min="1"
                />
              </div>
            </div>

            {/* Suggested message */}
            <div className="mb-8 rounded-lg bg-muted-light p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
                Suggested e-Transfer message
              </p>
              <p className="font-medium text-primary">{suggestedMessage}</p>
              <p className="mt-1 text-xs text-muted">
                Copy this into the &quot;Message&quot; field when sending your e-Transfer
              </p>
            </div>

            {/* Steps */}
            <div className="mb-6">
              <h3 className="mb-4 font-serif text-lg font-bold text-primary">
                How to Send
              </h3>
              <ol className="space-y-3 text-sm text-foreground/70">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xs font-bold text-gold">1</span>
                  Select the <strong className="text-foreground">fund</strong> you want to donate to above
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xs font-bold text-gold">2</span>
                  Open your banking app and select <strong className="text-foreground">Interac e-Transfer</strong>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xs font-bold text-gold">3</span>
                  Add the recipient email: <strong className="text-foreground break-all">{currentFund.email}</strong>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xs font-bold text-gold">4</span>
                  Enter the amount and add the fund name in the <strong className="text-foreground">Message</strong> field
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xs font-bold text-gold">5</span>
                  Send!{settings.autoDepositEnabled && " Auto-deposit is enabled \u2014 no security question needed"}
                </li>
              </ol>
            </div>

            {/* Badges */}
            <div className="flex items-center justify-center gap-6 border-t border-border pt-5 text-xs text-muted">
              {settings.taxDeductible && (
                <span className="flex items-center gap-1.5">
                  <FiHeart size={14} className="text-accent" /> Tax Deductible
                </span>
              )}
              {settings.autoDepositEnabled && (
                <span className="flex items-center gap-1.5">
                  <FiSend size={14} className="text-gold" /> Auto-Deposit Enabled
                </span>
              )}
            </div>
          </Card>

          {/* Bank quick links */}
          <div className="mt-10">
            <h3 className="mb-4 text-center font-serif text-lg font-bold text-primary">
              Send from Your Bank
            </h3>
            <p className="mb-6 text-center text-sm text-muted">
              Log into your bank to send an Interac e-Transfer
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { name: "TD Bank", url: "https://www.td.com/ca/en/personal-banking/products/bank-accounts/ways-to-bank/interac-e-transfer", color: "#008a4b" },
                { name: "RBC", url: "https://www.rbcroyalbank.com/ways-to-bank/online-banking/interac-e-transfer.html", color: "#003168" },
                { name: "Scotiabank", url: "https://www.scotiabank.com/ca/en/personal/bank-accounts/interac-e-transfer.html", color: "#ec111a" },
                { name: "BMO", url: "https://www.bmo.com/main/personal/bank-accounts/interac-e-transfer/", color: "#0075be" },
                { name: "CIBC", url: "https://www.cibc.com/en/personal-banking/ways-to-bank/how-to/send-interac-e-transfer.html", color: "#8b0000" },
                { name: "Desjardins", url: "https://www.desjardins.com/ca/personal/accounts-services/interac-e-transfer/index.jsp", color: "#00874e" },
              ].map((bank) => (
                <a
                  key={bank.name}
                  href={bank.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-lg border-2 border-border px-4 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                  style={{ color: bank.color, borderColor: `${bank.color}30` }}
                >
                  {bank.name}
                </a>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-muted">
              These links go to each bank&apos;s official Interac e-Transfer page.
              You can also open your banking app directly.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
