const Navbar = ({ cartCount, onCartToggle }) => {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__brand">
          <p className="navbar__eyebrow text-rise text-rise--1">Curated everyday essentials</p>
          <h1 className="navbar__title text-reveal ">Northstar Goods</h1>
        </div>

        <div className="navbar__meta">
          <div className="navbar__pill text-rise text-rise--2">Free shipping over Rs. 999</div>
          <div className="navbar__pill text-rise text-rise--3">Fresh arrivals weekly</div>
          <button className="navbar__cart" type="button" onClick={onCartToggle}>
            Cart
            <span className="navbar__cart-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
