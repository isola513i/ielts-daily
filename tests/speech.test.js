import test from 'node:test';
import assert from 'node:assert/strict';
import { createSpeech } from '../web/js/speech.js';
function engine() {
  const events = {}; let voices = []; const spoken = []; const order = [];
  return { spoken, order, setVoices(v) { voices = v; events.voiceschanged?.(); },
    getVoices:() => voices, addEventListener:(e, fn) => events[e] = fn,
    cancel:() => order.push('cancel'), speak:u => { order.push('speak'); spoken.push(u); } };
}
const voice = (lang, name) => ({ lang, name, voiceURI: name, default: false, localService: true });
test('an unavailable accent never silently uses another locale', () => {
  const e = engine(); e.setVoices([voice('en-US', 'US')]);
  const speech = createSpeech(e, class {}, () => {});
  assert.equal(speech.speak('Hello', 'en-AU'), false);
  assert.equal(e.spoken.length, 0);
});
test('delayed voices become available and the selected exact voice is assigned', () => {
  const e = engine(); let updates = 0;
  const speech = createSpeech(e, class {}, () => updates++);
  assert.equal(speech.has('en-GB'), false);
  e.setVoices([voice('en-US', 'US'), voice('en-GB', 'UK')]);
  assert.equal(speech.has('en-GB'), true);
  assert.equal(speech.speak('A useful example.', 'en-GB'), true);
  assert.equal(e.spoken[0].voice.name, 'UK');
  assert.equal(e.spoken[0].lang, 'en-GB');
  assert.deepEqual(e.order.slice(-2), ['cancel', 'speak']);
  assert.ok(updates > 0);
});
test('browser without speech support is safe to use', () => {
  const speech = createSpeech(null, null, () => {});
  assert.equal(speech.supported, false);
  assert.equal(speech.speak('test', 'en-US'), false);
  speech.cancel();
});

test('prefers a conventional speaking voice over an alphabetically earlier novelty voice', () => {
  const e = engine();
  e.setVoices([voice('en-US', 'Albert'), voice('en-US', 'Samantha')]);
  const speech = createSpeech(e, class {}, () => {});
  speech.speak('A useful word.', 'en-US');
  assert.equal(e.spoken[0].voice.name, 'Samantha');
});

test('cancel notifies the interface even when the available voices do not change', () => {
  const e = engine(); e.setVoices([voice('en-US', 'Samantha')]);
  const observed = [];
  const speech = createSpeech(e, class {}, () => observed.push(speech.playing));
  speech.speak('A useful example.', 'en-US');
  e.spoken[0].onstart();
  assert.equal(observed.at(-1), true);
  speech.cancel(); speech.refresh();
  assert.equal(speech.playing, false);
  assert.equal(observed.at(-1), false);
  e.spoken[0].onend();
  assert.equal(observed.at(-1), false);
});
