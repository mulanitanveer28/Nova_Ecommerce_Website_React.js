export const products = [
  {
    id: 1,
    name: "Sculpted Ceramic Vase",
    category: "Home",
    price: 3199,
    oldPrice: 3999,
    tag: "BESTSELLER",
    color: "#d9d0c4",
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=900&q=85",
    description:
      "A quiet statement piece, shaped by hand and made to bring a little calm to your space.",
  },
  {
    id: 2,
    name: "Everyday Leather Tote",
    category: "Accessories",
    price: 7499,
    oldPrice: 9299,
    tag: "NEW",
    color: "#c6a88c",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
    description:
      "Your everyday carry, thoughtfully designed in a beautifully soft finish.",
  },
  {
    id: 3,
    name: "Cloud Knit Throw",
    category: "Home",
    price: 5299,
    oldPrice: 6599,
    tag: "",
    color: "#d8d9d3",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
    description: "An extra-soft layer for slow mornings and cosy evenings.",
  },
  {
    id: 4,
    name: "Minimal Form Sneakers",
    category: "Footwear",
    price: 7999,
    oldPrice: 9999,
    tag: "SALE",
    color: "#d5d0c9",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    description:
      "Clean lines and all-day comfort, made to go wherever the day takes you.",
  },
  {
    id: 5,
    name: "Studio Stoneware Set",
    category: "Home",
    price: 4299,
    oldPrice: 5399,
    tag: "",
    color: "#c9c1b5",
    image:
      "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=900&q=85",
    description:
      "A considered set for everyday rituals, from first coffee to late-night tea.",
  },
  {
    id: 6,
    name: "Weekend Crossbody",
    category: "Accessories",
    price: 5999,
    oldPrice: 7499,
    tag: "POPULAR",
    color: "#b9a18d",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    description:
      "Compact, versatile and ready for wherever the weekend wanders.",
  },
  {
    id: 7,
    name: "Linen Lounge Shirt",
    category: "Clothing",
    price: 4899,
    oldPrice: 5999,
    tag: "NEW",
    color: "#d9d2c7",
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85",
    description:
      "Relaxed tailoring in breathable linen. An easy favourite, season after season.",
  },
  {
    id: 8,
    name: "Modern Desk Lamp",
    category: "Home",
    price: 6299,
    oldPrice: 8199,
    tag: "SALE",
    color: "#d1c6b5",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
    description:
      "A warm pool of light and a sculptural silhouette for your favourite corner.",
  },
];
export const categories = [
  {
    name: "Home & Living",
    filter: "Home",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Accessories",
    filter: "Accessories",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Clothing",
    filter: "Clothing",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Footwear",
    filter: "Footwear",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=85",
  },
];

// Format all storefront prices in Indian Rupees (INR).
export const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
