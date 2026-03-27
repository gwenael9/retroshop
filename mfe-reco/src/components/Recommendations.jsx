import React, { useState, useEffect } from "react";
import eventBus from "shared/eventBus";
import PRODUCTS from "shared/products";
import "./Recommendations.css";

function Recommendations() {
  const [recos, setRecos] = useState(PRODUCTS.slice(0, 3));

  useEffect(() => {
    // TODO: adapter les recommandations en fonction du contenu du panier
    const unsubscribe = eventBus.on("CART_UPDATED", (payload) => {
      const cartProductIds = payload.items.map((item) => item.id);

      setRecos(recos.filter((p) => !cartProductIds.includes(p.id)));
    });

    return unsubscribe;
  }, []);

  const handleAddReco = (product) => {
    // TODO: ajouter ce produit au panier (meme evenement que ProductGrid)
    eventBus.emit("PRODUCT_ADDED_TO_CART", {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <div className="recommendations">
      <h2>Les joueurs achetent aussi</h2>
      <div className="reco-list">
        {recos.map((p) => (
          <div
            key={p.id}
            className="reco-card"
            onClick={() => handleAddReco(p)}
          >
            <div className="reco-image" data-category={p.category}>
              {p.category}
            </div>
            <span className="reco-name">{p.name}</span>
            <span className="reco-price">{p.price} EUR</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
