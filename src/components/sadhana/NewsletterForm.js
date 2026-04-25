/* NewsletterForm — "Invite the Divine into your Inbox"
   Ghost input (bottom-border only) + gold CTA button.
   Handles submission via the existing /api/newsletter route (or any endpoint).

   Props:
     apiEndpoint  {string}  POST target (defaults to "/api/newsletter")
*/

"use client";

import { useState } from "react";

export default function NewsletterForm({ apiEndpoint = "/api/newsletter" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You have joined the Sangha. 🙏");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Could not connect. Please try again later.");
    }
  };

  return (
    <div className="sk-newsletter">
      <h2 className="sk-newsletter__heading">Invite the Divine into your Inbox</h2>
      <p className="sk-newsletter__sub">
        Receive the sacred mantra of the day, every morning at Brahma Muhurta.
      </p>

      {status === "success" ? (
        <p className="sk-newsletter__feedback sk-newsletter__feedback--ok">
          {message}
        </p>
      ) : (
        <form className="sk-newsletter__form" onSubmit={handleSubmit} noValidate>
          <label
            htmlFor="sk-email"
            style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}
          >
            Email address
          </label>
          <input
            className="sk-newsletter__input"
            id="sk-email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            required
          />
          <button
            type="submit"
            className="sk-btn sk-newsletter__submit"
            disabled={status === "loading"}
            aria-busy={status === "loading"}
          >
            {status === "loading" ? "Joining…" : "Join the Sangha →"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="sk-newsletter__feedback sk-newsletter__feedback--err">
          {message}
        </p>
      )}
    </div>
  );
}
