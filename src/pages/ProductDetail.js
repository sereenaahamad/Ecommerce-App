import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fallbackProducts } from "../data/fallbackProducts";
import { currencyFormatter } from "../utils/currencyFormatter";

const ProductDetail = ({ cartItems, onAddToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setStatus("loading");
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (!response.ok) {
          throw new Error("Product request failed");
        }

        const data = await response.json();
        setProduct(data);
        setStatus("ready");
      } catch (error) {
        const localProduct = fallbackProducts.find(
          (fallbackProduct) => String(fallbackProduct.id) === String(id)
        );

        setProduct(localProduct ?? null);
        setStatus(localProduct ? "ready" : "error");
      }
    };

    loadProduct();
  }, [id]);

  if (status === "loading") {
    return (
      <section className="status-card section">
        <h2>Loading product details</h2>
        <p>Preparing a closer look at this item.</p>
      </section>
    );
  }

  if (status === "error" || !product) {
    return (
      <section className="status-card section">
        <h2>Product unavailable</h2>
        <p>We could not load this product right now. Please head back and try again.</p>
      </section>
    );
  }

  const cartItem = cartItems.find((item) => item.id === product.id);

  return (
    <section className="section">
      <Link className="back-link" to="/">
        {"<-"} Back to collection
      </Link>

      <div className="detail">
        <div className="detail-panel">
          <div className="detail-media">
            <img src={product.image} alt={product.title} />
          </div>
        </div>

        <div className="detail-panel">
          <div className="detail-copy">
            <div className="detail-badge text-rise text-rise--1">{product.category}</div>
            <h1 className="text-reveal text-reveal--1">{product.title}</h1>

            <div className="detail-meta text-rise text-rise--2">
              <span className="stat-chip text-glow-hover">
                <span aria-hidden="true">*</span>
                {(product.rating?.rate ?? 4).toFixed(1)} rating
              </span>
              <span className="stat-chip text-glow-hover">{product.rating?.count ?? 0} reviews</span>
              <span className="stat-chip text-glow-hover">Ready to ship</span>
            </div>

            <strong className="price text-rise text-rise--3">
              {currencyFormatter.format(product.price * 88)}
            </strong>
            <p className="text-rise text-rise--4">{product.description}</p>

            <div className="detail-actions">
              <button
                className="button-primary"
                type="button"
                onClick={() => onAddToCart(product)}
              >
                {cartItem ? `Add another (${cartItem.quantity} in cart)` : "Add to cart"}
              </button>
              <button className="button-secondary" type="button">
                Save for later
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
