/* Өгөгдлийн давхарга: каталог, сагс, захиалгыг хөтөчийн санах ойд хадгална */
(function () {
  "use strict";

  var KEYS = {
    products: "tba_products_v1",
    categories: "tba_categories_v1",
    cart: "tba_cart_v1",
    orders: "tba_orders_v1"
  };

  function read(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function clone(v) {
    return JSON.parse(JSON.stringify(v));
  }

  var listeners = [];

  var Store = {
    store: window.CATALOG.store,

    getCategories: function () {
      return read(KEYS.categories, null) || clone(window.CATALOG.categories);
    },

    getProducts: function () {
      return read(KEYS.products, null) || clone(window.CATALOG.products);
    },

    saveProducts: function (list) {
      var ok = write(KEYS.products, list);
      Store.emit();
      return ok;
    },

    hasLocalEdits: function () {
      return read(KEYS.products, null) !== null;
    },

    resetProducts: function () {
      try { window.localStorage.removeItem(KEYS.products); } catch (e) {}
      Store.emit();
    },

    findProduct: function (id) {
      var list = Store.getProducts();
      for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
      return null;
    },

    categoryName: function (id) {
      var cats = Store.getCategories();
      for (var i = 0; i < cats.length; i++) if (cats[i].id === id) return cats[i].name;
      return "Бусад";
    },

    /* Сагс: [{ id, qty }] */
    getCart: function () {
      var cart = read(KEYS.cart, []);
      return cart.filter(function (line) { return Store.findProduct(line.id); });
    },

    setCart: function (cart) {
      write(KEYS.cart, cart);
      Store.emit();
    },

    addToCart: function (id, qty) {
      var cart = Store.getCart();
      var p = Store.findProduct(id);
      if (!p) return;
      var line = cart.find(function (l) { return l.id === id; });
      if (line) line.qty += qty;
      else cart.push({ id: id, qty: Math.max(qty, p.minOrder || 1) });
      Store.setCart(cart);
    },

    updateQty: function (id, qty) {
      var cart = Store.getCart();
      cart.forEach(function (l) { if (l.id === id) l.qty = qty; });
      Store.setCart(cart.filter(function (l) { return l.qty > 0; }));
    },

    removeFromCart: function (id) {
      Store.setCart(Store.getCart().filter(function (l) { return l.id !== id; }));
    },

    clearCart: function () {
      Store.setCart([]);
    },

    cartDetailed: function () {
      return Store.getCart().map(function (l) {
        var p = Store.findProduct(l.id);
        return { product: p, qty: l.qty, total: p.price * l.qty };
      });
    },

    cartTotals: function () {
      var lines = Store.cartDetailed();
      var subtotal = lines.reduce(function (s, l) { return s + l.total; }, 0);
      var units = lines.reduce(function (s, l) { return s + l.qty; }, 0);
      return { lines: lines, subtotal: subtotal, units: units, count: lines.length };
    },

    /* Захиалга */
    getOrders: function () {
      return read(KEYS.orders, []);
    },

    saveOrder: function (order) {
      var orders = Store.getOrders();
      orders.unshift(order);
      write(KEYS.orders, orders);
      Store.emit();
      return order;
    },

    updateOrder: function (id, patch) {
      var orders = Store.getOrders().map(function (o) {
        return o.id === id ? Object.assign({}, o, patch) : o;
      });
      write(KEYS.orders, orders);
      Store.emit();
    },

    clearOrders: function () {
      write(KEYS.orders, []);
      Store.emit();
    },

    on: function (fn) { listeners.push(fn); },
    emit: function () { listeners.forEach(function (fn) { fn(); }); },

    money: function (n) {
      return Math.round(n).toLocaleString("en-US") + "₮";
    },

    newOrderId: function () {
      var d = new Date();
      var pad = function (x) { return (x < 10 ? "0" : "") + x; };
      return "TB" + String(d.getFullYear()).slice(2) + pad(d.getMonth() + 1) + pad(d.getDate()) +
        String(Math.floor(1000 + Math.random() * 9000));
    }
  };

  /* Өөр цонхонд админ засвар хийвэл шинэчлэгдэнэ */
  window.addEventListener("storage", function () { Store.emit(); });

  window.Store = Store;
})();
