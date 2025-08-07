import { test, expect } from '@playwright/test';

test('Page loads and has title', async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  // Expect a title "to contain" a substring.
  await expect(page.locator('#header')).toMatchAriaSnapshot(`
    - link "Website for automation practice":
      - /url: /
      - img "Website for automation practice"
    `);

  // Verify that home page is visible successfully
  await expect(page.getByRole('link', { name: ' Home' })).toBeVisible();

  // Click on 'Signup / Login' button
  await page.getByRole('link', { name: ' Signup / Login' }).click();
});

test('Login and Delete account', async ({ page }) => {
  await page.goto('https://automationexercise.com/login');

  // Verify 'Login to your account' is visible
  await expect(page.locator('#form')).toContainText('Login to your account');

  //Enter correct email address and password
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('autotest123@email.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Password1');

  //Click 'Login' button
  await page.getByRole('button', { name: 'Login' }).click();

  //Verify that 'Logged in as username' is visible
  await expect(page.getByText('Logged in as Auto')).toBeVisible();

  //Click 'Delete Account' button
 // await page.getByRole('link', { name: ' Delete Account' }).click();

  //Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
//  await page.getByText('Account Deleted! Your account').click();
 // await page.getByRole('link', { name: 'Continue' }).click();
});

