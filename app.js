/* =========================================================
   «Дегушвили» — данные и логика страницы
   ========================================================= */

/* 0 = воскресенье … 6 = суббота (по данным Яндекс Карт) */
const HOURS = [
  ['12:00', '00:00'], // Вс
  ['12:00', '00:00'], // Пн
  ['12:00', '00:00'], // Вт
  ['12:00', '00:00'], // Ср
  ['12:00', '00:00'], // Чт
  ['12:00', '01:00'], // Пт
  ['12:00', '01:00'], // Сб
];

/* меню — позиции и цены ресторана на Яндекс Картах: [название, выход, цена, пояснение] */
const MENU = [
  { cat: 'Хинкали', photo: ['khinkali-2.jpg', 'Хинкали'], items: [
    ['Хинкали обжаренные с телятиной и свининой', '3 шт · 360 г', 420],
    ['Хинкали сванские с рубленой говядиной и острым перцем', '3 шт · 360 г', 390],
  ] },
  { cat: 'Выпечка', photo: ['adjaruli-2.jpg', 'Хачапури по-аджарски'], items: [
    ['Хачапури по-аджарски', '380 г', 480],
    ['Хачапури по-мегрельски', '380 г', 495],
    ['Кутаб с сыром', '100 г', 220],
  ] },
  { cat: 'Горячее', photo: ['mangal-board.jpg', 'Горячее'], items: [
    ['Цыплёнок тапака с молодым картофелем и ароматными травами', '290 г', 990],
    ['Чахохбили из курицы с овощами в томатном соусе', '450 г', 580],
    ['Чашушули из говядины с овощами в томатном соусе', '350 г', 580],
    ['Оджахури из свинины с овощами', '300 г', 535],
  ] },
  { cat: 'Мангал', photo: ['mangal.jpg', 'Мангал'], items: [
    ['Садж на компанию', '1 500 г', 3850],
    ['Люля-кебаб из курицы', '150 г', 390],
    ['Люля-кебаб из барашка', '150 г', 650],
    ['Бостунели', '230 г', 490, 'баклажан, белый лук, сладкий перец, цукини, помидор'],
  ] },
  { cat: 'Супы', photo: ['soup.jpg', 'Супы'], items: [
    ['Харчо', '350 г', 495],
    ['Лагман', '350 г', 440],
  ] },
  { cat: 'Салаты', photo: ['salad-eggplant.jpg', 'Салаты'], items: [
    ['Салат с хрустящими баклажанами', '170 г', 385],
    ['Салат с томатами и кремом сулугуни', '250 г', 420],
    ['Салат с креветками', '250 г', 650],
    ['Салат со слабосолёным лососем', '150 г', 830],
  ] },
  { cat: 'Закуски', photo: ['boards.jpg', 'Подача на компанию'], items: [
    ['Рулетики из баклажанов с нежным сыром', '300 г', 520],
  ] },
];

/* «Грузия в 8 блюдах»: общеизвестные пояснения + реальная цена из меню */
const GUIDE = [
  { name: 'Хинкали', ge: 'ხინკალი', img: 'khinkali.jpg', price: 390, from: true, menu: 'Хинкали',
    text: 'Мешочки из тонкого теста с мясной начинкой и бульоном внутри. Берут руками за «хвостик», надкусывают и сначала выпивают бульон.',
    note: 'Сванские — с рубленой говядиной и острым перцем; есть обжаренные' },
  { name: 'Хачапури по-аджарски', ge: 'აჭარული', img: 'adjaruli.jpg', price: 480, menu: 'Выпечка',
    text: 'Лодочка из дрожжевого теста с расплавленным сыром и желтком. Желток вмешивают в сыр и макают в него отломанные бортики.',
    note: '380 г' },
  { name: 'Хачапури по-мегрельски', ge: 'მეგრული', price: 495, menu: 'Выпечка',
    text: 'Круглая лепёшка, где сыр и внутри, и запечён сверху. Хорошо делить на всех.', note: '380 г' },
  { name: 'Харчо', ge: 'ხარჩო', price: 495, menu: 'Супы',
    text: 'Густой пряный суп из говядины с рисом — один из самых известных грузинских супов.', note: '350 г' },
  { name: 'Чахохбили', ge: 'ჩახოხბილი', price: 580, menu: 'Горячее',
    text: 'Птица, тушённая с томатами, луком и зеленью до густого соуса.', note: 'из курицы · 450 г' },
  { name: 'Чашушули', ge: 'ჩაშუშული', price: 580, menu: 'Горячее',
    text: 'Говядина, тушённая с овощами в томатном соусе, — сытное блюдо, к которому просится хлеб.', note: 'из говядины · 350 г' },
  { name: 'Оджахури', ge: 'ოჯახური', price: 535, menu: 'Горячее',
    text: 'В переводе — «семейное»: жареное мясо с овощами, простое и сытное домашнее блюдо.', note: 'из свинины · 300 г' },
  { name: 'Цыплёнок тапака', ge: 'ტაპაკა', price: 990, menu: 'Горячее',
    text: 'Цыплёнок, обжаренный под прессом до хрустящей корочки. Название — от сковороды «тапа».', note: 'с молодым картофелем · 290 г' },
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const rub = n => n.toLocaleString('ru-RU') + ' ₽';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function renderGuide() {
  $('#guideGrid').innerHTML = GUIDE.map((d, i) => `
    <article class="dish${d.img ? ' dish--photo' : ''}">
      ${d.img ? `<figure class="dish__img"><img src="img/${d.img}" alt="${esc(d.name)}" loading="lazy"></figure>` : ''}
      <div class="dish__body">
        <p class="dish__num">${String(i + 1).padStart(2, '0')}<span lang="ka">${d.ge}</span></p>
        <h3 class="dish__name">${esc(d.name)}</h3>
        <p class="dish__text">${esc(d.text)}</p>
        <p class="dish__foot"><span class="dish__note">${esc(d.note)}</span><b class="dish__price">${d.from ? 'от ' : ''}${rub(d.price)}</b></p>
        <button type="button" class="dish__go" data-cat="${esc(d.menu)}">В меню →</button>
      </div>
    </article>`).join('');
  $('#guideGrid').addEventListener('click', e => {
    const b = e.target.closest('.dish__go'); if (!b) return;
    selectTab(MENU.findIndex(c => c.cat === b.dataset.cat));
    $('#menu').scrollIntoView({ behavior: 'smooth' });
  });
}

function renderTabs() {
  $('#tabs').innerHTML = MENU.map((c, i) =>
    `<button type="button" role="tab" id="tab-${i}" aria-controls="menuList" aria-selected="${i === 0}" data-i="${i}">${esc(c.cat)}<sup>${c.items.length}</sup></button>`).join('');
  $('#tabs').addEventListener('click', e => {
    const b = e.target.closest('[role=tab]'); if (b) selectTab(+b.dataset.i);
  });
  $('#tabs').addEventListener('keydown', e => {
    if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
    const cur = $$('#tabs [role=tab]').findIndex(t => t.getAttribute('aria-selected') === 'true');
    const n = (cur + (e.key === 'ArrowRight' ? 1 : MENU.length - 1)) % MENU.length;
    selectTab(n); $(`#tab-${n}`).focus();
  });
  selectTab(0);
}

function selectTab(i) {
  if (i < 0) i = 0;
  const c = MENU[i];
  $$('#tabs [role=tab]').forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; });
  const list = $('#menuList');
  list.setAttribute('aria-labelledby', `tab-${i}`);
  list.innerHTML = c.items.map(([name, w, price, desc]) => `
    <div class="mi">
      <p class="mi__name">${esc(name)}${desc ? `<small>${esc(desc)}</small>` : ''}</p>
      <span class="mi__dots" aria-hidden="true"></span>
      <p class="mi__right"><span class="mi__w">${esc(w)}</span><b>${rub(price)}</b></p>
    </div>`).join('');
  list.classList.remove('is-swap'); void list.offsetWidth; list.classList.add('is-swap');
  const img = $('#menuPhoto');
  if (!img.src.endsWith(c.photo[0])) { img.src = 'img/' + c.photo[0]; img.alt = c.photo[1]; }
  $('#menuPhotoCap').textContent = c.photo[1];
}

function renderHours() {
  const names = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const rows = [];
  [1, 2, 3, 4, 5, 6, 0].forEach(d => {
    const h = HOURS[d];
    const key = h ? h.join('–') : 'выходной';
    const last = rows[rows.length - 1];
    if (last && last.key === key) last.to = d; else rows.push({ from: d, to: d, key });
  });
  $('#hoursList').innerHTML = rows.map(r => `${names[r.from]}${r.from !== r.to ? '–' + names[r.to] : ''}: ${r.key}`).join('<br>');

  const perm = new Date(Date.now() + (5 * 60 + new Date().getTimezoneOffset()) * 60000);
  const toMin = s => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
  const now = perm.getHours() * 60 + perm.getMinutes();
  const today = HOURS[perm.getDay()];
  const yest = HOURS[(perm.getDay() + 6) % 7];
  let big = 'Закрыто', small = `откроемся в ${today ? today[0] : '12:00'}`, open = false;
  if (yest && toMin(yest[1]) <= toMin(yest[0]) && now < toMin(yest[1])) { open = true; big = 'Открыто'; small = `до ${yest[1]}`; }
  else if (today) {
    const o = toMin(today[0]); let c = toMin(today[1]); if (c <= o) c += 1440;
    if (now >= o && now < c) { open = true; big = 'Открыто'; small = `сегодня до ${today[1]}`; }
  }
  const el = $('#openNow');
  el.textContent = big; el.classList.toggle('is-open', open);
  $('#openNowText').textContent = small;
  const st = $('#statusLine');
  st.textContent = `${big} · ${small} (время пермское)`; st.classList.toggle('is-open', open);
}

function initHeader() {
  const header = $('#header');
  const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const burger = $('#burger'), nav = $('#nav');
  const set = open => {
    burger.setAttribute('aria-expanded', open); nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    document.body.classList.toggle('nav-open', open);
  };
  burger.addEventListener('click', () => set(burger.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', e => { if (e.target.tagName === 'A') set(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
}

function initLightbox() {
  const lb = $('#lightbox'), img = $('img', lb);
  let list = [], idx = 0;
  const show = i => { idx = (i + list.length) % list.length; img.src = list[idx].src; img.alt = list[idx].alt; };
  const open = (el, group) => { list = group; show(group.indexOf(el)); lb.hidden = false; document.body.classList.add('lb-open'); $('.lightbox__close', lb).focus(); };
  const close = () => { lb.hidden = true; document.body.classList.remove('lb-open'); };
  ['#plates', '#hallGrid', '#guideGrid'].forEach(sel => {
    const root = $(sel);
    root.addEventListener('click', e => {
      if (e.target.tagName !== 'IMG') return;
      open(e.target, $$('img', root));
    });
  });
  $('.lightbox__prev', lb).addEventListener('click', e => { e.stopPropagation(); show(idx - 1); });
  $('.lightbox__next', lb).addEventListener('click', e => { e.stopPropagation(); show(idx + 1); });
  lb.addEventListener('click', e => { if (e.target !== img) close(); });
  addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(idx + 1);
    if (e.key === 'ArrowLeft') show(idx - 1);
  });
}

function initReveal() {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = $$('.intro__body > *, .guide__head > *, .dish, .menu__head, .menu__grid, .plates__head, .hall__head, .hall__grid img, .perks li, .q, .book__grid > *, .contacts__grid > *');
  els.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -6% 0px' });
  els.forEach(el => io.observe(el));
}

renderGuide();
renderTabs();
renderHours();
initHeader();
initLightbox();
initReveal();
