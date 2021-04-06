import React, { useState, useEffect } from 'react';
// import Products from './componets/Products/Products'
import { commerce } from './lib/commerce'
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import Checkout from './components/CheckoutForm/Checkout/Checkout'
const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setorder] = useState({});
  const [errorMessage, seterrorMessage] = useState('')


  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);

  }
  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart)
  }
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  }
  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);

  }
  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  }
  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  }
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setorder(incomingOrder);
      refreshCart();

    } catch (error) {
      seterrorMessage(error.data.error.message);


    }
  }
  useEffect(() => {
    fetchProducts();
    fetchCart();

  }, []);
  //console.log(cart);
  var p = cart.line_items;
  // const k = p.length;
  // console.log(k)

  return (
    <Router>
      <div>
        <Navbar totalitems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            {<Products products={products} onAddToCart={handleAddToCart} />}
          </Route>
          <Route exact path="/cart">
            {< Cart cart={cart}

              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />}
          </Route>
          <Route exact path="/checkout">
            {
              <Checkout cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            }
          </Route>
        </Switch>

      </div>


    </Router>
  )
}

export default App
