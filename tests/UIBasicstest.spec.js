const {test, expect} = require('@playwright/test');


test('Browser Context Playwright test', async ({browser})=>
{
    //chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const cardTitles =  page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css locators
    await userName.type("rahulshetty");
    await page.locator("#password").type("learning");

    await signIn.click();
    console.log(await page.locator("[style*='block;']").textContent());
    await expect(page.locator("[style*='block;']")).toContainText("Incorrect");
    //fill - clear existing content
    await userName.fill("");
    await userName.type("rahulshettyacademy");

    await Promise.all(
        [
            page.waitForURL(),
            signIn.click(),

        ]
    );
    
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

//dropdown menu control
test('UI Controls', async ({page})=>
{
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const dropDown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await dropDown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test('Child Window Handling', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const documentLink = page.locator("[href*='documents-request']"); 
    //switch to the new tab   
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]);
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await userName.type(domain);
    console.log(await userName.textContent());
});

//npx playwright codegen https://google.com
test('test', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await page.getByRole('button', { name: 'Accept all' }).click();
    await page.getByRole('combobox', { name: 'Search' }).click();
    await page.getByRole('combobox', { name: 'Search' }).fill('rahul shetty');
    await page.getByRole('button', { name: 'Google Search' }).first().click();
    await page.getByRole('link', { name: 'Rahul Shetty Academy: Selenium, API Testing, Software ... Rahul Shetty Academy https://rahulshettyacademy.com' }).click();
    await page.getByRole('link', { name: 'NEW All Access plan' }).click();
  });