"use client";

import { extractPdfText } from "@/lib/pdf";

export default function TestPage() {
  async function test(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await extractPdfText(file);
      console.log(text);
      alert("Success! Check console.");
    } catch (err) {
      console.error(err);
      alert("Failed");
    }
  }

  return <input type="file" onChange={test} />;
}