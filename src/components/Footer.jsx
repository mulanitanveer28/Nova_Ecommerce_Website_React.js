import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, ArrowUpRight } from "lucide-react";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Link to="/" className="logo footer-logo">
            nova<span>.</span>
          </Link>
          <p>
            Thoughtful things for
            <br />
            everyday living.
          </p>
          <div className="socials">
            <a href="https://instagram.com" aria-label="Instagram">
              <Instagram />
            </a>
            <a href="https://facebook.com" aria-label="Facebook">
              <Facebook />
            </a>
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/shop">Shop all</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/sale">Sale</Link>
          <Link to="/deals">Special deals</Link>
        </div>
        <div>
          <h4>Help</h4>
          <a href="mailto:hello@nova.example">Contact us</a>
          <a href="mailto:hello@nova.example">Shipping & returns</a>
          <a href="mailto:hello@nova.example">FAQs</a>
        </div>
        <div className="newsletter">
          <h4>Good things, occasionally.</h4>
          <p>
            Sign up for new arrivals, thoughtful reads and 10% off your first
            order.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for subscribing!");
            }}
          >
            <input type="email" placeholder="Your email address" required />
            <button aria-label="Subscribe">
              <ArrowUpRight />
            </button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Nova Studio. All rights reserved.</span>
        <span>Made for the everyday.</span>
      </div>
    </footer>
  );
}
