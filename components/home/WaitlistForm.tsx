"use client";

import { useState } from "react";
import { CheckCircle2, Mail, ArrowRight, Loader2 } from "lucide-react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwlOvasv1CAVdqN3RYH_We76T-aYDr--2Is-3E4xhNduhdmLDcaDIxbfugZ6qsDa6QqYw/exec";

type FormStatus = "idle" | "loading" | "success" | "error";

export const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ email }),
      });

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 px-6 py-4 bg-primary/10 border border-primary/30 rounded-2xl animate-fade-in">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full">
          <CheckCircle2 className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-foreground">
            You&apos;re on the list!
          </p>
          <p className="text-sm text-muted-foreground">
            We&apos;ll notify you when Pico launches.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
    >
      <div className="relative flex-1">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={status === "loading"}
          className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl 
                     text-foreground placeholder:text-muted-foreground
                     focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                     disabled:opacity-50 transition-all duration-200"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl
                   hover:brightness-110 active:scale-[0.98]
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200 overflow-hidden group"
      >
        <span
          className={`flex items-center justify-center gap-2 ${
            status === "loading" ? "opacity-0" : "opacity-100"
          }`}
        >
          Join Waitlist
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        )}
      </button>
      {status === "error" && (
        <p className="text-red-500 text-sm mt-2">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
};
