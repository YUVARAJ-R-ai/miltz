import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import TheatreSection from '../components/TheatreSection';
import BrandStory from '../components/BrandStory';

// Product Data
const products = [
  {
    id: 1,
    title: "Classic Cheese Balls",
    flavor: "Ultimate Cheddar Overload",
    accentBg: "bg-miltz-orange",
    accentBorder: "group-hover:border-miltz-orange",
    accentText: "text-miltz-orange",
    image: "/images/pop-corn-2.jpeg",
  },
  {
    id: 2,
    title: "Popcorn Seasoning",
    flavor: "Movie Theatre Cheese",
    accentBg: "bg-miltz-yellow",
    accentBorder: "group-hover:border-miltz-yellow",
    accentText: "text-miltz-yellow",
    image: "/images/pop-corn-3.jpeg",
  },
  {
    id: 3,
    title: "Popcorn Seasoning",
    flavor: "Tangy Tomato Blast",
    accentBg: "bg-miltz-tomato",
    accentBorder: "group-hover:border-miltz-tomato",
    accentText: "text-miltz-tomato",
    image: "/images/pop-corn-4.jpeg",
  },
  {
    id: 4,
    title: "Popcorn Seasoning",
    flavor: "Zesty Garlic Butter",
    accentBg: "bg-miltz-green",
    accentBorder: "group-hover:border-miltz-green",
    accentText: "text-miltz-green",
    image: "/images/pop-corn-5.jpeg",
  },
  {
    id: 5,
    title: "Spicy Cheese Balls",
    flavor: "Peri Peri Punch",
    accentBg: "bg-miltz-red",
    accentBorder: "group-hover:border-miltz-red",
    accentText: "text-miltz-red",
    image: "/images/flavour-mix.jpeg",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        
        {/* Products Section */}
        <section id="flavours" className="py-24 px-6 md:px-12 bg-miltz-cream relative z-10">
          <div className="container mx-auto">
            <div className="text-center mb-16">
                <h2 className="font-heading font-black text-4xl md:text-5xl text-miltz-dark uppercase mb-4">
                    Our Star <span className="text-miltz-red">Cast</span>
                </h2>
                <p className="text-lg text-miltz-dark/70 max-w-2xl mx-auto">
                    Bold flavors designed to make every movie moment unforgettable.
                </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <TheatreSection />
        <BrandStory />
      </main>
      <Footer />
    </>
  );
}
