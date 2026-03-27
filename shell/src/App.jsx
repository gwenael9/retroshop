import React, { useState, useEffect, Suspense, lazy } from 'react';
import eventBus from 'shared/eventBus';
import './App.css';

const ProductApp = lazy(() => import('mfe-product/App'));
const CartApp = lazy(() => import('mfe-cart/App'));
const RecoApp = lazy(() => import('mfe-reco/App'));

function LoadingFallback({ name }) {
  return <div className="loading-fallback">Chargement {name}...</div>;
}

function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const unsubscribe = eventBus.on('CART_UPDATED', (payload) => {
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
          <Suspense fallback={<LoadingFallback name="Products" />}>
            <ProductApp />
          </Suspense>
        </section>
        <aside className="cart-area">
          <Suspense fallback={<LoadingFallback name="Cart" />}>
            <CartApp />
          </Suspense>
        </aside>
      </main>
      <section className="reco-area">
        <Suspense fallback={<LoadingFallback name="Recommendations" />}>
          <RecoApp />
        </Suspense>
      </section>
    </div>
  );
}

export default App;
