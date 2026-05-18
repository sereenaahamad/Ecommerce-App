import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import { fallbackProducts } from "../data/fallbackProducts";

const Home = ({ cartItems, onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("featured");
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setStatus("loading");
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("Product request failed");
        }

        const data = await response.json();
        setProducts(data);
        setIsUsingFallback(false);
        setStatus("ready");
      } catch (error) {
        setProducts(fallbackProducts);
        setIsUsingFallback(true);
        setStatus("ready");
      }
    };

    loadProducts();
  }, []);

  const categories = [...new Set(products.map((product) => product.category))];

  const visibleProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch =
        product.title.toLowerCase().includes(normalizedSearchTerm) ||
        product.description.toLowerCase().includes(normalizedSearchTerm);

      return matchesCategory && matchesSearch;
    })
    .sort((firstProduct, secondProduct) => {
      if (sortOption === "low-high") {
        return firstProduct.price - secondProduct.price;
      }

      if (sortOption === "high-low") {
        return secondProduct.price - firstProduct.price;
      }

      if (sortOption === "rating") {
        return (secondProduct.rating?.rate ?? 0) - (firstProduct.rating?.rate ?? 0);
      }

      return 0;
    });

  if (status === "loading") {
    return (
      <section className="status-card section">
        <h2>Loading the collection</h2>
        <p>Pulling in fresh products and setting up the storefront.</p>
      </section>
    );
  }

  return (
    <div className="section">
      <section className="hero">
        <div className="hero__content">
          <div className="hero__eyebrow text-rise text-rise--1">
            Minimal picks. Maximum personality.
          </div>
          <h1 className="hero__headline text-reveal text-reveal--1">
            Shop thoughtful finds that feel elevated from the first click.
          </h1>
          <p className="text-rise text-rise--2">
            Browse a cleaner catalog, discover standout essentials, and jump into
            product details with a much more polished shopping experience.
          </p>

          <div className="hero__stats text-rise text-rise--3">
            <div className="stat-chip text-glow-hover">{products.length} curated products</div>
            <div className="stat-chip text-glow-hover">{categories.length} lifestyle categories</div>
            <div className="stat-chip text-glow-hover">Fast compare and search</div>
          </div>
        </div>
      </section>

      {isUsingFallback ? (
        <section className="notice-banner" aria-live="polite">
          Live products could not be loaded, so a local fallback catalog is being shown.
        </section>
      ) : null}

      <FilterBar
        categories={categories}
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchTerm}
        onSortChange={setSortOption}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        sortOption={sortOption}
      />

      <section className="content-panel">
        <div className="section-header">
          <div>
            <h2 className="text-rise text-rise--1">Featured collection</h2>
            <p className="text-rise text-rise--2">
              {visibleProducts.length} item{visibleProducts.length === 1 ? "" : "s"}{" "}
              matching your current filters.
            </p>
          </div>
          <p className="muted text-rise text-rise--3">Tap any card to open the product page.</p>
        </div>

        {visibleProducts.length > 0 ? (
            <div className="grid">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  cartItems={cartItems}
                  onAddToCart={onAddToCart}
                  product={product}
                />
              ))}
            </div>
        ) : (
          <div className="empty-state">
            <h3>{normalizedSearchTerm ? "Product not found" : "No matches yet"}</h3>
            <p>
              {normalizedSearchTerm
                ? `We couldn't find anything for "${searchTerm.trim()}".`
                : "Try a broader search term or switch to another category."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
