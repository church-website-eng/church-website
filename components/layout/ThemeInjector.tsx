"use client";

import { useEffect } from "react";

function lightenColor(hex: string, amount: number) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + amount);
  const b = Math.min(255, (num & 0x0000ff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export default function ThemeInjector() {
  useEffect(() => {
    fetch("/api/content/theme_settings")
      .then((r) => r.json())
      .then((res) => {
        if (!res.value) return;
        const t = res.value;
        const root = document.documentElement;

        if (t.primaryColor) {
          root.style.setProperty("--primary", t.primaryColor);
          root.style.setProperty("--primary-light", lightenColor(t.primaryColor, 20));
        }
        if (t.accentColor) {
          root.style.setProperty("--accent", t.accentColor);
          root.style.setProperty("--accent-light", lightenColor(t.accentColor, 20));
        }
        if (t.goldColor) {
          root.style.setProperty("--gold", t.goldColor);
          root.style.setProperty("--gold-light", lightenColor(t.goldColor, 30));
        }

        if (t.fontSerif && t.fontSerif !== "Georgia" && t.fontSerif !== "Times New Roman") {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(t.fontSerif)}:wght@400;700&display=swap`;
          document.head.appendChild(link);
          root.style.setProperty("--font-serif", `"${t.fontSerif}", Georgia, serif`);
        } else if (t.fontSerif) {
          root.style.setProperty("--font-serif", `"${t.fontSerif}", serif`);
        }

        if (t.fontSans && t.fontSans !== "system-ui") {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(t.fontSans)}:wght@400;500;600;700&display=swap`;
          document.head.appendChild(link);
          document.body.style.fontFamily = `"${t.fontSans}", system-ui, sans-serif`;
        }

        if (t.fontSize === "small") {
          root.style.fontSize = "14px";
        } else if (t.fontSize === "large") {
          root.style.fontSize = "18px";
        }
      })
      .catch(() => {});
  }, []);

  return null;
}
