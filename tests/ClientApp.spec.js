const {test, expect} = require('@playwright/test');

test('Demo signup test', async ({page})=> {
    
    const productName = 'adidas original';
    const products = page.locator(".card-body");
    const email = "johnzoooo@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").type("Password10");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    
    //get ADIDAS ORIGINAL
    const count = await products.count();
    for (let i = 0; i < count; i++) 
    {
        if (await products.nth(i).locator("b").textContent() === productName) {
            //add to cart
            await products.nth(i).locator("text = Add To Cart").click();
            break;
        }    
    }

    await page.locator("[routerlink*='cart']").click();

    //wait for cart to be visible then check text is visible
    await page.locator("div li").first().waitFor();
    const bool = page.locator("h3:has-text('adidas original')").isVisible();
    expect(bool).toBeTruthy();

    //select checkout and enter card details
    await page.locator("text = Checkout").click();
    const month = page.locator("(//select[@class='input ddl'])[1]");
    await month.selectOption("03");
    const year = page.locator("(//select[@class='input ddl'])[2]");
    await year.selectOption("25");
    await page.locator("(//input[@type='text'])[2]").fill("123");
    await page.locator("(//input[@type='text'])[3]").fill("Jonzo");

    //select country from dropdown
    await page.locator("[placeholder*='Country']").type("uni", {delay:100});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    let optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; i++) {
        let text = await dropdown.locator("button").nth(i).textContent();
        if(text === " United Kingdom"){
            await dropdown.locator("button").nth(i).click();
            break;
        }      
    }

    //check email for login is displayed in shipping info then submit
    await expect(page.locator(".user__name label[type = 'text']")).toHaveText(email);
    await page.locator(".action__submit").click();

    //check order is complete text and get order number
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    //open the orders page, find the matching orderId then click view
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    
    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});