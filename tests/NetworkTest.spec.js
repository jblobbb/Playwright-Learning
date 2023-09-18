import { test, expect, request } from '@playwright/test';
const {APIutils} = require('./utils/APIutils');

const loginPayLoad = {userEmail: "johnzoooo@gmail.com", userPassword: "Password10"};
const orderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};
const fakePayLoadOrders = {data:[],message:"No Orders"};

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

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
    async route=>{
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayLoadOrders);
        route.fulfill(
            {
                response,
                body,
            }
        )
        //intercepting the reponse - API response->fake response->browser->render data on front end
    })
    
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
    

});
