const { expect } = require("@playwright/test");

class OrderComplete{
    constructor(page){
        this.page = page;
        this.orderSuccess = page.locator(".hero-primary");
        this.orderNumber = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderHistoryLink = page.locator("button[routerlink*='myorders']");
    }

async checkSuccessMessage(successMessage){
    await expect(this.orderSuccess).toHaveText(successMessage);
}

async getOrderId(){
    const orderId = await this.orderNumber.textContent();
    return orderId;
}

async goToOrderHistory(){
    await this.orderHistoryLink.click();
}
    
} export default{OrderComplete};