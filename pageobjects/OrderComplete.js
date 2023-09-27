const { expect } = require("@playwright/test");

class OrderComplete{
    constructor(page){
        this.page = page;
        this.orderSuccess = page.locator(".hero-primary");

    }

async checkSuccessMessage(successMessage){
    await expect(this.orderSuccess).toHaveText(successMessage);
}

    
} export default{OrderComplete};