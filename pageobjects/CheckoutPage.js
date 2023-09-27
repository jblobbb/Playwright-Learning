const { expect } = require("@playwright/test");

class CheckoutPage{

    constructor(page){
        this.page = page;
        this.month = page.locator("(//select[@class='input ddl'])[1]");
        this.year = page.locator("(//select[@class='input ddl'])[2]");
        this.securityNumber = page.locator("(//input[@type='text'])[2]");
        this.cardName = page.locator("(//input[@type='text'])[3]");
        this.country = page.locator("[placeholder*='Country']");
        this.emailID = page.locator(".user__name [type = 'text']").first();
        this.submitButton = page.locator(".action__submit");
    }

    async enterDate(month, year){
        const selectMonth = this.month;
        await selectMonth.selectOption(month);
        const selectYear = this.year;
        await selectYear.selectOption(year);
    }

    async enterSecurityNumber(securityNumber){
        await this.securityNumber.fill(securityNumber);
    }

    async enterNameOnCard(cardName){
        await this.cardName.fill(cardName);
    }

    async selectCountry(country){
        await this.country.type("uni", {delay:100});
        const dropdown = this.page.locator(".ta-results");
        await dropdown.waitFor();
        let optionsCount = await dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; i++) {
            let text = await dropdown.locator("button").nth(i).textContent();
            if(text === country){
                await dropdown.locator("button").nth(i).click();
                break;
            }      
        }
    }

    async checkUsernameIsVisable(username){
        await expect(this.emailID).toHaveText(username);
    }

    async submitPurchase(){
        await this.submitButton.click();
    }
}
export default{CheckoutPage};