import { test, expect, request } from '@playwright/test';
const {APIutils} = require('./utils/APIutils');

const loginPayLoad = {userEmail: "johnzoooo@gmail.com", userPassword: "Password10"};
const orderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]}

let response;

test.beforeAll( async ()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APIutils(apiContext, loginPayLoad);
   response = await apiUtils.createOrder(orderPayLoad);
});


test('Place the order', async ({page})=> { 
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");

    //open the orders page, find the matching orderId then click view
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    
    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});

//Verify if order created is showing in history page
//precondition - create order