import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { products } from "../data";

const StoreContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.warn(`Could not read ${key} from localStorage:`, error);
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() =>
    readStorage("nova-cart", []).map((item) => {
      const currentProduct = products.find(
        (product) => String(product.id) === String(item.id),
      );
      return currentProduct
        ? { ...currentProduct, qty: Math.max(1, Number(item.qty) || 1) }
        : item;
    }),
  );
  const [wishlist, setWishlist] = useState(() =>
    readStorage("nova-wishlist", []),
  );
  const [user, setUser] = useState(() => readStorage("nova-user", null));

  useEffect(() => {
    localStorage.setItem("nova-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("nova-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) localStorage.setItem("nova-user", JSON.stringify(user));
    else localStorage.removeItem("nova-user");
  }, [user]);

  // Add a new product or increase the quantity if it is already in the bag.
  const addToCart = (product, quantity = 1) => {
    if (!product || product.id == null) {
      console.error(
        "Cannot add product: product or product.id is missing.",
        product,
      );
      return;
    }

    const amount = Math.max(1, Number(quantity) || 1);
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => String(item.id) === String(product.id),
      );
      if (existing) {
        return currentCart.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, qty: (Number(item.qty) || 0) + amount }
            : item,
        );
      }
      return [...currentCart, { ...product, qty: amount }];
    });
  };

  const updateQty = (id, quantity) => {
    const amount = Number(quantity) || 0;
    setCart((currentCart) =>
      amount <= 0
        ? currentCart.filter((item) => String(item.id) !== String(id))
        : currentCart.map((item) =>
            String(item.id) === String(id) ? { ...item, qty: amount } : item,
          ),
    );
  };

  const toggleWish = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      user,
      setUser,
      addToCart,
      updateQty,
      toggleWish,
      cartCount: cart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0),
      subtotal: cart.reduce(
        (sum, item) =>
          sum + (Number(item.price) || 0) * (Number(item.qty) || 0),
        0,
      ),
    }),
    [cart, wishlist, user],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
