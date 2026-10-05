// Replace empty image values with paths such as "images/studio-01.jpg".
// Keep local photographs in dist/images. No rebuild is required.
const AURA = {
  images: { hero: '', studio: '' },
  gallery: [
    { id: 'space-01', category: 'studio', image: '', pl: 'Przestrzeń / 01', en: 'The space / 01' },
    { id: 'portrait-01', category: 'session', image: '', pl: 'Portret / 01', en: 'Portrait / 01' },
    { id: 'detail-01', category: 'studio', image: '', pl: 'Detale / 01', en: 'Details / 01' },
    { id: 'brand-01', category: 'session', image: '', pl: 'Marka / 01', en: 'Brand / 01' },
    { id: 'space-02', category: 'studio', image: '', pl: 'Przestrzeń / 02', en: 'The space / 02' },
    { id: 'project-01', category: 'session', image: '', pl: 'Projekt / 01', en: 'Project / 01' }
  ]
};
let language = 'pl';
let filter = 'all';
let currentLightbox = null;
const $ = id => document.getElementById(id);
const words = (pl,en) => language === 'pl' ? pl : en;
const safeImage = value => typeof value === 'string' && value.length > 0 && !/^(javascript|data):/i.test(value);
function applyImage(slot, src, alt) {
  if (!safeImage(src)) return;
  const img = slot.querySelector('img');
  img.alt = alt;
  img.onload = () => { img.hidden = false; slot.classList.add('has-image'); };
  img.onerror = () => { img.hidden = true; slot.classList.remove('has-image'); };
  img.src = src;
}
function makeSlot(item) {
  const slot = document.createElement('div'); slot.className = 'photo-slot';
  const img = document.createElement('img'); img.hidden = true; img.loading = 'lazy'; slot.append(img);
  const label = document.createElement('span'); label.className = 'slot-label'; label.textContent = words('TWOJE ZDJĘCIE TUTAJ','YOUR PHOTO HERE'); slot.append(label);
  applyImage(slot,item.image,item[language]); return slot;
}
function renderGallery() {
  $('gallery-grid').replaceChildren();
  AURA.gallery.filter(item => filter === 'all' || item.category === filter).forEach(item => {
    const button = document.createElement('button'); button.className = 'gallery-item'; button.type = 'button';
    button.setAttribute('aria-label',words('Otwórz: ','Open: ')+item[language]); button.append(makeSlot(item));
    const caption = document.createElement('span'); caption.className = 'caption';
    const title = document.createElement('span'); title.textContent = item[language];
    const category = document.createElement('small'); category.textContent = item.category === 'studio' ? 'STUDIO' : words('SESJA','SESSION');
    caption.append(title,category); button.append(caption);
    button.addEventListener('click',()=>{ currentLightbox = item; $('lightbox-content').replaceChildren(makeSlot(item)); $('lightbox-caption').textContent = item[language]; $('lightbox').showModal(); });
    $('gallery-grid').append(button);
  });
}
function translate() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-pl][data-en]').forEach(el => { el.innerHTML = el.dataset[language]; });
  $('language').textContent = language === 'pl' ? 'EN' : 'PL';
  $('language').setAttribute('aria-label',words('Switch to English','Przełącz na polski'));
  $('chat-input').placeholder = words('Napisz pytanie…','Ask a question…');
  $('chat-close').setAttribute('aria-label',words('Zamknij czat','Close chat'));
  $('lightbox-close').setAttribute('aria-label',words('Zamknij zdjęcie','Close image'));
  renderGallery();
  if (currentLightbox) { $('lightbox-caption').textContent=currentLightbox[language]; $('lightbox-content').replaceChildren(makeSlot(currentLightbox)); }
  if (!$('enquiry-result').hidden) createEnquiry();
  $('chat-log').replaceChildren(); greet();
}
$('language').addEventListener('click',()=>{ language=language==='pl'?'en':'pl';translate(); });
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  filter=button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(el=>{const active=el===button;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});renderGallery();
}));
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>{ $('service').value=button.dataset.service; $('booking').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}); $('service').focus({preventScroll:true}); }));
function localToday(){const now=new Date();return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;}
$('date').min=localToday();
$('year').textContent=new Date().getFullYear();
Object.entries(AURA.images).forEach(([key,src])=>applyImage(document.querySelector(`[data-image="${key}"]`),src,words('Aura Studio Warsaw — studio','Aura Studio Warsaw — the studio')));
function createEnquiry(){
 const service=$('service').selectedOptions[0].textContent;
 const intro=words('Cześć Aura! Mam na imię ','Hi Aura! My name is ')+$('name').value.trim()+'.';
 $('message').value=`${intro}\n${words('Interesuje mnie: ','I am interested in: ')}${service}\n${words('Preferowany termin: ','Preferred date: ')}${$('date').value}, ${$('time').value}\n${words('Mój projekt: ','My project: ')}${$('project').value.trim() || words('Chętnie omówię szczegóły.','Happy to discuss the details.')}\n${words('Proszę o potwierdzenie dostępności, ceny i warunków.','Please confirm availability, pricing, and terms.')}`;
 $('enquiry-result').hidden=false; $('copy-status').textContent='';
}
$('booking-form').addEventListener('submit',event=>{event.preventDefault();$('date').min=localToday();if(!$('name').value.trim()){$('name').setCustomValidity(words('Wpisz swoje imię.','Enter your name.'));$('name').reportValidity();return;}if(!$('booking-form').reportValidity())return;createEnquiry();$('message').focus();});
$('name').addEventListener('input',()=> $('name').setCustomValidity(''));
$('copy-message').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('message').value);$('copy-status').textContent=words('Skopiowano. Wklej wiadomość w rozmowie na Instagramie.','Copied. Paste the message into your Instagram conversation.');}catch{$('message').focus();$('message').select();$('copy-status').textContent=words('Zaznaczono wiadomość. Skopiuj ją ręcznie.','Message selected. Copy it manually.');}});
$('lightbox-close').addEventListener('click',()=> $('lightbox').close());
$('lightbox').addEventListener('click',event=>{if(event.target===$('lightbox')){const r=$('lightbox').getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)$('lightbox').close();}});
function addChat(text,user=false){const el=document.createElement('div');el.className='chat-message'+(user?' user':'');el.textContent=text;$('chat-log').append(el);$('chat-log').scrollTop=$('chat-log').scrollHeight;}
function greet(){addChat(words('Cześć! Pomogę z pytaniami o sesję, wynajem i przygotowanie zapytania. Jestem asystentem FAQ. Dostępność, ceny i warunki potwierdza zespół studia.','Hi! I can help with sessions, rental enquiries, and planning your message. I am an FAQ assistant. Availability, pricing, and terms are confirmed by the studio team.'));}
function reply(value){const q=value.toLowerCase();if(/price|pricing|cena|ceny|cennik|koszt/.test(q))return words('Cenę potwierdza studio po omówieniu projektu. Przygotuj zapytanie w formularzu i wyślij je na @aura.studiowarsaw.','The studio confirms pricing after discussing your project. Prepare an enquiry using the form and send it to @aura.studiowarsaw.');if(/equipment|sprzęt|sprzet|wyposaż|wyposaz|light|świat|swiat/.test(q))return words('Listę wyposażenia i jego dostępność potwierdza studio. Napisz, jakich lamp, teł lub akcesoriów potrzebujesz.','The studio confirms its equipment list and availability. Mention the lights, backgrounds, or accessories you need.');if(/book|termin|rezerw|date|wynaj|rental/.test(q))return words('W sekcji „Zaplanuj sesję” wybierz wynajem lub sesję z fotografem, datę i godzinę. Skopiuj przygotowaną wiadomość i wyślij ją na Instagramie. Termin wymaga potwierdzenia.','In the planning section, choose rental or a photography session, a date, and a time. Copy the prepared message and send it on Instagram. Your date requires confirmation.');if(/adres|address|where|gdzie|lokal/.test(q))return words('Studio działa w Warszawie. Dokładny adres i wskazówki dojazdu potwierdź z @aura.studiowarsaw przed wizytą.','The studio is in Warsaw. Confirm the exact address and directions with @aura.studiowarsaw before your visit.');if(/sesj|session|portret|portrait|fotograf/.test(q))return words('Wybierz „Sesja z fotografem” w formularzu i opisz, jakie zdjęcia chcesz stworzyć. Studio potwierdzi zakres sesji i warunki.','Choose Photography session in the form and describe the images you want to create. The studio will confirm the scope and terms.');return words('W tej sprawie najlepiej porozmawiać z zespołem na @aura.studiowarsaw. Mogę pomóc z zapytaniem o termin, cenę lub wyposażenie.','For this question, contact the team at @aura.studiowarsaw. I can help with enquiries about dates, pricing, or equipment.');}
function openChat(open){$('chat-panel').hidden=!open;$('chat-toggle').setAttribute('aria-expanded',String(open));if(open)$('chat-input').focus();else $('chat-toggle').focus();}
$('chat-toggle').addEventListener('click',()=>openChat($('chat-panel').hidden));$('chat-close').addEventListener('click',()=>openChat(false));$('chat-panel').addEventListener('keydown',event=>{if(event.key==='Escape')openChat(false);});
$('chat-form').addEventListener('submit',event=>{event.preventDefault();const text=$('chat-input').value.trim();if(!text)return;addChat(text,true);addChat(reply(text));$('chat-input').value='';});
document.querySelectorAll('[data-question]').forEach(button=>button.addEventListener('click',()=>{addChat(button.textContent,true);addChat(reply(button.dataset.question));}));
translate();
