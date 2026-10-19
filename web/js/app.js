import { CARDS, TOPICS } from './vocabulary.js';
import { createSession, answerCard, summarize } from './session.js';
import { createStore } from './storage.js';
import { createSpeech, ACCENTS } from './speech.js';
import { icon } from './icons.js';

const app = document.querySelector('#app');
const byId = new Map(CARDS.map(c => [c.id, c]));
const store = createStore(() => window.localStorage, CARDS.map(c => c.id));
const state = store.load();
const speech = createSpeech(window.speechSynthesis, window.SpeechSynthesisUtterance, updateSpeech);
let revealed = false;
let route = '';
const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const accent = () => ACCENTS.find(a => a.locale === state.settings.accent);
const topicName = id => TOPICS.find(t => t.id === id)?.label ?? 'ทุกหมวดคำศัพท์';

function save() { store.save(state); updateStorageNotice(); }
function navigate(next) {
  if (location.hash === `#${next}`) render(true);
  else location.hash = next;
}
function navLinks() {
  return `<a href="#home" class="nav-link ${route !== 'settings' ? 'is-active' : ''}" ${route !== 'settings' ? 'aria-current="page"' : ''}>${icon('book')}<span>ฝึกคำศัพท์</span></a>
  <a href="#settings" class="nav-link ${route === 'settings' ? 'is-active' : ''}" ${route === 'settings' ? 'aria-current="page"' : ''}>${icon('settings')}<span>ตั้งค่า</span></a>`;
}
function shell(content) {
  return `<aside class="sidebar">
    <a class="brand" href="#home" aria-label="IELTS Daily หน้าหลัก"><span class="brand-symbol">${icon('book')}</span><span>IELTS<span class="brand-light">daily</span><small>คำเล็ก ๆ เพื่อก้าวที่ใหญ่ขึ้น</small></span></a>
    <nav class="side-nav" aria-label="เมนูหลัก">${navLinks()}</nav>
    <div class="sidebar-bottom">${icon('shield')}<p>พื้นที่ฝึกของคุณ<br><span>ความคืบหน้าเก็บในเครื่องนี้</span></p></div>
  </aside>
  <div class="workspace">
    <header class="mobile-header"><a class="brand" href="#home" aria-label="IELTS Daily หน้าหลัก"><span class="brand-symbol">${icon('book')}</span><span>IELTS<span class="brand-light">daily</span></span></a><span class="course-label" lang="en">GENERAL TRAINING</span></header>
    <div id="storage-notice" class="storage-notice" role="status" hidden></div>
    <main id="main" class="main-content ${route}-page" tabindex="-1">${content}</main>
    <footer class="page-footer"><span lang="en">A little progress, every day.</span><span>ฝึกตามจังหวะของคุณ</span></footer>
  </div>
  <nav class="mobile-nav" aria-label="เมนูมือถือ">${navLinks()}</nav>`;
}

function homeView() {
  const remembered = CARDS.filter(c => state.progress[c.id]?.remembered).length;
  const hasRound = Boolean(state.session?.queue.length);
  return `<div class="page-top"><span class="section-name">สมุดคำศัพท์ของคุณ</span><a class="accent-link" href="#settings">${icon('sound')}<span lang="en">${accent().label}</span>${icon('chevron')}</a></div>
    <div class="home-layout"><div class="home-primary">
      <section class="welcome"><h1 tabindex="-1">เก่งขึ้นทีละคำ<br><span>เริ่มที่วันนี้</span></h1><p>คำศัพท์ที่ใช้ได้จริง สำหรับ IELTS General<br class="desktop-break"> ฝึกสั้น ๆ แล้วค่อย ๆ จำได้มากขึ้น</p>
        <div class="round-meta"><span>${icon('layers')} รอบละ 10 คำ</span><span>${icon('clock')} ประมาณ 3–5 นาที</span></div>
        ${hasRound ? `<button class="button primary start-button" data-action="resume">ฝึกต่อจากเดิม <span class="button-tail">${Object.keys(state.session.answers).length}/${state.session.ids.length} คำที่ตอบแล้ว ${icon('arrow')}</span></button><p class="resume-hint">${esc(topicName(state.session.topic))} · รอบฝึกของคุณยังอยู่ที่นี่</p>` : `<button class="button primary start-button" data-action="start" data-topic="all">เริ่มฝึก 10 คำ ${icon('arrow')}</button>`}
      </section>
      <section class="topic-section" aria-labelledby="topics-heading"><div class="section-heading"><h2 id="topics-heading">เลือกหมวดที่อยากฝึก</h2><span>150 คำและวลี</span></div>
      <div class="topic-list">${TOPICS.map(topic => {
        const count = CARDS.filter(c => c.topic === topic.id && state.progress[c.id]?.remembered).length;
        return `<button class="topic-row" data-action="topic" data-topic="${topic.id}" aria-label="ฝึกหมวด ${topic.label}"><span class="topic-icon">${icon(topic.icon)}</span><span class="topic-copy"><strong>${topic.label}</strong><span lang="en">${topic.english}</span></span><span class="topic-count">${count ? `<span class="known-dot"></span>${count}/30` : '30 คำ'}</span>${icon('chevron')}</button>`;
      }).join('')}</div></section>
    </div><aside class="study-notes">
      <div class="progress-note"><div class="note-title">${icon('book')}<h2>ค่อย ๆ สะสมความคุ้นเคย</h2></div><p><strong>${remembered}</strong><span> / 150 คำที่จำได้ล่าสุด</span></p><progress max="150" value="${remembered}" aria-label="คำที่จำได้ล่าสุด">${remembered}/150</progress><small>${remembered ? 'คำที่ยังไม่คล่องจะได้ฝึกก่อนในรอบถัดไป' : 'คำแรกของคุณกำลังรออยู่ เริ่มได้เลย'}</small></div>
      <div class="how-to"><h2>ฝึกแบบนี้ จำได้มากขึ้น</h2><ol><li><strong>ลองนึกก่อนเปิด</strong><span>เห็นคำแล้วลองทายความหมายในใจ</span></li><li><strong>ฟัง แล้วพูดตาม</strong><span>กดฟังคำศัพท์และประโยคตัวอย่าง</span></li><li><strong>ตอบตามที่จำได้จริง</strong><span>คำที่ยังไม่แม่นจะวนกลับมาให้ฝึก</span></li></ol></div>
      <p class="quiet-note">ความก้าวหน้าทีละนิดก็นับเสมอ<br>ไม่ต้องจำได้ทุกคำในวันเดียว</p>
    </aside></div>
    <div id="replace-round" class="replace-round" hidden><h2>เริ่มรอบใหม่ในหมวดนี้?</h2><p>ความคืบหน้าที่ตอบแล้วจะยังอยู่ แต่รอบที่ค้างจะถูกแทนที่</p><div class="inline-actions"><button class="button secondary" data-action="keep-round">ฝึกต่อรอบเดิม</button><button class="button primary" data-action="confirm-topic">เริ่มรอบใหม่</button></div></div>`;
}

function studyView() {
  const session = state.session;
  const card = byId.get(session.queue[0]);
  const completed = session.ids.length - session.queue.length;
  const isRetry = (session.attempts[card.id] ?? 0) > 0;
  return `<div class="study-top"><a href="#home" class="text-link">${icon('pause')}<span>พักก่อน</span></a><a href="#settings" class="accent-link">${icon('sound')}<span lang="en">${accent().label}</span>${icon('chevron')}</a></div>
    <div class="study-container"><div class="session-heading"><span>${esc(topicName(session.topic))}</span><span>${completed}/${session.ids.length} คำจบรอบ</span></div><progress class="session-progress" max="${session.ids.length}" value="${completed}" aria-label="คำที่จบรอบ">${completed}/${session.ids.length}</progress>
    <article class="word-entry ${revealed ? 'is-revealed' : ''}">
      <div class="word-meta"><span>${isRetry ? 'ลองอีกครั้ง' : 'ลองนึกความหมายดู'}</span><span class="entry-number">${String(session.ids.indexOf(card.id) + 1).padStart(2, '0')} / ${String(session.ids.length).padStart(2, '0')}</span></div>
      <div class="term-line"><h1 id="term" data-testid="term" lang="en" tabindex="-1">${esc(card.term)}</h1><button class="sound-button" data-action="speak-term" aria-label="ฟังคำศัพท์">${icon('sound')}</button></div>
      <p class="word-prompt">${revealed ? 'อีกหนึ่งคำที่เอาไปใช้ได้จริง' : 'คำนี้หมายความว่าอะไร?'}</p>
      ${revealed ? `<div class="answer" data-testid="answer" id="answer-content"><span class="part-of-speech" lang="en">${esc(card.partOfSpeech)}</span><p class="definition" id="definition" data-testid="definition" lang="en" tabindex="-1">${esc(card.definitionEn)}</p><p class="thai-meaning">${esc(card.meaningTh)}</p><div class="example-block"><div class="example-heading"><h2>ลองใช้ในประโยค</h2><button class="sound-button small" data-action="speak-example" aria-label="ฟังประโยคตัวอย่าง">${icon('sound')}</button></div><p lang="en">${esc(card.exampleEn)}</p></div></div>` : `<div class="recall-space"><span class="recall-mark" aria-hidden="true">?</span><p>ให้เวลาตัวเองสักนิด<br>แล้วค่อยเปิดดูคำตอบ</p></div>`}
    </article>
    <div class="speech-status" data-testid="speech-status" data-speech-status role="status"></div>
    <div class="study-actions">${revealed ? `<p class="answer-question">เมื่อกี้คุณนึกความหมายออกไหม?</p><div class="answer-buttons"><button class="button secondary" data-action="answer" data-remembered="false">${icon('repeat')} ยังจำไม่ได้</button><button class="button primary" data-action="answer" data-remembered="true">${icon('check')} จำได้</button></div>` : `<button class="button primary reveal-button" data-action="reveal" aria-expanded="false">ดูเฉลย ${icon('arrow')}</button><p class="action-hint">ลองตอบในใจก่อน ไม่ต้องรีบ</p>`}</div>
    </div>`;
}

function summaryView() {
  const { remembered, needsPractice } = summarize(state.session);
  return `<div class="page-top"><a class="text-link" href="#home">${icon('back')} กลับหน้าหลัก</a></div><div class="summary-content"><span class="completion-symbol">${icon('check')}</span><h1 tabindex="-1">จบรอบแล้ว เก่งมาก!</h1><p class="summary-intro">อีกนิดที่คุณทำได้ในวันนี้<br>ทุกคำที่ได้ฝึกคือความก้าวหน้า</p><div class="summary-numbers"><div><strong data-testid="remembered-count">${remembered.length}</strong><span>คำที่จำได้</span></div><div><strong>${needsPractice.length}</strong><span>คำที่ฝึกต่อได้</span></div></div>
    ${needsPractice.length ? `<section class="review-words"><h2>เก็บไว้ฝึกต่ออีกนิด</h2><ul>${needsPractice.map(id => `<li><span lang="en">${esc(byId.get(id).term)}</span><span>${esc(byId.get(id).meaningTh)}</span></li>`).join('')}</ul></section>` : `<p class="round-success">${icon('check')} คุณจำได้ครบ ${state.session.ids.length} คำในรอบนี้</p>`}
    <button class="button primary" data-action="start" data-topic="${state.session.topic}">ฝึกอีก 10 คำ ${icon('arrow')}</button><a class="text-link centered" href="#home">เลือกหมวดอื่น</a></div>`;
}

function settingsView() {
  return `<div class="page-top"><a class="text-link" href="${state.session?.queue.length ? '#study' : '#home'}">${icon('back')} ${state.session?.queue.length ? 'กลับไปฝึกต่อ' : 'กลับหน้าหลัก'}</a></div><div class="settings-content"><h1 tabindex="-1">ฟังในสำเนียงที่คุ้นเคย</h1><p class="page-description">เลือกครั้งเดียว แล้วใช้กับทั้งคำศัพท์<br class="mobile-only">และประโยคตัวอย่างทุกครั้งที่กดฟัง</p>
    <fieldset class="accent-options"><legend>สำเนียงภาษาอังกฤษ</legend>${ACCENTS.map(a => `<label class="accent-option"><input type="radio" name="accent" value="${a.locale}" ${a.locale === state.settings.accent ? 'checked' : ''}><span class="accent-code" lang="en">${a.short}</span><span class="accent-description"><strong lang="en">${a.label}</strong><span>${a.region}</span><small data-voice-for="${a.locale}"></small></span><span class="radio-mark" aria-hidden="true"></span></label>`).join('')}</fieldset>
    <button class="button primary voice-preview" data-action="preview-voice">${icon('sound')} ทดลองฟังสำเนียงนี้</button><div class="speech-status" data-testid="speech-status" data-speech-status role="status"></div><div class="saved-preference" role="status" id="saved-preference"></div>
    <section class="voice-help"><h2>${icon('info')} เสียงอ่านมาจากเครื่องของคุณ</h2><p>แต่ละเครื่องมีเสียงให้ใช้ต่างกัน หากยังไม่มีสำเนียงที่เลือก ลองเพิ่มเสียงภาษาอังกฤษใน Settings ของ iPhone โดยค้นหา “Voices” แล้วกลับมาเปิดเว็บอีกครั้ง</p><p>เว็บจะไม่เปลี่ยนไปใช้สำเนียงอื่นเอง และคุณยังฝึกคำศัพท์ต่อได้แม้ไม่มีเสียง</p><button class="text-button" data-action="refresh-voices">ตรวจหาเสียงอีกครั้ง ${icon('repeat')}</button></section>
    <section class="privacy-note"><h2>${icon('shield')} สมุดคำศัพท์นี้เก็บอะไรไว้บ้าง?</h2><p>สำเนียงที่เลือก ผลการตอบ และรอบที่ค้าง เก็บไว้ในเบราว์เซอร์นี้เท่านั้น ไม่ได้ซิงก์ข้ามเครื่อง หากล้างข้อมูลเว็บไซต์ ความคืบหน้าจะหายไป</p></section></div>`;
}

function render(moveFocus = false) {
  route = location.hash.slice(1);
  if (!['home', 'study', 'summary', 'settings'].includes(route)) route = 'home';
  if (route === 'study' && !state.session?.queue.length) route = state.session ? 'summary' : 'home';
  if (route === 'summary' && (!state.session || state.session.queue.length)) route = 'home';
  document.body.dataset.route = route;
  app.innerHTML = shell(route === 'study' ? studyView() : route === 'summary' ? summaryView() : route === 'settings' ? settingsView() : homeView());
  document.title = `${({ home: 'ฝึกคำศัพท์', study: 'รอบฝึกของคุณ', settings: 'ตั้งค่าเสียงอ่าน', summary: 'สรุปรอบฝึก' })[route]} — IELTS Daily`;
  updateStorageNotice(); updateSpeech();
  if (moveFocus) { (document.querySelector('h1') ?? document.querySelector('#main')).focus({ preventScroll: true }); window.scrollTo(0, 0); }
}

function updateStorageNotice() {
  const el = document.querySelector('#storage-notice');
  if (!el) return;
  el.hidden = store.available && !store.recovered;
  el.textContent = !store.available ? 'เบราว์เซอร์นี้บันทึกข้อมูลไม่ได้ คุณยังฝึกต่อได้ แต่ความคืบหน้าจะอยู่ถึงตอนปิดหน้านี้เท่านั้น' : store.recovered ? 'ข้อมูลที่บันทึกไว้บางส่วนอ่านไม่ได้ เราเปิดสมุดให้ใหม่แล้ว คุณเริ่มฝึกต่อได้เลย' : '';
}

function updateSpeech() {
  const status = document.querySelector('[data-speech-status]');
  if (status) {
    let message = '';
    if (!speech.supported) message = 'เบราว์เซอร์นี้ไม่รองรับเสียงอ่าน คุณยังฝึกคำศัพท์ต่อได้';
    else if (!speech.has(state.settings.accent)) message = `เครื่องนี้ยังไม่มีเสียง ${accent().label} · เลือกสำเนียงอื่นหรือเพิ่มเสียงในตั้งค่าเครื่อง`;
    else if (speech.error === 'playback') message = 'เล่นเสียงไม่ได้ ลองกดฟังอีกครั้ง หรือตรวจระดับเสียงของเครื่อง';
    else if (speech.playing) message = `กำลังอ่านด้วยสำเนียง ${accent().label}…`;
    status.textContent = message;
    status.classList.toggle('has-message', Boolean(message));
  }
  for (const a of ACCENTS) {
    const el = document.querySelector(`[data-voice-for="${a.locale}"]`);
    if (el) { el.textContent = speech.has(a.locale) ? `พร้อมฟัง · ${speech.voiceName(a.locale)}` : 'ยังไม่มีเสียงสำเนียงนี้ในเครื่อง'; el.classList.toggle('voice-available', speech.has(a.locale)); }
  }
  for (const button of document.querySelectorAll('.sound-button')) button.classList.toggle('is-speaking', speech.playing);
}

let pendingTopic = null;
function start(topic) { speech.cancel(); state.session = createSession(CARDS, state.progress, topic); revealed = false; save(); navigate('study'); }

app.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const action = button.dataset.action;
  if (action === 'start') start(button.dataset.topic || 'all');
  if (action === 'resume') { revealed = false; navigate('study'); }
  if (action === 'topic') {
    if (state.session?.queue.length) {
      pendingTopic = button.dataset.topic;
      const panel = document.querySelector('#replace-round'); panel.hidden = false;
      panel.scrollIntoView({ block: 'center', behavior: 'auto' }); panel.querySelector('button').focus({ preventScroll: true });
    } else start(button.dataset.topic);
  }
  if (action === 'keep-round') { pendingTopic = null; navigate('study'); }
  if (action === 'confirm-topic' && pendingTopic) { start(pendingTopic); pendingTopic = null; }
  if (action === 'reveal' && route === 'study' && !revealed) { revealed = true; render(); document.querySelector('#definition')?.focus({ preventScroll: true }); }
  if (action === 'answer' && route === 'study' && revealed && button.isConnected) {
    speech.cancel();
    const id = state.session.queue[0]; const remembered = button.dataset.remembered === 'true';
    state.progress[id] = { remembered, seen: (state.progress[id]?.seen ?? 0) + 1 };
    state.session = answerCard(state.session, remembered); revealed = false; save();
    if (state.session.queue.length) render(true); else navigate('summary');
  }
  if (action === 'speak-term' && route === 'study') speech.speak(byId.get(state.session.queue[0]).term, state.settings.accent);
  if (action === 'speak-example' && route === 'study') speech.speak(byId.get(state.session.queue[0]).exampleEn, state.settings.accent);
  if (action === 'preview-voice') speech.speak('A little practice every day makes a difference.', state.settings.accent);
  if (action === 'refresh-voices') { speech.refresh(); updateSpeech(); }
});

app.addEventListener('change', event => {
  if (event.target.name !== 'accent') return;
  speech.cancel(); state.settings.accent = event.target.value; save(); updateSpeech();
  document.querySelector('#saved-preference').textContent = store.available ? `บันทึกสำเนียง ${accent().label} แล้ว` : `ใช้สำเนียง ${accent().label} ในหน้านี้แล้ว`;
});
document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault(); document.querySelector('#main').focus();
});
window.addEventListener('hashchange', () => { speech.cancel(); revealed = false; render(true); });
window.addEventListener('pagehide', () => speech.cancel());
window.addEventListener('focus', () => speech.refresh());
document.addEventListener('visibilitychange', () => { if (document.hidden) speech.cancel(); else speech.refresh(); });
render();
setTimeout(() => speech.refresh(), 250);
setTimeout(() => speech.refresh(), 1000);
