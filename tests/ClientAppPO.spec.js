const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage').default;
const {DashboardPage} = require('../pageobjects/DashboardPage').default;
const {CartPage} = require('../pageobjects/CartPage').default;
const {CheckoutPage} = require('../pageobjects/CheckoutPage').default;

test.only('Demo signup test', async ({page})=> {
    //js file-Login 
    const productName = 'adidas original';
    const products = page.locator(".card-body");
    const username = "johnzoooo@gmail.com";
    const password = "Password10";
    const month = "03";
    const year = "25";
    const securityNumber = "123";
    const cardName = "Jonzo";
    const country = " United Kingdom"

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goTo();
    await loginPage.validLogin(username, password);
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();

    //wait for cart to be visible then check text is visible, select checkout
    await cartPage.checkProductIsVisable(productName);
    await cartPage.clickCheckOutButton();
    
    //enter card details
    await checkoutPage.enterDate(month, year);
    await checkoutPage.enterSecurityNumber(securityNumber);
    await checkoutPage.enterNameOnCard(cardName);
    await checkoutPage.selectCountry(country);

    //check email for login is displayed in shipping info then submit
    await expect(page.locator(".user__name label[type = 'text']")).toHaveText(username);
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