const { expect } = require("@playwright/test");

class OrderHistoryPage{

    constructor(page){
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderdIdDetails = page.locator(".col-text");
    }

    async confirmCorrectOrderId(orderId){
        await this.ordersTable.waitFor();
        const rows = await this.rows;
        
        for (let i = 0; i < await rows.count(); i++) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
    
        const orderIdDetails = await this.orderdIdDetails.textContent();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();
    }

} export default{OrderHistoryPage};