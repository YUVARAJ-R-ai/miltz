'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import ProductCarousel from '../components/ProductCarousel';
import BrandShowcase from '../components/BrandShowcase';
import BrandStory from '../components/BrandStory';
import OrderForm from '../components/OrderForm';

// Product Data — 4 products
const products = [
  {
    id: 1,
    title: "Puff Corn",
    shortTitle: "Puff Corn",
    category: "Signature Snack",
    flavor: "Light & Crispy Goodness",
    tagline: "The crunch that never stops.",
    image: "/images/product-list-puff_corn.png",
    pricing: [
      { label: "Bulk 1kg", size: "1kg", price: 170 },
      { label: "15g Pack", size: "15g", price: 5 },
      { label: "30g Pack", size: "30g", price: 10 },
      { label: "60g Pack", size: "60g", price: 60 },
    ],
    idealFor: [
      "Movie marathons with friends",
      "After-school snacking",
      "Party snack bowls",
      "Light cravings anytime"
    ],
    freeFrom: [
      "Artificial Preservatives",
      "Trans Fats",
      "MSG",
      "Gluten"
    ]
  },
  {
    id: 2,
    title: "Tangy Tomato Seasoning",
    shortTitle: "Tangy Tomato",
    category: "Popcorn Seasoning",
    flavor: "Zesty Tomato Punch",
    tagline: "Bold tang. Addictive kick.",
    image: "/images/product-list-tangy_tomato.png",
    idealFor: [
      "Adding a zesty kick to snacks",
      "Lovers of tangy flavors",
      "Spicing up roasted nuts",
      "Elevating homemade popcorn"
    ],
    freeFrom: [
      "Artificial Flavors",
      "High Fructose Corn Syrup",
      "Palm Oil",
      "Dairy"
    ]
  },
  {
    id: 3,
    title: "Cheese & Onion Seasoning",
    shortTitle: "Cheese & Onion",
    category: "Popcorn Seasoning",
    flavor: "Savory Cheese & Onion Blend",
    tagline: "Rich. Savory. Irresistible.",
    image: "/images/product-list-cheese_onion.png",
    idealFor: [
      "Sophisticated snacking",
      "Pairing with cold beverages",
      "Homemade potato chips",
      "Savory flavor enthusiasts"
    ],
    freeFrom: [
      "Artificial Enhancers",
      "Trans Fats",
      "Gluten",
      "Saturated Fats"
    ]
  },
  {
    id: 4,
    title: "Classic Cheese Seasoning",
    shortTitle: "Cheese Seasoning",
    category: "Popcorn Seasoning",
    flavor: "Cinema-Style Cheddar",
    tagline: "The OG cinema flavor.",
    image: "/images/product-list-cheese_seasoning.png",
    idealFor: [
      "Recreating the cinema experience",
      "Upgrading plain popcorn",
      "Sprinkling on fries or nachos",
      "Family movie nights"
    ],
    freeFrom: [
      "Artificial Colors",
      "Added Sugar",
      "Cholesterol",
      "GMOs"
    ]
  },
];

export default function Home() {
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderProduct, setOrderProduct] = useState(null);

  const handleOrder = (product) => {
    setOrderProduct(product);
    setOrderOpen(true);
  };

  return (
    <>
      <Navbar onOrderClick={() => { setOrderProduct(null); setOrderOpen(true); }} />
      <main>
        <Hero />

        {/* Products Section */}
        <div id="products">
          <ProductCarousel products={products} onOrder={handleOrder} />
        </div>

        <BrandShowcase />
        <BrandStory />
      </main>
      <Footer />

      {/* Order Form Modal */}
      <OrderForm
        isOpen={orderOpen}
        onClose={() => setOrderOpen(false)}
        product={orderProduct}
      />
    </>
  );
}
