"use client";

import { useState } from "react";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  async function askAI() {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    const data = await res.json();

    setReply(data.reply);
  }

  return (
    <div className="mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Ask Mesh AI</h2>

      <input
        className="w-full border rounded-lg p-3"
        placeholder="Ask anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={askAI}
        className="mt-4 bg-black text-white px-6 py-3 rounded-lg"
      >
        Ask
      </button>

      {reply && (
        <div className="mt-6 border-t pt-4">
          <p className="font-semibold">AI Reply</p>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}