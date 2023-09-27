const {LoginPage} = require('../pageobjects/LoginPage').default;
const {DashboardPage} = require('../pageobjects/DashboardPage').default;
const {CartPage} = require('../pageobjects/CartPage').default;
const {CheckoutPage} = require('../pageobjects/CheckoutPage').default;
const {OrderComplete} = require('../pageobjects/OrderComplete').default;
const {OrderHistoryPage} = require('../pageobjects/OrderHistoryPage').default;

class POManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.orderCompletePage = new OrderComplete(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getCheckoutPage(){
        return this.checkoutPage;
    }

    getOrderCompletePage(){
        return this.orderCompletePage;
    }

    getOrderHistoryPage(){
        return this.orderHistoryPage;
    }

} export default{POManager};