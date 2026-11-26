import React, { useMemo, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { products, categories, formatPrice } from "../data";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import Newsletter from "../components/Newsletter";
export function Home() {
  return (
    <>
      <section className="hero">
        <img
          className="hero-bg"
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=90"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow light">THE EVERYDAY EDIT · VOL. 01</span>
          <h1>
            Find your
            <br />
            <i>everyday</i> kind
            <br />
            of wonderful.
          </h1>
          <p>Thoughtfully chosen pieces for a life well lived.</p>
          <Link className="btn btn-light" to="/shop">
            Explore the edit <ArrowRight size={17} />
          </Link>
        </div>
        <div className="hero-note">
          LESS, BUT BETTER. &nbsp; — &nbsp; NOVA STUDIO
        </div>
      </section>
      <section className="intro section-pad">
        <span className="eyebrow">A MORE CONSIDERED WAY TO SHOP</span>
        <h2>
          Good design. Good feeling.
          <br />
          <i>Every single day.</i>
        </h2>
        <p>
          Meet the pieces that make the everyday feel a little more special.
          Considered essentials, timeless details and little things worth
          keeping.
        </p>
      </section>
      <section className="section-pad category-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">EXPLORE BY CATEGORY</span>
            <h2>
              Find your <i>favourite.</i>
            </h2>
          </div>
          <Link className="text-link" to="/collections">
            View all collections <ArrowRight size={16} />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((c, i) => (
            <Link
              to={`/shop?category=${c.filter}`}
              className="category-tile"
              key={c.name}
            >
              <img src={c.image} alt={c.name} />
              <span className="category-number">0{i + 1}</span>
              <div>
                <h3>{c.name}</h3>
                <span>
                  Explore <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section-pad products-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE GOOD STUFF</span>
            <h2>
              Little things, <i>big love.</i>
            </h2>
          </div>
          <Link className="text-link" to="/shop">
            Shop all products <ArrowRight size={16} />
          </Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="story-banner">
        <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85" />
        <div>
          <span className="eyebrow light">A NOTE FROM NOVA</span>
          <h2>
            Made to be lived in.
            <br />
            <i>Made to be loved.</i>
          </h2>
          <p>
            We believe the best things aren't always the loudest. They're the
            ones you reach for, day after day.
          </p>
          <Link to="/collections" className="btn btn-light">
            Our point of view <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <Newsletter />
    </>
  );
}
export function Shop({ mode = "" }) {
  const [params] = useSearchParams();
  const [sort, setSort] = useState("featured");
  const [category, setCategory] = useState(params.get("category") || "All");
  const q = (params.get("q") || "").toLowerCase();
  const list = useMemo(() => {
    let a = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!q ||
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)) &&
        (mode !== "sale" || p.oldPrice) &&
        (mode !== "deals" || p.price < 6000),
    );
    if (sort === "low") a.sort((x, y) => x.price - y.price);
    if (sort === "high") a.sort((x, y) => y.price - x.price);
    if (sort === "name") a.sort((x, y) => x.name.localeCompare(y.name));
    return a;
  }, [category, q, sort, mode]);
  const title =
    mode === "sale"
      ? "The sale edit"
      : mode === "deals"
        ? "Good things, better prices"
        : "The Nova shop";
  return (
    <>
      <div className="page-hero">
        <span className="eyebrow">CURATED FOR EVERYDAY</span>
        <h1>
          {title.split(" ").slice(0, -1).join(" ")}{" "}
          <i>{title.split(" ").slice(-1)}</i>
        </h1>
        <p>
          Considered pieces. Timeless favourites. A little something for every
          day.
        </p>
      </div>
      <main className="section-pad shop-main">
        <div className="shop-toolbar">
          <span>{list.length} thoughtfully selected pieces</span>
          <div className="filters">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter category"
            >
              <option value="All">All categories</option>
              {["Home", "Accessories", "Clothing", "Footwear"].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </div>
        </div>
        {list.length ? (
          <div className="product-grid">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>Nothing here just yet.</h2>
            <p>Try another search or category.</p>
            <Link className="btn btn-dark" to="/shop">
              View all products
            </Link>
          </div>
        )}
      </main>
      <Newsletter />
    </>
  );
}
export function Collections() {
  return (
    <>
      <div className="page-hero">
        <span className="eyebrow">THE NOVA COLLECTIONS</span>
        <h1>
          Thoughtful edits, <i>beautifully made.</i>
        </h1>
        <p>
          Explore the pieces that make a house a home and an outfit your own.
        </p>
      </div>
      <section className="section-pad collection-list">
        {categories.map((c, i) => (
          <Link
            className="collection-row"
            to={`/shop?category=${c.filter}`}
            key={c.name}
          >
            <div className="collection-photo">
              <img src={c.image} />
            </div>
            <div>
              <span className="eyebrow">COLLECTION 0{i + 1}</span>
              <h2>{c.name}</h2>
              <p>
                A considered collection of everyday favourites, chosen to stay
                with you.
              </p>
              <span className="text-link">
                Explore collection <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
export function ProductDetail() {
  const { id } = useParams();
  const p = products.find((x) => x.id === Number(id));
  const { addToCart } = useStore();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const handleAddToBag = () => {
    addToCart(p, qty);
    navigate("/cart");
  };
  if (!p)
    return (
      <div className="empty-state">
        <h2>Product not found</h2>
        <Link to="/shop">Back to shop</Link>
      </div>
    );
  return (
    <main className="section-pad detail-page">
      <div className="detail-image">
        <img src={p.image} alt={p.name} />
      </div>
      <div className="detail-copy">
        <span className="eyebrow">{p.category.toUpperCase()} · NOVA EDIT</span>
        <h1>{p.name}</h1>
        <div className="price detail-price">
          <b>{formatPrice(p.price)}</b>
          {p.oldPrice && <del>{formatPrice(p.oldPrice)}</del>}
        </div>
        <p>{p.description}</p>
        <div className="detail-rule" />
        <span className="eyebrow">QUANTITY</span>
        <div className="qty-control">
          <button type="button" onClick={() => setQty(Math.max(1, qty - 1))}>
            <Minus size={15} />
          </button>
          <span>{qty}</span>
          <button type="button" onClick={() => setQty(qty + 1)}>
            <Plus size={15} />
          </button>
        </div>
        <button
          type="button"
          className="btn btn-dark add-detail"
          onClick={handleAddToBag}
        >
          Add to bag — {formatPrice(p.price * qty)} <ShoppingBag size={17} />
        </button>
        <div className="detail-perks">
          <span>
            <CheckCircle2 /> Thoughtfully selected
          </span>
          <span>
            <CheckCircle2 /> Easy returns
          </span>
          <span>
            <CheckCircle2 /> Secure checkout
          </span>
        </div>
      </div>
    </main>
  );
}
export function Cart() {
  const { cart, updateQty, subtotal } = useStore();
  return (
    <main className="section-pad cart-page">
      <div className="page-title-small">
        <span className="eyebrow">YOUR NOVA EDIT</span>
        <h1>
          Your shopping <i>bag.</i>
        </h1>
      </div>
      {!cart.length ? (
        <div className="empty-state">
          <ShoppingBag size={34} />
          <h2>Your bag is taking a little break.</h2>
          <p>Find something lovely to bring home.</p>
          <Link to="/shop" className="btn btn-dark">
            Explore the shop <ArrowRight />
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((p) => (
              <div className="cart-item" key={p.id}>
                <img src={p.image} />
                <div className="cart-item-info">
                  <Link to={`/product/${p.id}`}>{p.name}</Link>
                  <span>{p.category}</span>
                  <b>{formatPrice(p.price)}</b>
                  <div className="qty-control">
                    <button onClick={() => updateQty(p.id, p.qty - 1)}>
                      <Minus size={14} />
                    </button>
                    <span>{p.qty}</span>
                    <button onClick={() => updateQty(p.id, p.qty + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => updateQty(p.id, 0)}
                  aria-label="Remove item"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>
          <aside className="order-summary">
            <h3>Order summary</h3>
            <div>
              <span>Subtotal</span>
              <b>{formatPrice(subtotal)}</b>
            </div>
            <div>
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <b>{formatPrice(subtotal)}</b>
            </div>
            <Link to="/checkout" className="btn btn-dark checkout-btn">
              Continue to checkout <ArrowRight />
            </Link>
            <p>
              <Lock size={14} /> Secure checkout
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
export function Wishlist() {
  const { wishlist } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.id));
  return (
    <main className="section-pad shop-main">
      <div className="page-title-small">
        <span className="eyebrow">SAVED FOR LATER</span>
        <h1>
          Your <i>wishlist.</i>
        </h1>
      </div>
      {saved.length ? (
        <div className="product-grid">
          {saved.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>A place for your favourites.</h2>
          <p>Tap the heart on anything you love and it'll be waiting here.</p>
          <Link className="btn btn-dark" to="/shop">
            Find your favourites
          </Link>
        </div>
      )}
    </main>
  );
}
export function Checkout() {
  const { cart, subtotal } = useStore();
  const [done, setDone] = useState(false);
  if (!cart.length && !done)
    return (
      <div className="empty-state">
        <h2>Your bag is empty.</h2>
        <Link to="/shop">Go shopping</Link>
      </div>
    );
  return (
    <main className="section-pad checkout-page">
      <span className="eyebrow">ALMOST YOURS</span>
      <h1>
        Checkout <i>with ease.</i>
      </h1>
      {done ? (
        <div className="empty-state">
          <CheckCircle2 size={42} />
          <h2>Thank you for your order!</h2>
          <p>This is a demo storefront. No payment was processed.</p>
          <Link to="/shop" className="btn btn-dark">
            Continue shopping
          </Link>
        </div>
      ) : (
        <form
          className="checkout-form"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <div>
            <h3>Delivery details</h3>
            <div className="form-grid">
              <label>
                First name
                <input required />
              </label>
              <label>
                Last name
                <input required />
              </label>
              <label className="full">
                Email address
                <input type="email" required />
              </label>
              <label className="full">
                Street address
                <input required />
              </label>
              <label>
                City
                <input required />
              </label>
              <label>
                Postal code
                <input required />
              </label>
            </div>
            <h3>Payment</h3>
            <p className="demo-payment">
              <Lock size={16} /> Demo checkout — no real payment details needed.
            </p>
            <label className="full">
              Payment method
              <select>
                <option>Pay on delivery (demo)</option>
              </select>
            </label>
            <button className="btn btn-dark checkout-btn">
              Place demo order — {formatPrice(subtotal)} <ArrowRight />
            </button>
          </div>
          <aside className="order-summary">
            <h3>Your order</h3>
            {cart.map((p) => (
              <div key={p.id}>
                <span>
                  {p.name} × {p.qty}
                </span>
                <b>{formatPrice(p.price * p.qty)}</b>
              </div>
            ))}
            <div className="summary-total">
              <span>Total</span>
              <b>{formatPrice(subtotal)}</b>
            </div>
          </aside>
        </form>
      )}
    </main>
  );
}
export function Auth({ signup = false }) {
  const { setUser } = useStore();
  const nav = useNavigate();
  const [error, setError] = useState("");
  const submit = (e) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const email = d.get("email");
    const password = d.get("password");
    if (password.length < 6) {
      setError("Please use at least 6 characters for your password.");
      return;
    }
    setUser({ name: signup ? d.get("name") : email.split("@")[0], email });
    nav("/");
  };
  return (
    <main className="auth-page">
      <div className="auth-visual">
        <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85" />
        <div>
          <span className="eyebrow light">WELCOME TO NOVA</span>
          <h2>
            Make room for
            <br />
            <i>the good things.</i>
          </h2>
        </div>
      </div>
      <div className="auth-form-wrap">
        <form className="auth-form" onSubmit={submit}>
          <span className="eyebrow">
            {signup ? "YOUR NOVA STORY STARTS HERE" : "GOOD TO HAVE YOU BACK"}
          </span>
          <h1>{signup ? "Create an account." : "Welcome back."}</h1>
          <p>
            {signup
              ? "Join us for considered finds and little everyday joys."
              : "Sign in to see your saved favourites and orders."}
          </p>
          {signup && (
            <label>
              Your name
              <input name="name" placeholder="Alex Morgan" required />
            </label>
          )}
          <label>
            Email address
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              placeholder="At least 6 characters"
              minLength="6"
              required
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="btn btn-dark auth-submit">
            {signup ? "Create account" : "Sign in"} <ArrowRight />
          </button>
          <div className="auth-switch">
            {signup ? "Already have an account?" : "New to Nova?"}{" "}
            <Link to={signup ? "/login" : "/signup"}>
              {signup ? "Sign in" : "Create an account"}
            </Link>
          </div>
          <small className="auth-note">
            Demo authentication: account details are stored locally in this
            browser only.
          </small>
        </form>
      </div>
    </main>
  );
}
