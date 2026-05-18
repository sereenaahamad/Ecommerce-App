import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fallbackProducts } from "../data/fallbackProducts";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const ProductDetail = () => {
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
            <div className="detail-badge">{product.category}</div>
            <h1>{product.title}</h1>

            <div className="detail-meta">
              <span className="stat-chip">
                <span aria-hidden="true">*</span>
                {(product.rating?.rate ?? 4).toFixed(1)} rating
              </span>
              <span className="stat-chip">{product.rating?.count ?? 0} reviews</span>
              <span className="stat-chip">Ready to ship</span>
            </div>

            <strong className="price">{currencyFormatter.format(product.price * 88)}</strong>
            <p>{product.description}</p>

            <div className="detail-actions">
              <button className="button-primary" type="button">
                Add to bag
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
