export const ACCENTS = [
  { locale: 'en-US', label: 'American', region: 'สหรัฐอเมริกา', short: 'US' },
  { locale: 'en-GB', label: 'British', region: 'สหราชอาณาจักร', short: 'UK' },
  { locale: 'en-AU', label: 'Australian', region: 'ออสเตรเลีย', short: 'AU' },
];

export function createSpeech(engine, Utterance, onChange = () => {}) {
  const supported = Boolean(engine && Utterance);
  const getVoices = () => { try { return engine?.getVoices() ?? []; } catch { return []; } };
  let voices = getVoices();
  let generation = 0;
  let active = null;
  let playing = false;
  let error = null;
  // Prefer speech voices rather than novelty voices such as macOS Albert.
  const voiceRank = voice => /natural|neural|enhanced|premium|siri|google/i.test(voice.name) ? 0
    : /samantha|daniel|karen|serena|catherine|gordon/i.test(voice.name) ? 1 : voice.default ? 2 : 3;
  const matchingVoice = locale => voices.filter(v => v.lang.toLowerCase().replaceAll('_', '-') === locale.toLowerCase())
    .sort((a, b) => voiceRank(a) - voiceRank(b) || Number(b.localService) - Number(a.localService) || a.name.localeCompare(b.name))[0];
  const api = {
    supported,
    get playing() { return playing; },
    get error() { return error; },
    has: locale => Boolean(matchingVoice(locale)),
    voiceName: locale => matchingVoice(locale)?.name ?? '',
    refresh() {
      const next = getVoices();
      const signature = list => list.map(v => `${v.voiceURI}:${v.lang}`).join('|');
      if (signature(next) !== signature(voices)) { voices = next; onChange(); }
    },
    cancel() {
      generation++;
      if (supported) engine.cancel();
      active = null;
      playing = false;
      onChange();
    },
    speak(text, locale) {
      api.refresh();
      api.cancel();
      error = null;
      const voice = matchingVoice(locale);
      if (!supported || !voice) { error = supported ? 'unavailable' : 'unsupported'; onChange(); return false; }
      const token = generation;
      active = new Utterance(text);
      active.voice = voice;
      active.lang = locale;
      active.rate = 0.9;
      active.onstart = () => { if (token === generation) { playing = true; onChange(); } };
      active.onend = () => { if (token === generation) { playing = false; active = null; onChange(); } };
      active.onerror = () => { if (token === generation) { playing = false; error = 'playback'; active = null; onChange(); } };
      try { engine.speak(active); return true; }
      catch { error = 'playback'; playing = false; onChange(); return false; }
    },
  };
  if (supported) engine.addEventListener('voiceschanged', api.refresh);
  return api;
}
