const {test, expect} = require('@playwright/test');

test("Popup Validations", async({page})=>
{
    //hide and show exercise
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //popup handling
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    //mouse hover
    await page.locator("#mousehover").hover();
    
    //iframes
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);


})