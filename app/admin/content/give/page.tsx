"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiPlus, FiTrash2 } from "react-icons/fi";

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
  ],
  presetAmounts: [25, 50, 100, 250],
  headerQuote: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
  autoDepositEnabled: true,
  taxDeductible: true,
};

export default function EditGive() {
  const [data, setData] = useState<GiveSettings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/give")
      .then((r) => r.json())
      .then((res) => { if (res.value) setData({ ...defaultSettings, ...res.value }); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/give", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: data }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateFund = (index: number, field: keyof Fund, value: string) => {
    const funds = [...data.funds];
    funds[index] = { ...funds[index], [field]: value };
    setData({ ...data, funds });
  };

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-primary">Edit Give / Donate Page</h1>

      <div className="max-w-2xl space-y-6">
        <Card className="space-y-4 p-6">
          <h2 className="font-semibold text-foreground">Header Quote</h2>
          <textarea
            rows={3}
            value={data.headerQuote}
            onChange={(e) => setData({ ...data, headerQuote: e.target.value })}
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </Card>

        <Card className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Donation Funds & e-Transfer Emails</h2>
            <button
              onClick={() => setData({ ...data, funds: [...data.funds, { name: "", email: "" }] })}
              className="flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-accent-light"
            >
              <FiPlus size={12} /> Add Fund
            </button>
          </div>
          <p className="text-xs text-muted">Each fund has its own e-Transfer email. When a donor selects a fund, they&apos;ll see that fund&apos;s specific email address.</p>
          {data.funds.map((f, i) => (
            <div key={i} className="rounded-lg border border-border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-medium text-muted">Fund Name</label>
                  <input
                    value={f.name}
                    onChange={(e) => updateFund(i, "name", e.target.value)}
                    placeholder="e.g. General Tithe"
                    className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <button
                  onClick={() => setData({ ...data, funds: data.funds.filter((_, j) => j !== i) })}
                  className="mt-5 p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">e-Transfer Email</label>
                <input
                  type="email"
                  value={f.email}
                  onChange={(e) => updateFund(i, "email", e.target.value)}
                  placeholder="e.g. tithe@cccgoshencathedral.ca"
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>
          ))}
        </Card>

        <Card className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Preset Amounts ($)</h2>
            <button
              onClick={() => setData({ ...data, presetAmounts: [...data.presetAmounts, 0] })}
              className="flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-accent-light"
            >
              <FiPlus size={12} /> Add Amount
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {data.presetAmounts.map((a, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className="text-sm text-muted">$</span>
                <input
                  type="number"
                  value={a}
                  onChange={(e) => {
                    const amounts = [...data.presetAmounts];
                    amounts[i] = Number(e.target.value);
                    setData({ ...data, presetAmounts: amounts });
                  }}
                  className="flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <button
                  onClick={() => setData({ ...data, presetAmounts: data.presetAmounts.filter((_, j) => j !== i) })}
                  className="p-1 text-destructive"
                >
                  <FiTrash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-4 p-6">
          <h2 className="font-semibold text-foreground">Options</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.autoDepositEnabled}
              onChange={(e) => setData({ ...data, autoDepositEnabled: e.target.checked })}
              className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
            />
            <span className="text-sm">Auto-Deposit Enabled</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.taxDeductible}
              onChange={(e) => setData({ ...data, taxDeductible: e.target.checked })}
              className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
            />
            <span className="text-sm">Tax Deductible</span>
          </label>
        </Card>

        <div className="flex items-center gap-3">
          <Button variant="accent" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          {saved && <span className="text-sm text-green-600">Saved!</span>}
        </div>
      </div>
    </div>
  );
}
