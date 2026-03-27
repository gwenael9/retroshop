import React from 'react';
import eventBus from 'shared/eventBus';
import PRODUCTS from 'shared/products';
import './ProductGrid.css';

function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card">
      <div className="product-image" data-category={product.category}>
        {product.category}
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">{product.price} EUR</p>
      <button className="add-button" onClick={() => onAdd(product)}>
        Ajouter au panier
      </button>
    </div>
  );
}

function ProductGrid() {
  const handleAdd = (product) => {
  eventBus.emit('PRODUCT_ADDED_TO_CART', {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1
  });
};

  return (
    <div className="product-grid">
      <h2>Catalogue</h2>
      <div className="grid">
        {PRODUCTS.map(p => (
          <ProductCard key={p.id} product={p} onAdd={handleAdd} />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
