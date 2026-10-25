/* Админ демо: бараа нэмэх, засах, зураг солих, үнэ өөрчлөх, захиалга харах */
(function () {
  "use strict";

  var S = window.Store;
  var I = window.ICONS;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var editingId = null;
  var filter = { q: "", cat: "all" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function paintIcons(root) {
    $$("[data-icon]", root).forEach(function (el) {
      if (!el.dataset.painted) { el.insertAdjacentHTML("afterbegin", I.get(el.dataset.icon, 18)); el.dataset.painted = "1"; }
    });
  }

  var toastTimer;
  function toast(msg) {
    var el = $("#toast");
    el.innerHTML = I.get("check", 18) + "<span>" + esc(msg) + "</span>";
    el.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("is-on"); }, 2200);
  }

  function save(list, msg) {
    if (!S.saveProducts(list)) {
      toast("Хадгалах боломжгүй. Зургийн хэмжээ хэт том байж магадгүй.");
      return false;
    }
    if (msg) toast(msg);
    return true;
  }

  function patchProduct(id, patch, msg) {
    var list = S.getProducts().map(function (p) { return p.id === id ? Object.assign({}, p, patch) : p; });
    return save(list, msg);
  }

  /* ---------- Статистик ---------- */
  function renderStats() {
    var products = S.getProducts();
    var orders = S.getOrders();
    var revenue = orders.reduce(function (s, o) { return s + o.total; }, 0);
    var stockValue = products.reduce(function (s, p) { return s + p.price * (p.stock || 0); }, 0);
    $("#stats").innerHTML =
      stat("Нийт бараа", products.length) +
      stat("Агуулахын үнэлгээ", S.money(stockValue)) +
      stat("Захиалга", orders.length) +
      stat("Захиалгын дүн", S.money(revenue));
    $("#tabCountProducts").textContent = products.length;
    $("#tabCountOrders").textContent = orders.length;
  }
  function stat(label, value) { return '<div class="stat"><span>' + label + "</span><strong>" + value + "</strong></div>"; }

  /* ---------- Бүтээгдэхүүний хүснэгт ---------- */
  function catOptions(selected, withAll) {
    return (withAll ? '<option value="all">Бүх ангилал</option>' : "") +
      S.getCategories().map(function (c) {
        return '<option value="' + c.id + '"' + (c.id === selected ? " selected" : "") + ">" + esc(c.name) + "</option>";
      }).join("");
  }

  function thumbHTML(p) {
    return '<button class="thumb" type="button" data-edit="' + esc(p.id) + '" aria-label="Зураг солих">' +
      (p.image ? '<img src="' + esc(p.image) + '" alt="" loading="lazy" onerror="this.parentNode.classList.add(\'is-broken\')">' : "") +
      '<span class="ph">' + I.get(p.category, 22) + "<span></span></span></button>";
  }

  function renderProducts() {
    var q = filter.q.toLowerCase();
    var rows = S.getProducts().filter(function (p) {
      if (filter.cat !== "all" && p.category !== filter.cat) return false;
      return !q || (p.name + " " + p.brand).toLowerCase().indexOf(q) !== -1;
    });
    $("#productRows").innerHTML = rows.length ? rows.map(function (p) {
      return '<tr data-row="' + esc(p.id) + '">' +
        "<td>" + thumbHTML(p) + "</td>" +
        '<td class="pname"><strong>' + esc(p.name) + "</strong><span>" + esc(p.brand || "") + " · " + esc(p.unit) + "</span></td>" +
        '<td><select data-field="category" aria-label="Ангилал">' + catOptions(p.category) + "</select></td>" +
        '<td class="num"><input type="number" min="0" step="100" data-field="price" value="' + esc(p.price) + '" aria-label="Үнэ"></td>' +
        '<td class="num"><input class="small" type="number" min="1" data-field="minOrder" value="' + esc(p.minOrder) + '" aria-label="Доод захиалга"></td>' +
        '<td class="num"><input class="small" type="number" min="0" data-field="stock" value="' + esc(p.stock) + '" aria-label="Нөөц"></td>' +
        '<td><label class="switch"><input type="checkbox" data-field="featured"' + (p.featured ? " checked" : "") + ' aria-label="Онцлох"><span></span></label></td>' +
        '<td><div class="row-actions">' +
          '<button class="icon-btn" type="button" data-edit="' + esc(p.id) + '" aria-label="Засах" title="Засах">' + I.get("edit", 18) + "</button>" +
          '<button class="icon-btn danger" type="button" data-delete="' + esc(p.id) + '" aria-label="Устгах" title="Устгах">' + I.get("trash", 18) + "</button>" +
        "</div></td>" +
      "</tr>";
    }).join("") : '<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--muted)">Бараа олдсонгүй</td></tr>';
  }

  /* ---------- Захиалга ---------- */
  var statusNames = { "new": "Шинэ", confirmed: "Баталгаажсан", paid: "Төлөгдсөн", delivered: "Хүргэгдсэн", cancelled: "Цуцлагдсан" };
  var payNames = { bank: "Банкны шилжүүлэг", qpay: "QPay", cash: "Хүлээн авахдаа" };

  function renderOrders() {
    var orders = S.getOrders();
    if (!orders.length) {
      $("#orderList").innerHTML = '<div class="empty">' + I.get("box", 40) + "<h3>Захиалга алга байна</h3><p>Каталогоос захиалга илгээхэд энд харагдана.</p></div>";
      return;
    }
    $("#orderList").innerHTML = orders.map(function (o) {
      var d = new Date(o.createdAt);
      var when = d.toLocaleDateString("mn-MN") + " " + d.toLocaleTimeString("mn-MN", { hour: "2-digit", minute: "2-digit" });
      return '<article class="order">' +
        '<div class="order__head"><div><h3>' + esc(o.id) + "</h3><p>" + esc(when) + "</p></div>" +
          '<div class="order__meta">' +
            '<span class="pill ' + (o.paid ? "pill--paid" : "pill--new") + '">' + (o.paid ? "Төлбөр орсон" : "Төлбөр хүлээгдэж буй") + "</span>" +
            '<select data-order="' + esc(o.id) + '" aria-label="Төлөв">' +
              Object.keys(statusNames).map(function (k) { return '<option value="' + k + '"' + (o.status === k ? " selected" : "") + ">" + statusNames[k] + "</option>"; }).join("") +
            "</select>" +
          "</div></div>" +
        '<div class="order__body">' +
          "<dl><dt>Нэр</dt><dd>" + esc(o.customer.name) + "</dd>" +
          "<dt>Утас</dt><dd>" + esc(o.customer.phone) + "</dd>" +
          (o.customer.address ? "<dt>Хаяг</dt><dd>" + esc(o.customer.address) + "</dd>" : "") +
          (o.customer.note ? "<dt>Тайлбар</dt><dd>" + esc(o.customer.note) + "</dd>" : "") +
          "<dt>Төлбөр</dt><dd>" + esc(payNames[o.payment] || o.payment) + "</dd></dl>" +
          '<div class="order__items">' + o.items.map(function (i) {
            return '<div class="co__item"><span>' + esc(i.name) + " <em>× " + i.qty + "</em></span><span>" + S.money(i.total) + "</span></div>";
          }).join("") +
          '<div class="sum sum--total"><span>Нийт</span><span>' + S.money(o.total) + "</span></div></div>" +
        "</div></article>";
    }).join("");
  }

  /* ---------- Засах цонх ---------- */
  function openEdit(id) {
    var p = id ? S.findProduct(id) : {
      id: "", category: filter.cat !== "all" ? filter.cat : "home", name: "", brand: "", price: "", unit: "ширхэг",
      minOrder: 1, stock: 0, featured: false, short: "", description: "", details: [], image: "", credit: ""
    };
    editingId = id || null;
    var f = $("#editForm");
    $("#editEyebrow").textContent = id ? "Засах" : "Шинэ бараа";
    $("#editTitle").textContent = id ? p.name : "Шинэ бүтээгдэхүүн нэмэх";
    $("#eCategory").innerHTML = catOptions(p.category);
    f.name.value = p.name;
    f.brand.value = p.brand || "";
    f.price.value = p.price;
    f.unit.value = p.unit || "";
    f.minOrder.value = p.minOrder || 1;
    f.stock.value = p.stock || 0;
    f.featured.checked = !!p.featured;
    f.short.value = p.short || "";
    f.description.value = p.description || "";
    f.details.value = (p.details || []).map(function (d) { return d[0] + ": " + d[1]; }).join("\n");
    f.image.value = p.image && p.image.indexOf("data:") === 0 ? "" : (p.image || "");
    f.image.dataset.upload = p.image && p.image.indexOf("data:") === 0 ? p.image : "";
    f.credit.value = (p.credit || "").replace(/<[^>]+>/g, "");
    $$(".field", f).forEach(function (el) { el.classList.remove("has-err"); var e = el.querySelector(".err"); if (e) e.textContent = ""; });
    preview(p.image, p.category);

    var m = $("#editModal");
    m.hidden = false;
    document.body.classList.add("no-scroll");
    requestAnimationFrame(function () { m.classList.add("is-open"); });
    setTimeout(function () { f.name.focus(); }, 60);
  }

  function closeEdit() {
    var m = $("#editModal");
    m.classList.remove("is-open");
    setTimeout(function () { m.hidden = true; document.body.classList.remove("no-scroll"); }, 220);
  }

  function preview(src, cat) {
    $("#editPreview").innerHTML = (src ? '<img src="' + esc(src) + '" alt="" onerror="this.classList.add(\'bad\')">' : "") +
      '<div class="ph">' + I.get(cat || "other", 40) + "<span>Зураг алга</span></div>";
  }

  function readImageFile(file, cb) {
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var max = 900;
        var scale = Math.min(1, max / Math.max(img.width, img.height));
        var c = document.createElement("canvas");
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        cb(c.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = function () { toast("Зургийг уншиж чадсангүй"); };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  function submitEdit(e) {
    e.preventDefault();
    var f = e.target;
    var ok = true;
    var err = function (input, msg) {
      var field = input.closest(".field");
      field.classList.toggle("has-err", !!msg);
      field.querySelector(".err").textContent = msg || "";
      if (msg) ok = false;
    };
    err(f.name, f.name.value.trim().length < 2 ? "Нэр оруулна уу" : "");
    err(f.price, f.price.value === "" || Number(f.price.value) < 0 ? "Үнэ оруулна уу" : "");
    if (!ok) return;

    var details = f.details.value.split("\n").map(function (line) {
      var i = line.indexOf(":");
      return i > 0 ? [line.slice(0, i).trim(), line.slice(i + 1).trim()] : null;
    }).filter(Boolean);

    var data = {
      name: f.name.value.trim(),
      category: f.category.value,
      brand: f.brand.value.trim(),
      price: Math.round(Number(f.price.value)),
      unit: f.unit.value.trim() || "ширхэг",
      minOrder: Math.max(1, parseInt(f.minOrder.value, 10) || 1),
      stock: Math.max(0, parseInt(f.stock.value, 10) || 0),
      featured: f.featured.checked,
      short: f.short.value.trim(),
      description: f.description.value.trim() || f.short.value.trim(),
      details: details,
      image: f.image.dataset.upload || f.image.value.trim(),
      credit: esc(f.credit.value.trim())
    };

    var list = S.getProducts();
    if (editingId) {
      list = list.map(function (p) { return p.id === editingId ? Object.assign({}, p, data) : p; });
      if (save(list, "Өөрчлөлт хадгалагдлаа")) closeEdit();
    } else {
      data.id = "p" + Date.now().toString(36);
      list.unshift(data);
      if (save(list, "Шинэ бараа нэмэгдлээ")) { closeEdit(); filter.q = ""; $("#admSearch").value = ""; }
    }
  }

  function exportData() {
    var payload = Object.assign({}, window.CATALOG, { products: S.getProducts() });
    var text = "window.CATALOG = " + JSON.stringify(payload, null, 2) + ";\n";
    var blob = new Blob([text], { type: "text/javascript;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data.js";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    toast("data.js файл татагдлаа");
  }

  /* ---------- Үйл явдал ---------- */
  function bind() {
    $$(".adm__tab").forEach(function (t) {
      t.addEventListener("click", function () {
        $$(".adm__tab").forEach(function (x) { x.classList.toggle("is-active", x === t); x.setAttribute("aria-selected", x === t ? "true" : "false"); });
        $("#tab-products").hidden = t.dataset.tab !== "products";
        $("#tab-orders").hidden = t.dataset.tab !== "orders";
      });
    });

    $("#admSearch").addEventListener("input", function (e) { filter.q = e.target.value.trim(); renderProducts(); });
    $("#admCat").addEventListener("change", function (e) { filter.cat = e.target.value; renderProducts(); });
    $("#addProduct").addEventListener("click", function () { openEdit(null); });
    $("#exportData").addEventListener("click", exportData);
    $("#resetData").addEventListener("click", function () {
      if (confirm("Бүх өөрчлөлтийг цуцалж, анхны өгөгдөл рүү буцах уу?")) { S.resetProducts(); toast("Анхны өгөгдөл сэргээгдлээ"); }
    });
    $("#clearOrders").addEventListener("click", function () {
      if (confirm("Бүх захиалгыг устгах уу?")) { S.clearOrders(); toast("Захиалгууд устгагдлаа"); }
    });

    $("#productRows").addEventListener("change", function (e) {
      var input = e.target.closest("[data-field]");
      if (!input) return;
      var row = input.closest("[data-row]");
      var field = input.dataset.field;
      var value = input.type === "checkbox" ? input.checked : input.tagName === "SELECT" ? input.value : Math.max(0, Math.round(Number(input.value) || 0));
      if (field === "minOrder") value = Math.max(1, value);
      if (patchProduct(row.dataset.row, (function () { var o = {}; o[field] = value; return o; })(), "Хадгалагдлаа")) {
        var r = $('[data-row="' + row.dataset.row + '"]');
        if (r) r.classList.add("flash");
      }
    });

    document.addEventListener("click", function (e) {
      var ed = e.target.closest("[data-edit]");
      if (ed) { openEdit(ed.dataset.edit); return; }
      var del = e.target.closest("[data-delete]");
      if (del) {
        var p = S.findProduct(del.dataset.delete);
        if (p && confirm("«" + p.name + "» барааг устгах уу?")) {
          save(S.getProducts().filter(function (x) { return x.id !== p.id; }), "Бараа устгагдлаа");
        }
        return;
      }
      if (e.target.closest("#editModal [data-close]")) closeEdit();
    });

    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !$("#editModal").hidden) closeEdit(); });

    $("#orderList").addEventListener("change", function (e) {
      var sel = e.target.closest("[data-order]");
      if (!sel) return;
      var patch = { status: sel.value };
      if (sel.value === "paid" || sel.value === "delivered") patch.paid = true;
      S.updateOrder(sel.dataset.order, patch);
      toast("Захиалгын төлөв шинэчлэгдлээ");
    });

    $("#eImage").addEventListener("input", function (e) {
      e.target.dataset.upload = "";
      preview(e.target.value.trim(), $("#eCategory").value);
    });
    $("#eFile").addEventListener("change", function (e) {
      var file = e.target.files && e.target.files[0];
      if (!file) return;
      readImageFile(file, function (dataUrl) {
        $("#eImage").value = "";
        $("#eImage").dataset.upload = dataUrl;
        preview(dataUrl, $("#eCategory").value);
        toast("Зураг сонгогдлоо. Хадгалах товчийг дарна уу.");
      });
      e.target.value = "";
    });
    $("#editForm").addEventListener("submit", submitEdit);
  }

  function renderAll() {
    renderStats();
    renderProducts();
    renderOrders();
  }

  document.addEventListener("DOMContentLoaded", function () {
    paintIcons(document);
    $("#admCat").innerHTML = catOptions("all", true);
    renderAll();
    bind();
    S.on(renderAll);
  });
})();
