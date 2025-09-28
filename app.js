// ---------- sample data ----------
const shows = [
  { id: '1', title: 'Singing Animals', channel: 'Happy Tunes', duration: '3:15', thumb: 'https://via.placeholder.com/640x360.png?text=Singing+Animals', video: 'https://www.youtube.com/embed/5qap5aO4i9A' },
  { id: '2', title: 'Counting with Cats', channel: 'Number Friends', duration: '4:02', thumb: 'https://via.placeholder.com/640x360.png?text=Counting+with+Cats', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: '3', title: 'Colors & Shapes', channel: 'Learning Land', duration: '2:45', thumb: 'https://via.placeholder.com/640x360.png?text=Colors+%26+Shapes', video: 'https://www.youtube.com/embed/3JZ_D3ELwOQ' },
  { id: '4', title: 'Bedtime Stories', channel: 'Dreamtime', duration: '7:10', thumb: 'https://via.placeholder.com/640x360.png?text=Bedtime+Stories', video: 'https://www.youtube.com/embed/oHg5SJYRHA0' },
  { id: '5', title: 'Friendly Dinosaurs', channel: 'Prehistoric Pals', duration: '5:20', thumb: 'https://via.placeholder.com/640x360.png?text=Friendly+Dinosaurs', video: 'https://www.youtube.com/embed/2Vv-BfVoq4g' }
];

// ---------- render grid ----------
const grid = document.getElementById('grid');
function makeCard(s){
  const el = document.createElement('article');
  el.className = 'card';
  el.tabIndex = 0;
  el.setAttribute('role','button');
  el.setAttribute('aria-label', s.title + ' — open player');

  el.innerHTML = `
    <img class="thumb" src="${s.thumb}" alt="${s.title} thumbnail" />
    <div class="meta">
      <div class="name">${s.title}</div>
      <div class="meta-row"><span class="badge">${s.duration}</span><span>${s.channel}</span></div>
    </div>
  `;

  el.addEventListener('click', ()=> openPlayer(s));
  el.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPlayer(s); } });
  return el;
}

function render(list){
  grid.innerHTML = '';
  list.forEach(s => grid.appendChild(makeCard(s)));
}

render(shows);

// ---------- modal player ----------
const backdrop = document.getElementById('backdrop');
const playerWrap = document.getElementById('playerWrap');
const modalTitle = document.getElementById('modalTitle');
const modalMeta = document.getElementById('modalMeta');
const closeBtn = document.getElementById('closeBtn');

function openPlayer(s){
  playerWrap.innerHTML = '';
  const iframe = document.createElement('iframe');
  iframe.src = s.video + '?autoplay=1&rel=0&modestbranding=1';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.title = s.title + ' — video player';
  playerWrap.appendChild(iframe);

  modalTitle.textContent = s.title;
  modalMeta.textContent = s.channel + ' • ' + s.duration;

  backdrop.style.display = 'flex';
  backdrop.setAttribute('aria-hidden','false');
  closeBtn.focus();
  window.addEventListener('keydown', escClose);
}

function closePlayer(){
  backdrop.style.display = 'none';
  backdrop.setAttribute('aria-hidden','true');
  playerWrap.innerHTML = '';
  window.removeEventListener('keydown', escClose);
}

function escClose(e){ if(e.key === 'Escape') closePlayer(); }

backdrop.addEventListener('click', (e)=>{ if(e.target === backdrop) closePlayer(); });
closeBtn.addEventListener('click', closePlayer);

// ---------- search + shuffle ----------
const q = document.getElementById('q');
q.addEventListener('input', ()=>{
  const v = q.value.trim().toLowerCase();
  if(!v){ render(shows); return; }
  const filtered = shows.filter(s => (s.title + ' ' + s.channel).toLowerCase().includes(v));
  render(filtered);
});

document.getElementById('shuffle').addEventListener('click', ()=>{
  const shuffled = [...shows].sort(()=>Math.random()-0.5);
  render(shuffled);
});

window.addEventListener('keydown', (e)=>{
  if(e.key === 'k' && !e.metaKey && !e.ctrlKey){ e.preventDefault(); q.focus(); }
});
