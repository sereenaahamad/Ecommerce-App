const FilterBar = ({
  categories,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  searchTerm,
  selectedCategory,
  sortOption
}) => {
  return (
    <section className="filter-panel">
      <div className="filter-bar">
        <label className="filter-bar__search" htmlFor="product-search">
          {/* <span>Search</span> */}
          <input
            id="product-search"
            type="search"
            placeholder="Search for jackets, jewelry, bags..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <select
          className="filter-bar__select"
          value={sortOption}
          onChange={(event) => onSortChange(event.target.value)}
          aria-label="Sort products"
        >
          <option value="featured">Sort: Featured</option>
          <option value="low-high">Price: Low to high</option>
          <option value="high-low">Price: High to low</option>
          <option value="rating">Top rated</option>
        </select>

        <select
          className="filter-bar__select"
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
          aria-label="Filter products by category"
        >
          <option value="all">Category: All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-bar__group">
        <button
          className={`chip-button ${selectedCategory === "all" ? "chip-button--active" : ""}`}
          type="button"
          onClick={() => onCategoryChange("all")}
        >
          All products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`chip-button ${selectedCategory === category ? "chip-button--active" : ""}`}
            type="button"
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
};

export default FilterBar;
