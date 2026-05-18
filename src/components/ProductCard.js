import { useNavigate } from "react-router-dom";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <article
      className="card stagger-in"
      onClick={() => navigate(`/product/${product.id}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          navigate(`/product/${product.id}`);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="card__media">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="card__copy">
        <div className="card__badge">{product.category}</div>
        <h3 className="card__title">{product.title}</h3>
        <p className="card__description">{product.description}</p>
      </div>

      <div className="card__footer">
        <strong className="price">{currencyFormatter.format(product.price * 88)}</strong>
        <span className="rating">
          <span aria-hidden="true">*</span>
          {(product.rating?.rate ?? 4).toFixed(1)}
        </span>
      </div>
    </article>
  );
};

export default ProductCard;
