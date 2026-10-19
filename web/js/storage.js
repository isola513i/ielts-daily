const KEY = 'ieltsDaily:v1';
const ACCENTS = new Set(['en-US', 'en-GB', 'en-AU']);
const TOPICS = new Set(['all', 'daily', 'work', 'home', 'travel', 'study']);
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const fresh = () => ({ version: 1, settings: { accent: 'en-US' }, progress: {}, session: null });
const copy = value => structuredClone(value);

function validateSession(value, validIds) {
  if (!object(value) || !TOPICS.has(value.topic) || !Array.isArray(value.ids) || !Array.isArray(value.queue)) return null;
  const { ids, queue, attempts, answers } = value;
  if (!ids.length || ids.length > 10 || new Set(ids).size !== ids.length || ids.some(id => !validIds.has(id))) return null;
  if (new Set(queue).size !== queue.length || queue.some(id => !ids.includes(id)) || !object(attempts) || !object(answers)) return null;
  if (Object.keys(attempts).some(id => !ids.includes(id)) || Object.keys(answers).some(id => !ids.includes(id))) return null;
  for (const id of ids) {
    const count = attempts[id] ?? 0;
    if (!Number.isInteger(count) || count < 0 || count > 3) return null;
    if ((count > 0 && typeof answers[id] !== 'boolean') || (count === 0 && Object.hasOwn(answers, id))) return null;
    const shouldBeQueued = count === 0 || (answers[id] === false && count < 3);
    if (queue.includes(id) !== shouldBeQueued) return null;
  }
  return { topic: value.topic, ids: [...ids], queue: [...queue], attempts: { ...attempts }, answers: { ...answers } };
}

export function createStore(getStorage, cardIds) {
  const validIds = new Set(cardIds);
  let snapshot = fresh();
  let available = true;
  let recovered = false;
  return {
    get available() { return available; },
    get recovered() { return recovered; },
    load() {
      try {
        const raw = getStorage().getItem(KEY);
        if (raw === null) return copy(snapshot);
        const data = JSON.parse(raw);
        if (!object(data) || data.version !== 1) throw new Error('Invalid saved data');
        const state = fresh();
        if (ACCENTS.has(data.settings?.accent)) state.settings.accent = data.settings.accent;
        if (object(data.progress)) {
          for (const [id, entry] of Object.entries(data.progress)) {
            if (validIds.has(id) && object(entry) && typeof entry.remembered === 'boolean' && Number.isInteger(entry.seen) && entry.seen > 0) {
              state.progress[id] = { remembered: entry.remembered, seen: entry.seen };
            }
          }
        }
        state.session = validateSession(data.session, validIds);
        if (data.session && !state.session) recovered = true;
        snapshot = state;
      } catch (error) {
        if (error instanceof SyntaxError || error.message === 'Invalid saved data') { recovered = true; snapshot = fresh(); }
        else available = false;
      }
      return copy(snapshot);
    },
    save(state) {
      snapshot = copy(state);
      try { getStorage().setItem(KEY, JSON.stringify(snapshot)); available = true; return true; }
      catch { available = false; return false; }
    },
  };
}
