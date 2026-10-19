import test from 'node:test';
import assert from 'node:assert/strict';
import { createStore } from '../web/js/storage.js';
import { createSession, answerCard } from '../web/js/session.js';
const ids = ['a', 'b'];
function memory() { const values = new Map(); return { getItem:k => values.get(k) ?? null, setItem:(k,v) => values.set(k,v) }; }
test('persists accent, latest answers and the exact unfinished queue', () => {
  const disk = memory(); const store = createStore(() => disk, ids);
  const state = store.load();
  state.settings.accent = 'en-AU';
  state.progress.a = { remembered: false, seen: 1 };
  state.session = answerCard(createSession(ids.map(id => ({ id, topic: 'work' })), {}), false);
  assert.equal(store.save(state), true);
  assert.deepEqual(createStore(() => disk, ids).load(), state);
});
test('malformed JSON recovers to a usable state', () => {
  const store = createStore(() => ({ getItem:() => '{broken', setItem:() => {} }), ids);
  assert.equal(store.load().settings.accent, 'en-US');
  assert.equal(store.recovered, true);
});
test('rejects invalid persisted session while keeping valid preferences', () => {
  const disk = memory();
  disk.setItem('ieltsDaily:v1', JSON.stringify({ version: 1, settings: { accent: 'en-GB' }, progress: {}, session: { ids: ['a'], queue: ['a', 'a'], topic: 'all', attempts: {}, answers: {} } }));
  const store = createStore(() => disk, ids);
  assert.equal(store.load().settings.accent, 'en-GB');
  assert.equal(store.load().session, null);
});
test('unavailable storage continues in memory without claiming the data was saved', () => {
  const store = createStore(() => { throw new Error('blocked'); }, ids);
  const state = store.load(); state.settings.accent = 'en-GB';
  assert.equal(store.save(state), false);
  assert.equal(store.available, false);
  assert.equal(store.load().settings.accent, 'en-GB');
});
