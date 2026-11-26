import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Search,
  Heart,
  Menu,
  X,
  UserRound,
  LogOut,
} from "lucide-react";
import { useStore } from "../context/StoreContext";
export default function Header() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { cartCount, wishlist, user, setUser } = useStore();
  const navigate = useNavigate();
  const links = [
    ["Home", "/"],
    ["Shop", "/shop"],
    ["Collection", "/collections"],
    ["Sale", "/sale"],
    ["Deals", "/deals"],
  ];
  const submit = (e) => {
    e.preventDefault();
    navigate("/shop?q=" + encodeURIComponent(search));
    setOpen(false);
  };
  return (
    <>
      <div className="announcement">
        A little something extra — enjoy 10% off your first order with{" "}
        <b>WELCOME10</b>
      </div>
      <header className="header">
        <button
          className="icon-btn mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
        <Link to="/" className="logo">
          nova<span>.</span>
        </Link>
        <nav className={open ? "nav nav-open" : "nav"}>
          {links.map(([name, path]) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {name}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <form className="search-box" onSubmit={submit}>
            <Search size={17} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
            />
          </form>
          <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
            <Heart />
            <span className="count">{wishlist.length}</span>
          </Link>
          {user ? (
            <button
              className="icon-btn user-action"
              onClick={() => setUser(null)}
              title="Sign out"
            >
              <LogOut />
            </button>
          ) : (
            <Link to="/login" className="icon-btn" aria-label="Login">
              <UserRound />
            </Link>
          )}
          <Link to="/cart" className="icon-btn bag" aria-label="Shopping bag">
            <ShoppingBag />
            <span className="count">{cartCount}</span>
          </Link>
        </div>
      </header>
    </>
  );
}
