import { test, expect } from '@playwright/test';

test('HomePage: "Try Testmo Free" button opens trial signup window', async ({ page }) => {
  // Go to Testmo homepage
  await page.goto('https://www.testmo.com/');

  // Accept cookies if the banner appears
  const acceptButton = page.getByRole('button', { name: 'Accept all' });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Click the "Try Testmo Free" button and wait for the new page to open
  const newPagePromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Try Testmo Free', exact: true }).click();
  const newPage = await newPagePromise;

  // Assert that the new page has the correct URL
  await expect(newPage).toHaveURL(/trial/);
});