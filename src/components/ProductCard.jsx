import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Plus, Check } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { formatPrice } from "../data";

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWish } = useStore();
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <button
          type="button"
          className={`wish-btn ${wishlist.includes(product.id) ? "wished" : ""}`}
          onClick={() => toggleWish(product.id)}
          aria-label="Toggle wishlist"
        >
          <Heart
            size={18}
            fill={wishlist.includes(product.id) ? "currentColor" : "none"}
          />
        </button>
        <button type="button" className="quick-add" onClick={handleQuickAdd}>
          {added ? (
            <>
              <Check size={17} /> Added to bag
            </>
          ) : (
            <>
              <Plus size={17} /> Quick add
            </>
          )}
        </button>
      </div>
      <div className="product-info">
        <div>
          <Link to={`/product/${product.id}`} className="product-name">
            {product.name}
          </Link>
          <span className="product-category">{product.category}</span>
        </div>
        <div className="price">
          <b>{formatPrice(product.price)}</b>
          {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
        </div>
      </div>
    </article>
  );
}
