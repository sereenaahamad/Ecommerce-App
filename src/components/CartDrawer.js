const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const CartDrawer = ({
  cartItems,
  isOpen,
  onClose,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onRemoveItem
}) => {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price * 88,
    0
  );

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? "cart-overlay--visible" : ""}`}
        onClick={onClose}
      />
      <aside className={`cart-drawer ${isOpen ? "cart-drawer--open" : ""}`}>
        <div className="cart-drawer__header">
          <div>
            <p className="navbar__eyebrow">Your bag</p>
            <h2 className="cart-drawer__title">Cart summary</h2>
          </div>
          <button className="cart-close" type="button" onClick={onClose}>
            Close
          </button>
        </div>

        {cartItems.length > 0 ? (
          <>
            <div className="cart-list">
              {cartItems.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div className="cart-item__media">
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div className="cart-item__content">
                    <div>
                      <p className="cart-item__category">{item.category}</p>
                      <h3 className="cart-item__title">{item.title}</h3>
                    </div>

                    <div className="cart-item__meta">
                      <strong>{currencyFormatter.format(item.price * 88)}</strong>
                      <div className="cart-item__actions">
                        <button
                          className="quantity-button"
                          type="button"
                          onClick={() => onDecreaseQuantity(item.id)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="quantity-button"
                          type="button"
                          onClick={() => onIncreaseQuantity(item.id)}
                        >
                          +
                        </button>
                        <button
                          className="cart-item__remove"
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-summary__row">
                <span>Subtotal</span>
                <strong>{currencyFormatter.format(subtotal)}</strong>
              </div>
              <div className="cart-summary__row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <button className="button-primary cart-summary__button" type="button">
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="cart-empty">
            <h3>Your cart is empty</h3>
            <p>Add a few products to see them here and start building your order.</p>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
