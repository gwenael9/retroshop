import React, { useState, useEffect, Suspense, lazy } from "react";
import eventBus from "shared/eventBus";
import "./App.css";
import RemoteMFE from "./components/RemoteMFE";

function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const unsubscribe = eventBus.on("CART_UPDATED", (payload) => {
      setCartCount(payload?.totalItems ?? 0);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="shell">
      <header className="shell-header">
        <h1 className="logo">RetroShop</h1>
        <div className="cart-badge">Panier ({cartCount})</div>
      </header>
      <main className="shell-main">
        <section className="product-area">
          <RemoteMFE
            name="Products"
            importFn={() => import("mfeProduct/Product")}
          />
        </section>
        <aside className="cart-area">
          <RemoteMFE name="Cart" importFn={() => import("mfeCart/Cart")} />
        </aside>
      </main>
      <section className="reco-area">
        <RemoteMFE name="Reco" importFn={() => import("mfeReco/Reco")} />
      </section>
    </div>
  );
}

export default App;
