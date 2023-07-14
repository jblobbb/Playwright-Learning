import { test, expect, request } from '@playwright/test';

const loginPayLoad = {userEmail: "johnzoooo@gmail.com", userPassword: "Password10"};
const orderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6262e990e26b7e1a10e89bfa"}]}

let token;
let orderId;


test.beforeAll( async ()=>
{
   //login using API request
   const apiContext = await request.newContext();
   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data:loginPayLoad});
   expect(( loginResponse).ok).toBeTruthy();
   const loginResponseJson = await loginResponse.json();
   token = loginResponseJson.token;
   console.log(token);

   //create order API
   const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
    data : orderPayLoad,
    headers : {
        'Authorization' : token,
        'Content-Type' : 'application/json'
    },
   });
   const orderResponseJson = await orderResponse.json();
   console.log(orderResponseJson);
   orderId = orderResponseJson.orders[0];
});


test('Place the order', async ({page})=> { 
    
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");

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
    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

//Verify if order created is showing in history page
//precondition - create order