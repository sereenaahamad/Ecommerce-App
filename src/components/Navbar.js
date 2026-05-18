const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__brand">
          <p className="navbar__eyebrow">Curated everyday essentials</p>
          <h1 className="navbar__title">Northstar Goods</h1>
        </div>

        <div className="navbar__meta">
          <div className="navbar__pill">Free shipping over Rs. 999</div>
          <div className="navbar__pill">Fresh arrivals weekly</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
