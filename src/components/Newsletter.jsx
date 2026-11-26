import React from "react";
import { ArrowRight } from "lucide-react";
export default function Newsletter() {
  return (
    <section className="newsletter-band">
      <div>
        <span className="eyebrow">THE NOVA LETTER</span>
        <h2>
          A little inspiration
          <br />
          <i>in your inbox.</i>
        </h2>
        <p>Fresh finds, considered edits and things we're loving lately.</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("You’re on the list. Welcome to Nova!");
        }}
      >
        <input type="email" placeholder="Enter your email address" required />
        <button aria-label="Join newsletter">
          <ArrowRight />
        </button>
        <small>
          By subscribing, you agree to receive our occasional emails.
        </small>
      </form>
    </section>
  );
}
