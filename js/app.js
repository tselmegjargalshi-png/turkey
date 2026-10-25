/* Каталогийн үндсэн логик: хайлт, шүүлтүүр, дэлгэрэнгүй, сагс, захиалга */
(function () {
  "use strict";

  var S = window.Store;
  var I = window.ICONS;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var state = { query: "", category: "all", sort: "featured" };
  var lastFocus = null;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function norm(s) {
    return String(s || "").toLowerCase().replace(/ё/g, "е").trim();
  }

  function paintIcons(root) {
    $$("[data-icon]", root).forEach(function (el) {
      if (!el.dataset.painted) {
        el.insertAdjacentHTML("afterbegin", I.get(el.dataset.icon));
        el.dataset.painted = "1";
      }
    });
  }

  function imageHTML(p, cls) {
    var cat = p.category;
    var fallback = '<div class="ph" data-cat="' + esc(cat) + '">' + I.get(cat, 40) + "<span>" + esc(S.categoryName(cat)) + "</span></div>";
    if (!p.image) return '<div class="' + cls + '">' + fallback + "</div>";
    return '<div class="' + cls + '"><img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy" decoding="async" onerror="this.parentNode.classList.add(\'is-broken\')">' + fallback + "</div>";
  }

  /* ---------- Хайлт ба шүүлтүүр ---------- */
  function filtered() {
    var q = norm(state.query);
    var terms = q ? q.split(/\s+/) : [];
    var list = S.getProducts().filter(function (p) {
      if (state.category !== "all" && p.category !== state.category) return false;
      if (!terms.length) return true;
      var hay = norm([p.name, p.brand, p.short, p.description, S.categoryName(p.category),
        (p.details || []).map(function (d) { return d.join(" "); }).join(" ")].join(" "));
      return terms.every(function (t) { return hay.indexOf(t) !== -1; });
    });
    var sorters = {
      featured: function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); },
      "price-asc": function (a, b) { return a.price - b.price; },
      "price-desc": function (a, b) { return b.price - a.price; },
      name: function (a, b) { return a.name.localeCompare(b.name, "mn"); }
    };
    return list.slice().sort(sorters[state.sort] || sorters.featured);
  }

  function cardHTML(p) {
    return '<article class="card" data-id="' + esc(p.id) + '">' +
      '<button class="card__media" type="button" data-view="' + esc(p.id) + '" aria-label="' + esc(p.name) + ' дэлгэрэнгүй">' +
        imageHTML(p, "card__img") +
        (p.featured ? '<span class="badge">Онцлох</span>' : "") +
      "</button>" +
      '<div class="card__body">' +
        '<p class="card__cat">' + esc(S.categoryName(p.category)) + "</p>" +
        '<h3 class="card__title"><button type="button" data-view="' + esc(p.id) + '">' + esc(p.name) + "</button></h3>" +
        '<p class="card__desc">' + esc(p.short) + "</p>" +
        '<div class="card__meta">' +
          '<div><span class="price">' + S.money(p.price) + '</span><span class="unit"> / ' + esc(p.unit) + "</span></div>" +
          '<span class="moq">Доод захиалга: ' + esc(p.minOrder) + "</span>" +
        "</div>" +
        '<div class="card__actions">' +
          '<button class="btn btn--dark btn--sm" type="button" data-add="' + esc(p.id) + '">' + I.get("cart", 18) + " Сагсанд нэмэх</button>" +
          '<button class="btn btn--ghost btn--sm" type="button" data-view="' + esc(p.id) + '">Дэлгэрэнгүй</button>' +
        "</div>" +
      "</div>" +
    "</article>";
  }

  function renderCatalog() {
    var list = filtered();
    $("#productGrid").innerHTML = list.map(cardHTML).join("");
    $("#emptyState").hidden = list.length > 0;
    var catText = state.category === "all" ? "Бүх ангилал" : S.categoryName(state.category);
    var qText = state.query ? " · “" + esc(state.query) + "” хайлт" : "";
    $("#resultInfo").innerHTML = "<strong>" + list.length + "</strong> бүтээгдэхүүн · " + esc(catText) + qText;
    $$("#categoryChips .chip").forEach(function (c) {
      var on = c.dataset.cat === state.category;
      c.classList.toggle("is-active", on);
      c.setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  function renderFeatured() {
    var list = S.getProducts().filter(function (p) { return p.featured; }).slice(0, 8);
    $("#featuredGrid").innerHTML = list.map(cardHTML).join("");
  }

  function renderCategories() {
    var cats = S.getCategories();
    var products = S.getProducts();
    var count = function (id) { return products.filter(function (p) { return p.category === id; }).length; };

    $("#categoryGrid").innerHTML = cats.map(function (c) {
      var sample = products.filter(function (p) { return p.category === c.id && p.image; })[0];
      return '<button class="cat" type="button" data-cat="' + esc(c.id) + '">' +
        (sample ? '<img class="cat__bg" src="' + esc(sample.image) + '" alt="" loading="lazy" onerror="this.remove()">' : "") +
        '<span class="cat__icon">' + I.get(c.icon, 26) + "</span>" +
        '<span class="cat__name">' + esc(c.name) + "</span>" +
        '<span class="cat__count">' + count(c.id) + " бараа</span>" +
      "</button>";
    }).join("");

    $("#categoryChips").innerHTML =
      '<button class="chip" type="button" role="tab" data-cat="all">' + I.get("all", 16) + " Бүгд <em>" + products.length + "</em></button>" +
      cats.map(function (c) {
        return '<button class="chip" type="button" role="tab" data-cat="' + esc(c.id) + '">' + I.get(c.icon, 16) + " " + esc(c.name) + " <em>" + count(c.id) + "</em></button>";
      }).join("");

    $("#footerCats").innerHTML = cats.map(function (c) {
      return '<li><button class="linklike" type="button" data-cat="' + esc(c.id) + '">' + esc(c.name) + "</button></li>";
    }).join("");

    $("#heroTags").innerHTML = '<span>Түгээмэл:</span>' + ["Аяга", "Алчуур", "Саван", "Хивс", "Кофе"].map(function (t) {
      return '<button type="button" data-q="' + esc(t) + '">' + esc(t) + "</button>";
    }).join("");

    $("#statProducts").textContent = products.length;
    $("#statCategories").textContent = cats.length;
  }

  function setCategory(cat, scroll) {
    state.category = cat;
    renderCatalog();
    if (scroll) $("#catalog").scrollIntoView({ behavior: "smooth" });
  }

  function setQuery(q, scroll) {
    state.query = q;
    $("#catalogSearch").value = q;
    renderCatalog();
    if (scroll) $("#catalog").scrollIntoView({ behavior: "smooth" });
  }

  /* ---------- Модал ба шургуулга ---------- */
  function openLayer(el) {
    lastFocus = document.activeElement;
    el.hidden = false;
    document.body.classList.add("no-scroll");
    requestAnimationFrame(function () { el.classList.add("is-open"); });
    var f = el.querySelector("input, button:not([data-close]), [data-close]");
    if (f) setTimeout(function () { f.focus(); }, 50);
  }

  function closeLayer(el) {
    if (el.hidden) return;
    el.classList.remove("is-open");
    setTimeout(function () {
      el.hidden = true;
      if (!$$(".modal:not([hidden]), .drawer:not([hidden])").length) document.body.classList.remove("no-scroll");
    }, 220);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function stepperHTML(id, qty, min) {
    return '<div class="stepper" data-stepper="' + esc(id) + '">' +
      '<button type="button" data-step="-1" aria-label="Хасах">' + I.get("minus", 16) + "</button>" +
      '<input type="number" inputmode="numeric" min="' + min + '" value="' + qty + '" aria-label="Тоо ширхэг">' +
      '<button type="button" data-step="1" aria-label="Нэмэх">' + I.get("plus", 16) + "</button>" +
    "</div>";
  }

  function openProduct(id) {
    var p = S.findProduct(id);
    if (!p) return;
    var min = p.minOrder || 1;
    var rows = (p.details || []).map(function (d) {
      return "<tr><th>" + esc(d[0]) + "</th><td>" + esc(d[1]) + "</td></tr>";
    }).join("");
    $("#productModalBody").innerHTML =
      '<div class="pm__media">' + imageHTML(p, "pm__img") +
        (p.credit ? '<p class="credit">Зураг: ' + p.credit + "</p>" : "") +
      "</div>" +
      '<div class="pm__info">' +
        '<p class="card__cat">' + esc(S.categoryName(p.category)) + " · " + esc(p.brand) + "</p>" +
        '<h2 id="pmTitle">' + esc(p.name) + "</h2>" +
        '<div class="pm__price"><span class="price price--lg">' + S.money(p.price) + '</span><span class="unit"> / ' + esc(p.unit) + "</span></div>" +
        '<p class="pm__desc">' + esc(p.description) + "</p>" +
        '<table class="spec"><tbody>' + rows +
          "<tr><th>Доод захиалга</th><td>" + esc(min) + " " + esc(p.unit) + "</td></tr>" +
          "<tr><th>Агуулахын нөөц</th><td>" + (p.stock > 0 ? '<span class="ok">' + esc(p.stock) + " бэлэн</span>" : '<span class="no">Дууссан</span>') + "</td></tr>" +
        "</tbody></table>" +
        '<div class="pm__buy">' + stepperHTML("pm", min, min) +
          '<div class="pm__total">Нийт: <strong id="pmTotal">' + S.money(p.price * min) + "</strong></div>" +
        "</div>" +
        '<button class="btn btn--gold btn--block" type="button" id="pmAdd"' + (p.stock > 0 ? "" : " disabled") + ">" + I.get("cart", 18) + " Сагсанд нэмэх</button>" +
      "</div>";

    var input = $("#productModalBody .stepper input");
    var sync = function () {
      var v = Math.max(min, parseInt(input.value, 10) || min);
      input.value = v;
      $("#pmTotal").textContent = S.money(v * p.price);
      return v;
    };
    $("#productModalBody .stepper").addEventListener("click", function (e) {
      var b = e.target.closest("[data-step]");
      if (!b) return;
      input.value = (parseInt(input.value, 10) || min) + parseInt(b.dataset.step, 10);
      sync();
    });
    input.addEventListener("change", sync);
    $("#pmAdd").addEventListener("click", function () {
      S.addToCart(p.id, sync());
      closeLayer($("#productModal"));
      toast(p.name + " сагсанд нэмэгдлээ");
    });
    openLayer($("#productModal"));
  }

  /* ---------- Сагс ---------- */
  function renderCart() {
    var t = S.cartTotals();
    $("#cartCount").textContent = t.count;
    $("#cartCount").classList.toggle("is-zero", t.count === 0);

    if (!t.count) {
      $("#cartBody").innerHTML = '<div class="cart-empty">' + I.get("cart", 44) +
        "<h4>Сагс хоосон байна</h4><p>Каталогоос бараа сонгож сагсандаа нэмнэ үү.</p>" +
        '<button class="btn btn--dark" type="button" data-goto-catalog>Каталог үзэх</button></div>';
      $("#cartFoot").innerHTML = "";
      return;
    }

    $("#cartBody").innerHTML = t.lines.map(function (l) {
      var p = l.product;
      var low = l.qty < (p.minOrder || 1);
      return '<div class="line" data-line="' + esc(p.id) + '">' +
        imageHTML(p, "line__img") +
        '<div class="line__info">' +
          '<button class="line__name" type="button" data-view="' + esc(p.id) + '">' + esc(p.name) + "</button>" +
          '<span class="line__unit">' + S.money(p.price) + " / " + esc(p.unit) + "</span>" +
          (low ? '<span class="line__warn">Доод захиалга ' + esc(p.minOrder) + " " + esc(p.unit) + "</span>" : "") +
          '<div class="line__row">' + stepperHTML(p.id, l.qty, 1) +
            '<button class="icon-btn icon-btn--sm" type="button" data-remove="' + esc(p.id) + '" aria-label="Сагснаас хасах">' + I.get("trash", 18) + "</button>" +
          "</div>" +
        "</div>" +
        '<strong class="line__total">' + S.money(l.total) + "</strong>" +
      "</div>";
    }).join("");

    $("#cartFoot").innerHTML =
      '<div class="sum"><span>Барааны төрөл</span><span>' + t.count + "</span></div>" +
      '<div class="sum"><span>Нийт тоо ширхэг</span><span>' + t.units + "</span></div>" +
      '<div class="sum sum--total"><span>Нийт дүн</span><span>' + S.money(t.subtotal) + "</span></div>" +
      '<p class="fine">НӨАТ орсон үнэ. Хүргэлтийн төлбөрийг менежер баталгаажуулна.</p>' +
      '<button class="btn btn--gold btn--block" type="button" id="toCheckout">Захиалга өгөх</button>' +
      '<button class="btn btn--ghost btn--block" type="button" id="clearCart">Сагс хоослох</button>';
  }

  /* ---------- Захиалга ба төлбөр ---------- */
  function checkoutSummary(t) {
    return '<div class="co__summary"><h4>Захиалгын дүн</h4>' +
      t.lines.map(function (l) {
        return '<div class="co__item"><span>' + esc(l.product.name) + " <em>× " + l.qty + "</em></span><span>" + S.money(l.total) + "</span></div>";
      }).join("") +
      '<div class="sum sum--total"><span>Нийт</span><span>' + S.money(t.subtotal) + "</span></div></div>";
  }

  function openCheckout() {
    var t = S.cartTotals();
    if (!t.count) return;
    closeLayer($("#cartDrawer"));
    $("#checkoutBody").innerHTML =
      '<div class="co">' +
        '<form class="co__form" id="orderForm" novalidate>' +
          '<p class="eyebrow">Захиалга</p><h2 id="coTitle">Захиалгын мэдээлэл</h2>' +
          '<div class="field"><label for="fName">Нэр <b>*</b></label><input id="fName" name="name" autocomplete="name" placeholder="Таны нэр эсвэл байгууллагын нэр" required><small class="err"></small></div>' +
          '<div class="field"><label for="fPhone">Утасны дугаар <b>*</b></label><input id="fPhone" name="phone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="8 оронтой дугаар" required><small class="err"></small></div>' +
          '<div class="field"><label for="fAddress">Хүргэлтийн хаяг</label><input id="fAddress" name="address" autocomplete="street-address" placeholder="Дүүрэг, хороо, байр"></div>' +
          '<div class="field"><label for="fNote">Нэмэлт тайлбар</label><textarea id="fNote" name="note" rows="3" placeholder="Хүргэлтийн цаг, нэхэмжлэлийн мэдээлэл гэх мэт"></textarea></div>' +
          '<fieldset class="pay"><legend>Төлбөрийн хэлбэр</legend>' +
            payOption("bank", "Банкны шилжүүлэг", "Нэхэмжлэлийн дагуу шилжүүлнэ", true) +
            payOption("qpay", "QPay", "QR кодоор төлнө") +
            payOption("cash", "Хүлээн авахдаа", "Бэлнээр эсвэл картаар") +
          "</fieldset>" +
          '<button class="btn btn--gold btn--block" type="submit">Захиалга илгээх</button>' +
          '<p class="fine">Захиалга илгээснээр манай менежер тантай холбогдож баталгаажуулна.</p>' +
        "</form>" +
        checkoutSummary(t) +
      "</div>";

    $("#orderForm").addEventListener("submit", submitOrder);
    openLayer($("#checkoutModal"));
  }

  function payOption(val, title, sub, checked) {
    var icon = { bank: "bank", qpay: "qr", cash: "cash" }[val];
    return '<label class="pay__opt"><input type="radio" name="pay" value="' + val + '"' + (checked ? " checked" : "") + ">" +
      '<span class="pay__box">' + I.get(icon, 22) + "<span><strong>" + title + "</strong><small>" + sub + "</small></span></span></label>";
  }

  function submitOrder(e) {
    e.preventDefault();
    var f = e.target;
    var name = f.name.value.trim();
    var phone = f.phone.value.replace(/\s+/g, "");
    var ok = true;

    var setErr = function (input, msg) {
      input.closest(".field").classList.toggle("has-err", !!msg);
      input.closest(".field").querySelector(".err").textContent = msg || "";
      if (msg) ok = false;
    };
    setErr(f.name, name.length < 2 ? "Нэрээ оруулна уу" : "");
    setErr(f.phone, /^[0-9]{8}$/.test(phone) ? "" : "8 оронтой утасны дугаар оруулна уу");
    if (!ok) { f.querySelector(".has-err input").focus(); return; }

    var t = S.cartTotals();
    var order = S.saveOrder({
      id: S.newOrderId(),
      createdAt: new Date().toISOString(),
      customer: { name: name, phone: phone, address: f.address.value.trim(), note: f.note.value.trim() },
      payment: f.pay.value,
      status: "new",
      paid: false,
      items: t.lines.map(function (l) {
        return { id: l.product.id, name: l.product.name, price: l.product.price, unit: l.product.unit, qty: l.qty, total: l.total };
      }),
      total: t.subtotal
    });
    S.clearCart();
    showPayment(order);
  }

  function showPayment(order) {
    var methodName = { bank: "Банкны шилжүүлэг", qpay: "QPay", cash: "Хүлээн авахдаа төлөх" }[order.payment];
    var payBlock;
    if (order.payment === "bank") {
      payBlock = '<div class="paybox">' +
        '<div class="sum"><span>Банк</span><span>Хаан банк</span></div>' +
        '<div class="sum"><span>Дансны дугаар</span><span>5000 1234 56</span></div>' +
        '<div class="sum"><span>Хүлээн авагч</span><span>Турк Бөөний Барааны Агуулах ХХК</span></div>' +
        '<div class="sum"><span>Гүйлгээний утга</span><span>' + esc(order.id) + "</span></div></div>";
    } else if (order.payment === "qpay") {
      payBlock = '<div class="paybox paybox--qr">' + fakeQR(order.id) + "<p>Банкны аппликейшнээр QR кодыг уншуулна уу</p></div>";
    } else {
      payBlock = '<div class="paybox"><p>Бараагаа хүлээн авахдаа бэлнээр эсвэл картаар төлнө. Жолооч POS төхөөрөмжтэй очно.</p></div>';
    }

    $("#checkoutBody").innerHTML =
      '<div class="done">' +
        '<span class="done__icon">' + I.get("check", 34) + "</span>" +
        '<p class="eyebrow">Захиалга амжилттай илгээгдлээ</p>' +
        '<h2 id="coTitle">Захиалгын дугаар: ' + esc(order.id) + "</h2>" +
        "<p>Баярлалаа, " + esc(order.customer.name) + ". Манай менежер " + esc(order.customer.phone) + " дугаараар 30 минутын дотор холбогдоно.</p>" +
        '<div class="done__grid">' +
          '<div class="done__card"><h4>Төлбөр хийх</h4>' +
            '<div class="sum sum--total"><span>Төлөх дүн</span><span>' + S.money(order.total) + "</span></div>" +
            '<div class="sum"><span>Төлбөрийн хэлбэр</span><span>' + methodName + "</span></div>" +
            payBlock +
            '<button class="btn btn--gold btn--block" type="button" id="payNow">' + I.get("lock", 18) + " Төлбөр төлөх</button>" +
            '<p class="fine demo-note">Энэ хэсэг нь демо. Бодит төлбөрийн систем удахгүй холбогдоно.</p>' +
          "</div>" +
          '<div class="done__card"><h4>Захиалсан бараа</h4>' +
            order.items.map(function (i) {
              return '<div class="co__item"><span>' + esc(i.name) + " <em>× " + i.qty + "</em></span><span>" + S.money(i.total) + "</span></div>";
            }).join("") +
          "</div>" +
        "</div>" +
        '<button class="btn btn--ghost" type="button" data-close>Каталог руу буцах</button>' +
      "</div>";

    $("#payNow").addEventListener("click", function () {
      var btn = this;
      btn.disabled = true;
      btn.innerHTML = '<span class="spin"></span> Төлбөр шалгаж байна';
      setTimeout(function () {
        S.updateOrder(order.id, { paid: true, status: "paid" });
        btn.classList.add("is-done");
        btn.innerHTML = I.get("check", 18) + " Төлбөр бүртгэгдлээ (демо)";
        toast("Демо төлбөр амжилттай бүртгэгдлээ");
      }, 1200);
    });
  }

  /* Демо QR: захиалгын дугаараас тогтмол хээ үүсгэнэ, бодит төлбөрийн код биш */
  function fakeQR(seed) {
    var n = 25, cells = "", h = 0;
    for (var i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    var rnd = function () { h ^= h << 13; h >>>= 0; h ^= h >> 17; h ^= h << 5; h >>>= 0; return h / 4294967296; };
    var finder = function (x, y) {
      return [[0, 0], [n - 7, 0], [0, n - 7]].some(function (o) { return x >= o[0] && x < o[0] + 7 && y >= o[1] && y < o[1] + 7; });
    };
    for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) {
      if (!finder(x, y) && rnd() > 0.52) cells += '<rect x="' + x + '" y="' + y + '" width="1" height="1"/>';
    }
    var fp = [[0, 0], [n - 7, 0], [0, n - 7]].map(function (o) {
      return '<rect x="' + (o[0] + .5) + '" y="' + (o[1] + .5) + '" width="6" height="6" fill="none" stroke="#111" stroke-width="1"/><rect x="' + (o[0] + 2) + '" y="' + (o[1] + 2) + '" width="3" height="3"/>';
    }).join("");
    return '<svg class="qr" viewBox="-1 -1 ' + (n + 2) + " " + (n + 2) + '" role="img" aria-label="Демо QR код"><rect x="-1" y="-1" width="' + (n + 2) + '" height="' + (n + 2) + '" fill="#fff"/><g fill="#111">' + cells + fp + "</g></svg>";
  }

  /* ---------- Мэдэгдэл ---------- */
  var toastTimer;
  function toast(msg) {
    var el = $("#toast");
    el.innerHTML = I.get("check", 18) + "<span>" + esc(msg) + "</span>";
    el.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("is-on"); }, 2600);
  }

  /* ---------- Үйл явдал ---------- */
  function bind() {
    document.addEventListener("click", function (e) {
      var t = e.target;
      var view = t.closest("[data-view]");
      if (view) { e.preventDefault(); closeLayer($("#cartDrawer")); openProduct(view.dataset.view); return; }

      var add = t.closest("[data-add]");
      if (add) {
        var p = S.findProduct(add.dataset.add);
        S.addToCart(p.id, p.minOrder || 1);
        toast(p.name + " сагсанд нэмэгдлээ");
        return;
      }

      var cat = t.closest("[data-cat]");
      if (cat) { setCategory(cat.dataset.cat, !cat.closest("#categoryChips")); return; }

      var q = t.closest("[data-q]");
      if (q) { $("#heroSearchInput").value = q.dataset.q; setQuery(q.dataset.q, true); return; }

      if (t.closest("[data-close]")) { closeLayer(t.closest(".modal, .drawer")); return; }
      if (t.closest("#cartOpen, [data-open-cart]")) { openLayer($("#cartDrawer")); return; }
      if (t.closest("[data-goto-catalog]")) { closeLayer($("#cartDrawer")); $("#catalog").scrollIntoView({ behavior: "smooth" }); return; }
      if (t.closest("#toCheckout")) { openCheckout(); return; }
      if (t.closest("#clearCart")) { S.clearCart(); return; }
      if (t.closest("#clearFilters")) { state.category = "all"; $("#heroSearchInput").value = ""; setQuery("", false); return; }
      if (t.closest("#headerSearchBtn")) { $("#catalogSearch").focus(); $("#catalog").scrollIntoView({ behavior: "smooth" }); return; }

      var rm = t.closest("[data-remove]");
      if (rm) { S.removeFromCart(rm.dataset.remove); return; }

      var step = t.closest("#cartBody [data-step]");
      if (step) {
        var box = step.closest("[data-stepper]");
        var input = box.querySelector("input");
        var v = (parseInt(input.value, 10) || 0) + parseInt(step.dataset.step, 10);
        if (v <= 0) S.removeFromCart(box.dataset.stepper);
        else S.updateQty(box.dataset.stepper, v);
      }
    });

    document.addEventListener("change", function (e) {
      var input = e.target.closest("#cartBody [data-stepper] input");
      if (input) {
        var v = parseInt(input.value, 10) || 0;
        var id = input.closest("[data-stepper]").dataset.stepper;
        if (v <= 0) S.removeFromCart(id); else S.updateQty(id, v);
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        var open = $$(".modal:not([hidden]), .drawer:not([hidden])").pop();
        if (open) closeLayer(open);
      }
    });

    $("#heroSearch").addEventListener("submit", function (e) {
      e.preventDefault();
      state.category = "all";
      setQuery($("#heroSearchInput").value.trim(), true);
    });

    var debounce;
    $("#catalogSearch").addEventListener("input", function (e) {
      clearTimeout(debounce);
      debounce = setTimeout(function () { state.query = e.target.value.trim(); renderCatalog(); }, 120);
    });

    $("#sortSelect").addEventListener("change", function (e) { state.sort = e.target.value; renderCatalog(); });

    var header = $(".header");
    window.addEventListener("scroll", function () {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }, { passive: true });
  }

  function fillStoreInfo() {
    $$("[data-store]").forEach(function (el) { el.textContent = S.store[el.dataset.store] || ""; });
    $("#year").textContent = new Date().getFullYear();
  }

  function renderAll() {
    renderCategories();
    renderFeatured();
    renderCatalog();
    renderCart();
  }

  document.addEventListener("DOMContentLoaded", function () {
    paintIcons(document);
    fillStoreInfo();
    renderAll();
    bind();
    S.on(renderAll);
  });
})();
