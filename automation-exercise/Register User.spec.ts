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
 await expect(page.getByRole('link', { name: /home/i })).toBeVisible();

  // Click on 'Signup / Login' button
  await page.getByRole('link', { name: /signup.*login/i }).click();
});

test('New User Signup', async ({ page }) => {
  await page.goto('http://automationexercise.com/login');

  // Verify 'New User Signup!' is visible
  await expect(page.locator('#form')).toMatchAriaSnapshot(`- heading "New User Signup!" [level=2]`);

  // Enter name and email address
  await page.fill('input[name="name"]', 'Test User');
  const randomEmail = `test.user.${Date.now()}@example.com`;
  await page.fill('input[name="email"]', randomEmail);

  // Click 'Signup' button
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
  await page.getByRole('button', { name: /signup/i }).click();
});

test('Account information', async ({ page }) => {
  await page.goto('https://automationexercise.com/signup');

  // Verify that 'ENTER ACCOUNT INFORMATION' is visible
  await expect(page.getByText('Enter Account Information')).toBeVisible();

  //Fill details: Title, Name, Email, Password, Date of birth
  await page.getByRole('textbox', { name: 'Name *', exact: true }).click();
  await page.getByRole('textbox', { name: 'Name *', exact: true }).fill('Test User');
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('Password!');
  await page.locator('#days').selectOption('1');
  await page.locator('#months').selectOption('1');
  await page.locator('#years').selectOption('1990');

  //Select checkbox 'Sign up for our newsletter!'
  await page.locator('#form form div').filter({ hasText: 'Sign up for our newsletter!' }).click();
  await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();

  //Select checkbox 'Receive special offers from our partners!'
  await page.locator('#form form div').filter({ hasText: 'Receive special offers from our partners!' }).click();
  await page.getByRole('checkbox', { name: 'Receive special offers from' }).check();

  //Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
  await page.getByRole('textbox', { name: 'First name *' }).click();
  await page.getByRole('textbox', { name: 'First name *' }).fill('Auto');
  await page.getByRole('textbox', { name: 'Last name *' }).click();
  await page.getByRole('textbox', { name: 'Last name *', exact: true }).fill('Test');
  await page.getByRole('textbox', { name: 'Company', exact: true }).click();
  await page.getByRole('textbox', { name: 'Company', exact: true }).fill('Test');
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).click();
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('1111 test street');
  await page.getByRole('textbox', { name: 'Address 2' }).click();
  await page.getByRole('textbox', { name: 'Address 2' }).fill('apt. 1');
  await page.getByLabel('Country *').click();
  await page.getByLabel('Country *').selectOption('United States');
  await page.getByRole('textbox', { name: 'State *' }).click();
  await page.getByRole('textbox', { name: 'State *' }).fill('TN');
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).click();
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('Knoxville');
  await page.locator('#zipcode').click();
  await page.locator('#zipcode').fill('11111');
  await page.getByRole('textbox', { name: 'Mobile Number *' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('1111111111');

  //Click 'Create Account button'
  await page.getByRole('button', { name: 'Create Account' }).click();
});

test('Account Created and Delete', async ({ page }) => {
  await page.goto('https://automationexercise.com/account_created');

  //Verify that 'Account Created!' is visible
  await page.getByText('Account Created! Congratulations! Your new account has been successfully').click();

  //Click 'Continue' button
  await page.getByRole('link', { name: 'Continue' }).click();

  //Verify that 'Logged in as username' is visible;
  await expect(page.getByText('Logged in as Auto')).toBeVisible();

  //Click 'Delete Account' button
  await page.getByRole('link', { name: ' Delete Account' }).click();

  //Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
  await page.getByText('Account Deleted! Your account').click();
  await page.getByRole('link', { name: 'Continue' }).click();
  
});

