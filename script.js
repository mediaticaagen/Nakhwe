/* ===== MENU DATA — edit here =====
   category must match one of CATEGORIES. price is a number in LBP.
   unit: selling unit (e.g. "للكيلو"). Left blank until confirmed; shown only when filled. */
const CATEGORIES = ["معمول", "حلويات شرقية", "كعكة الكنافة"];

const MENU = [
  { category: "معمول", ar: "معمول مد بالجوز",   en: "Walnut Maamoul Tray",    price: 600000, unit: "" },
  { category: "معمول", ar: "معمول مد بالفستق",  en: "Pistachio Maamoul Tray", price: 900000, unit: "" },
  { category: "معمول", ar: "معمول مد بالتمر",   en: "Date Maamoul Tray",      price: 450000, unit: "" },
  { category: "معمول", ar: "معمول مد بالقشطة",  en: "Ashta Cream Maamoul Tray", price: 800000, unit: "" },
  { category: "حلويات شرقية", ar: "بقلاوة مشكل", en: "Assorted Baklava", price: 700000, unit: "" },
  { category: "حلويات شرقية", ar: "نمورة",       en: "Namoura",          price: 450000, unit: "" },
  { category: "حلويات شرقية", ar: "صفوف",        en: "Sfouf",            price: 450000, unit: "" },
  { category: "حلويات شرقية", ar: "قطايف",       en: "Qatayef",          price: 700000, unit: "" },
  { category: "حلويات شرقية", ar: "مفروكة",      en: "Mafroukeh",        price: 700000, unit: "" },
  { category: "حلويات شرقية", ar: "حلاوة الجبن", en: "Halawet El Jibn",  price: 700000, unit: "" },
  { category: "كعكة الكنافة", ar: "كعكة الكنافة بالجبنة", en: "Cheese Knefeh in Kaakeh",      price: 180000, unit: "" },
  { category: "كعكة الكنافة", ar: "كعكة الكنافة بالقشطة", en: "Ashta Cream Knefeh in Kaakeh", price: 150000, unit: "" },
];
/* ===== end of data ===== */

const $menu = document.getElementById("menu");
const $empty = document.getElementById("empty");
const $status = document.getElementById("status");
const $q = document.getElementById("q");
const chips = [...document.querySelectorAll(".chip")];
let activeCat = "all";

// Normalize Arabic + Latin for forgiving search
const norm = s => s.toLowerCase()
  .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
  .replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه")
  .replace(/\s+/g, " ").trim();

const fmt = n => n.toLocaleString("en-US");

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

function card(it) {
  const li = el("article", "item");
  const names = el("div", "names");
  names.append(el("h3", "ar", it.ar), el("p", "en", it.en));
  if (it.unit) names.append(el("span", "unit", it.unit));
  const price = el("div", "price");
  const num = el("bdi", "", fmt(it.price)); num.dir = "ltr";
  price.append(num, el("small", "", "ل.ل."));
  li.append(names, price);
  return li;
}

function render() {
  const q = norm($q.value);
  const list = MENU.filter(it =>
    (activeCat === "all" || it.category === activeCat) &&
    (!q || norm(it.ar).includes(q) || norm(it.en).includes(q)));

  $menu.replaceChildren();
  CATEGORIES.forEach(cat => {
    const items = list.filter(i => i.category === cat);
    if (!items.length) return;
    if (activeCat === "all") $menu.append(el("h2", "group-title", cat));
    items.forEach(i => $menu.append(card(i)));
  });
  $empty.hidden = list.length > 0;
  $status.textContent = list.length ? `${list.length} صنف` : "لا توجد نتائج";
}

chips.forEach(c => c.addEventListener("click", () => {
  activeCat = c.dataset.cat;
  chips.forEach(x => {
    const on = x === c;
    x.classList.toggle("is-active", on);
    x.setAttribute("aria-pressed", on);
  });
  render();
}));
$q.addEventListener("input", render);
document.getElementById("yr").textContent = new Date().getFullYear();
render();
