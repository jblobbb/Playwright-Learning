const {test, expect} = require('@playwright/test');
class CartPage{

    constructor(page){
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.checkout = page.locator("text = Checkout");
    }

    async checkProductIsVisable(productName){
        await this.cartProducts.waitFor();
        const bool = this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    getProductLocator(productName){
        return this.page.locator("h3:has-text('"+productName+"')");
    }

    async clickCheckOutButton(){
        await this.checkout.click();
    }
}
export default{CartPage};