import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import "./App.css";

const readStoredList = (storageKey) => {
  const savedValue = window.localStorage.getItem(storageKey);

  if (!savedValue) {
    return [];
  }

  try {
    return JSON.parse(savedValue);
  } catch (error) {
    return [];
  }
};

function App() {
  const [cartItems, setCartItems] = useState(() => {
    return readStoredList("northstar-cart");
  });
  const [savedItems, setSavedItems] = useState(() => {
    return readStoredList("northstar-saved-items");
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("northstar-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    window.localStorage.setItem(
      "northstar-saved-items",
      JSON.stringify(savedItems)
    );
  }, [savedItems]);

  const handleAddToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });

    setIsCartOpen(true);
  };

  const handleSaveForLater = (product) => {
    setSavedItems((currentItems) => {
      if (currentItems.some((item) => item.id === product.id)) {
        return currentItems;
      }

      return [...currentItems, product];
    });

    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== product.id)
    );
  };

  const handleMoveSavedToCart = (product) => {
    setSavedItems((currentItems) =>
      currentItems.filter((item) => item.id !== product.id)
    );
    handleAddToCart(product);
  };

  const handleRemoveSavedItem = (productId) => {
    setSavedItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  const handleIncreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar cartCount={cartCount} onCartToggle={() => setIsCartOpen(true)} />
        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={<Home cartItems={cartItems} onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/product/:id"
              element={
                <ProductDetail
                  cartItems={cartItems}
                  onAddToCart={handleAddToCart}
                  savedItems={savedItems}
                  onSaveForLater={handleSaveForLater}
                />
              }
            />
          </Routes>
        </main>
        <CartDrawer
          cartItems={cartItems}
          savedItems={savedItems}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onDecreaseQuantity={handleDecreaseQuantity}
          onIncreaseQuantity={handleIncreaseQuantity}
          onRemoveItem={handleRemoveItem}
          onMoveSavedToCart={handleMoveSavedToCart}
          onRemoveSavedItem={handleRemoveSavedItem}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
