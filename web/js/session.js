function shuffle(items, random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function createSession(cards, progress = {}, topic = 'all', random = Math.random) {
  const pool = cards.filter(card => topic === 'all' || card.topic === topic);
  const practice = shuffle(pool.filter(c => progress[c.id]?.remembered !== true), random);
  const known = shuffle(pool.filter(c => progress[c.id]?.remembered === true), random);
  const ids = [...practice, ...known].slice(0, 10).map(c => c.id);
  return { topic, ids, queue: [...ids], attempts: {}, answers: {} };
}

export function answerCard(session, remembered) {
  if (!session.queue.length) return session;
  const [id, ...queue] = session.queue;
  const attempts = { ...session.attempts, [id]: (session.attempts[id] ?? 0) + 1 };
  if (!remembered && attempts[id] < 3) queue.push(id);
  return { ...session, queue, attempts, answers: { ...session.answers, [id]: Boolean(remembered) } };
}

export function summarize(session) {
  return {
    remembered: session.ids.filter(id => session.answers[id] === true),
    needsPractice: session.ids.filter(id => session.answers[id] === false),
  };
}
