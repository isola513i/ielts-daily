import { chromium, webkit, devices } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('.impeccable/review', { recursive: true });
for (const [name, engine, options] of [
  ['mobile', webkit, { ...devices['iPhone 13'], deviceScaleFactor: 1 }],
  ['desktop', chromium, { viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 }],
]) {
  const browser = await engine.launch();
  const context = await browser.newContext({ ...options, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `.impeccable/review/${name}.png`, fullPage: true });
  await page.getByRole('button', { name: 'เริ่มฝึก 10 คำ', exact: true }).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `.impeccable/review/${name}-study.png`, fullPage: true });
  await page.getByRole('button', { name: 'ดูเฉลย', exact: true }).click();
  await page.screenshot({ path: `.impeccable/review/${name}-answer.png`, fullPage: true });
  await page.goto('http://127.0.0.1:4173/#settings');
  await page.screenshot({ path: `.impeccable/review/${name}-settings.png`, fullPage: true });
  await page.goto('http://127.0.0.1:4173/#study');
  const reviewTerms = new Set();
  let presentations = 0;
  while (await page.getByRole('button', { name: 'ดูเฉลย', exact: true }).count()) {
    const term = await page.getByTestId('term').innerText();
    if (presentations < 3) reviewTerms.add(term);
    await page.getByRole('button', { name: 'ดูเฉลย', exact: true }).click();
    await page.getByRole('button', { name: reviewTerms.has(term) ? 'ยังจำไม่ได้' : 'จำได้', exact: true }).click();
    presentations++;
    if (presentations > 30) throw new Error('Round did not finish');
  }
  await page.getByRole('heading', { name: 'จบรอบแล้ว เก่งมาก!' }).waitFor();
  await page.screenshot({ path: `.impeccable/review/${name}-summary.png`, fullPage: true });
  console.log(`${name}: captures ready`);
  await browser.close();
}
