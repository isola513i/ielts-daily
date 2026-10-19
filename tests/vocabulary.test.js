import test from 'node:test';
import assert from 'node:assert/strict';
import { CARDS, TOPICS } from '../web/js/vocabulary.js';

test('the starter deck has 150 complete unique senses, 30 per topic', () => {
  assert.equal(CARDS.length, 150);
  assert.equal(new Set(CARDS.map(c => c.id)).size, 150);
  assert.equal(new Set(CARDS.map(c => c.term.toLowerCase())).size, 150);
  for (const topic of TOPICS) assert.equal(CARDS.filter(c => c.topic === topic.id).length, 30);
  for (const card of CARDS) {
    for (const key of ['id', 'topic', 'term', 'partOfSpeech', 'definitionEn', 'meaningTh', 'exampleEn']) assert.ok(card[key]?.trim(), `${card.id}: missing ${key}`);
    assert.match(card.meaningTh, /[ก-๙]/);
    assert.ok(card.exampleEn.split(' ').length >= 5, `${card.id}: example too short`);
  }
});
