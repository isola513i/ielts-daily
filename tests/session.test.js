import test from 'node:test';
import assert from 'node:assert/strict';
import { createSession, answerCard, summarize } from '../web/js/session.js';

const cards = Array.from({ length: 18 }, (_, i) => ({ id: `w${i}`, topic: i < 12 ? 'work' : 'travel' }));
test('a round has ten unique words and prioritises words not remembered', () => {
  const progress = Object.fromEntries(cards.slice(0, 12).map(c => [c.id, { remembered: true, seen: 1 }]));
  const s = createSession(cards, progress, 'all', () => 0.5);
  assert.equal(s.ids.length, 10);
  assert.equal(new Set(s.ids).size, 10);
  assert.deepEqual(new Set(s.ids.slice(0, 6)), new Set(['w12', 'w13', 'w14', 'w15', 'w16', 'w17']));
});
test('a topic round only selects its own words and supports small decks', () => {
  assert.equal(createSession(cards, {}, 'travel').ids.length, 6);
  assert.ok(createSession(cards, {}, 'work').ids.every(id => Number(id.slice(1)) < 12));
});
test('missed words return at the tail but stop after three presentations', () => {
  let s = createSession(cards.slice(0, 2), {}, 'all', () => 0.9);
  const first = s.queue[0];
  s = answerCard(s, false);
  assert.equal(s.queue.at(-1), first);
  let n = 1;
  while (s.queue.length) { s = answerCard(s, false); n++; }
  assert.equal(n, 6);
  assert.deepEqual(Object.values(s.attempts), [3, 3]);
  assert.equal(summarize(s).needsPractice.length, 2);
});
test('remembering a retried word counts it once by its final answer', () => {
  let s = createSession(cards.slice(0, 1), {});
  const initial = structuredClone(s);
  s = answerCard(s, false);
  s = answerCard(s, true);
  assert.equal(s.queue.length, 0);
  assert.deepEqual(summarize(s), { remembered: [s.ids[0]], needsPractice: [] });
  assert.deepEqual(initial.attempts, {});
  assert.deepEqual(answerCard(s, false), s);
});
