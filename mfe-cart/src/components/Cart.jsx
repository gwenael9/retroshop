import React, { useState, useEffect } from 'react';
import eventBus from 'shared/eventBus';
import './Cart.css';

function Cart() {
  const [items, setItems] = useState([]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const unsubscribe = eventBus.on("PRODUCT_ADDED_TO_CART", (product) => {
      setItems(prev => {
        const existing = prev.find(item => item.id === product.id);
        
        let newCart;
        if (existing) {
          newCart = prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          newCart = [...prev, { ...product, cartId: Date.now() }];
        }

        eventBus.emit('CART_UPDATED', {
          totalItems: newCart.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: newCart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          items: newCart
        });

        return newCart;
      });
    });

    return () => unsubscribe();
  }, []);

  const handleRemove = (cartId) => {
    setItems(prev => {
      const newCart = prev.filter(item => item.cartId !== cartId);
      
      eventBus.emit('CART_UPDATED', {
        totalItems: newCart.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: newCart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        items: newCart
      });

      return newCart;
    });
  };

  const handleClear = () => {
    setItems([]);
    eventBus.emit("CART_CLEARED", null);
    eventBus.emit('CART_UPDATED', {
      totalItems: 0,
      totalPrice: 0,
      items: []
    });
  };

  return (
    <div className="cart">
      <h2>Panier ({items.reduce((sum, item) => sum + item.quantity, 0)})</h2>

      {items.length === 0 ? (
        <p className="empty">Panier vide</p>
      ) : (
        <>
          <ul className="cart-items">
            {items.map(item => (
              <li key={item.cartId} className="cart-item">
                <span className="item-name">
                  {item.name} {item.quantity > 1 && `(x${item.quantity})`}
                </span>
                <span className="item-price">{item.price * item.quantity} EUR</span>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.cartId)}
                >
                  x
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-footer">
            <div className="cart-total">Total : {total.toFixed(2)} EUR</div>
            <button className="clear-btn" onClick={handleClear}>
              Vider le panier
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;