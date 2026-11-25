/* ====== CONFIGURE AQUI ====== */
const WHATSAPP = "5571991339023";        // DDI + DDD + número, só dígitos
const TELEFONE = "+5571991339023";       // para o botão de ligar
const TELEFONE_EXIBIR = "(71) 99133-9023"; // como aparece na tela
/* ============================ */

const waLink = m => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(m)}`;
document.querySelectorAll('[data-wa]').forEach(a=>{a.href=waLink(a.dataset.msg||"Olá! Preciso de um guincho.");a.target="_blank";a.rel="noopener"});
document.querySelectorAll('[data-tel]').forEach(a=>a.href="tel:"+TELEFONE);
document.querySelectorAll('[data-tel-text]').forEach(e=>e.textContent=TELEFONE_EXIBIR);

const onde=document.getElementById('onde');
document.getElementById('loc').onclick=e=>{
 const b=e.currentTarget,t=b.lastChild.textContent;
 if(!navigator.geolocation){onde.focus();return}
 b.lastChild.textContent="Buscando localização...";
 navigator.geolocation.getCurrentPosition(p=>{
  onde.value=`https://maps.google.com/?q=${p.coords.latitude},${p.coords.longitude}`;b.lastChild.textContent="Localização adicionada";
 },()=>{b.lastChild.textContent=t;onde.focus()},{timeout:8000});
};
document.getElementById('pedido').onsubmit=e=>{
 e.preventDefault();
 const v=document.getElementById('veic').value,s=document.getElementById('sit').value,o=onde.value.trim();
 window.open(waLink(`Olá! Preciso de guincho.\nVeículo: ${v}\nSituação: ${s}\nLocal: ${o||"vou informar"}`),"_blank");
};

const menu=document.getElementById('menu');
document.getElementById('mb').onclick=()=>menu.classList.toggle('open');
menu.querySelectorAll('a').forEach(a=>a.onclick=()=>menu.classList.remove('open'));

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
document.getElementById('ano').textContent=new Date().getFullYear();
