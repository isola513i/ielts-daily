import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home, settings and revealed cards pass automated accessibility checks', async ({ page }) => {
  await page.goto('./');
  const scan = async () => {
    await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))));
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations.map(v => `${v.id}: ${v.nodes.map(n => n.target).join(', ')}`)).toEqual([]);
  };
  await scan();
  await page.goto('./#settings');
  await scan();
  await page.goto('./#home');
  await page.getByRole('button', { name: 'เริ่มฝึก 10 คำ', exact: true }).click();
  await page.getByRole('button', { name: 'ดูเฉลย', exact: true }).click();
  await scan();
});

test('keyboard skip link focuses the current main content without changing routes', async ({ page }) => {
  await page.goto('./#settings');
  await page.keyboard.press('Tab');
  await page.getByRole('link', { name: 'ข้ามไปเนื้อหา' }).press('Enter');
  await expect(page).toHaveURL(/#settings$/);
  await expect(page.locator('#main')).toBeFocused();
});

test('rapid legitimate answers are accepted while duplicate taps do not skip a card', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: 'เริ่มฝึก 10 คำ', exact: true }).click();
  await expect(page.getByTestId('term')).toBeVisible();
  const answered = await page.evaluate(() => {
    for (let i = 0; i < 2; i++) {
      document.querySelector('[data-action="reveal"]').click();
      const answer = document.querySelector('[data-action="answer"][data-remembered="true"]');
      answer.click(); answer.click();
    }
    return Object.values(JSON.parse(localStorage.getItem('ieltsDaily:v1')).progress).reduce((n, item) => n + item.seen, 0);
  });
  expect(answered).toBe(2);
  await expect(page.getByRole('button', { name: 'ดูเฉลย', exact: true })).toBeVisible();
});

test('a full study round reveals answers and counts unique remembered words', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: 'เริ่มฝึก 10 คำ', exact: true }).click();
  await expect(page.getByTestId('answer')).toHaveCount(0);
  for (let i = 0; i < 10; i++) {
    await page.getByRole('button', { name: 'ดูเฉลย', exact: true }).click();
    await expect(page.getByTestId('answer')).toBeVisible();
    await expect(page.getByTestId('definition')).not.toBeEmpty();
    await page.getByRole('button', { name: 'จำได้', exact: true }).click();
  }
  await expect(page.getByRole('heading', { name: 'จบรอบแล้ว เก่งมาก!' })).toBeVisible();
  await expect(page.getByTestId('remembered-count')).toHaveText('10');
  await page.reload();
  await expect(page.getByTestId('remembered-count')).toHaveText('10');
});

test('missed cards, unfinished rounds and accent preferences survive a reload', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('link', { name: 'ตั้งค่า', exact: true }).first().click();
  await page.getByRole('radio', { name: /British/ }).check();
  await page.reload();
  await expect(page.getByRole('radio', { name: /British/ })).toBeChecked();
  await page.getByRole('link', { name: 'ฝึกคำศัพท์', exact: true }).first().click();
  await page.getByRole('button', { name: 'เริ่มฝึก 10 คำ', exact: true }).click();
  const first = await page.getByTestId('term').innerText();
  await page.getByRole('button', { name: 'ดูเฉลย', exact: true }).click();
  await page.getByRole('button', { name: 'ยังจำไม่ได้', exact: true }).click();
  const second = await page.getByTestId('term').innerText();
  expect(second).not.toBe(first);
  await page.reload();
  await expect(page.getByTestId('term')).toHaveText(second);
  await expect(page.getByTestId('answer')).toHaveCount(0);
  for (let i = 0; i < 9; i++) {
    await page.getByRole('button', { name: 'ดูเฉลย', exact: true }).click();
    await page.getByRole('button', { name: 'จำได้', exact: true }).click();
  }
  await expect(page.getByTestId('term')).toHaveText(first);
  await page.getByRole('button', { name: 'ดูเฉลย', exact: true }).click();
  await page.getByRole('button', { name: 'จำได้', exact: true }).click();
  await expect(page.getByTestId('remembered-count')).toHaveText('10');
});

test('blocked storage and missing audio keep the practice usable', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } });
    Object.defineProperty(window, 'speechSynthesis', { value: undefined });
  });
  await page.goto('./');
  await expect(page.getByRole('status').filter({ hasText: 'บันทึก' })).toBeVisible();
  await page.getByRole('button', { name: 'เริ่มฝึก 10 คำ', exact: true }).click();
  await page.getByRole('button', { name: 'ฟังคำศัพท์', exact: true }).click();
  await expect(page.getByTestId('speech-status')).toContainText('ไม่รองรับ');
  await page.getByRole('button', { name: 'ดูเฉลย', exact: true }).click();
  await page.getByRole('button', { name: 'จำได้', exact: true }).click();
  await expect(page.getByRole('button', { name: 'ดูเฉลย', exact: true })).toBeVisible();
});

test('mobile and desktop remain within the viewport and assets work under a repo path', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('button', { name: /ฝึกหมวด ที่พักอาศัย/ }).click();
  await page.getByRole('button', { name: 'ดูเฉลย', exact: true }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});
