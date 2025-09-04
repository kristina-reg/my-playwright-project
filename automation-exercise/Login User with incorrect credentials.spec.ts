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
  await page.getByRole('link', { name: /home/i }).click();

  // Click on 'Signup / Login' button
  await page.getByRole('link', { name: /signup.*login/i }).click();
});

test('Login', async ({ page }) => {
  await page.goto('https://automationexercise.com/login');

  // Verify 'Login to your account' is visible
  await expect(page.locator('#form')).toContainText('Login to your account');

  //Enter incorrect email address and password
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('email@email.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password');

  //Click 'login' button
  await page.getByRole('button', { name: 'Login' }).click();

  //Verify error 'Your email or password is incorrect!' is visible
  await expect(page.locator('#form')).toMatchAriaSnapshot(`- paragraph: Your email or password is incorrect!`);
});
