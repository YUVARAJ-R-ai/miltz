import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import ProductCarousel from '../components/ProductCarousel';
import TheatreSection from '../components/TheatreSection';
import BrandStory from '../components/BrandStory';

// Product Data
const products = [
  {
    id: 1,
    title: "Classic Cheese Balls",
    shortTitle: "Cheese Balls",
    category: "Signature Snack",
    flavor: "Ultimate Cheddar Overload",
    accentText: "text-miltz-orange",
    bgColor: "bg-orange-50/50",
    iconBg: "bg-orange-100",
    image: "/images/pop-corn-2.jpeg",
    idealFor: [
      "Movie marathons with friends",
      "Late night cravings",
      "Party snack bowls",
      "Cheesy comfort food lovers"
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
    title: "Movie Theatre Cheese Seasoning",
    shortTitle: "Cheese Seasoning",
    category: "Popcorn Seasoning",
    flavor: "Classic Cinema Cheese",
    accentText: "text-miltz-yellow",
    bgColor: "bg-yellow-50/50",
    iconBg: "bg-yellow-100",
    image: "/images/cheese-flav.jpg",
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
  {
    id: 3,
    title: "Tangy Tomato Blast Seasoning",
    shortTitle: "Tomato Seasoning",
    category: "Popcorn Seasoning",
    flavor: "Zesty Tomato Punch",
    accentText: "text-miltz-tomato",
    bgColor: "bg-red-50/50",
    iconBg: "bg-red-100",
    image: "/images/tangytomato-flav.jpg",
    idealFor: [
      "Adding a zesty kick to snacks",
      "Lovers of tangy flavors",
      "Spicing up roasted nuts",
      "After-school snacking"
    ],
    freeFrom: [
      "Artificial Flavors",
      "High Fructose Corn Syrup",
      "Palm Oil",
      "Dairy"
    ]
  },
  {
    id: 4,
    title: "Cheese & Onion Seasoning",
    shortTitle: "Cheese & Onion",
    category: "Popcorn Seasoning",
    flavor: "Savory Cheese & Onion",
    accentText: "text-miltz-green",
    bgColor: "bg-green-50/50",
    iconBg: "bg-green-100",
    image: "/images/cheeseonion-flav.jpg",
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
    id: 5,
    title: "Spicy Peri Peri Cheese Balls",
    shortTitle: "Spicy Balls",
    category: "Signature Snack",
    flavor: "Peri Peri Punch",
    accentText: "text-miltz-red",
    bgColor: "bg-red-50/30",
    iconBg: "bg-red-100",
    image: "/images/flavour-mix.jpeg",
    idealFor: [
      "Spice lovers",
      "Adding heat to your movie night",
      "Sharing with brave friends",
      "Pairing with refreshing drinks"
    ],
    freeFrom: [
      "Artificial Heat Extracts",
      "Preservatives",
      "MSG",
      "Artificial Colors"
    ]
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        
        {/* Editorial Product Spotlight Section */}
        <div id="flavours" className="bg-white">
          <div className="py-24 px-6 md:px-12 text-center bg-miltz-cream">
             <h2 className="font-heading font-black text-4xl md:text-5xl text-miltz-dark uppercase mb-4">
                  Our Star <span className="text-miltz-red">Cast</span>
              </h2>
              <p className="text-lg text-miltz-dark/70 max-w-2xl mx-auto">
                  Bold flavors designed to make every movie moment unforgettable.
              </p>
          </div>
          
          {/* Product Carousel */}
          <ProductCarousel products={products} />
        </div>

        <TheatreSection />
        <BrandStory />
      </main>
      <Footer />
    </>
  );
}
