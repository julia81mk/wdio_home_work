import { expect, browser, $ } from '@wdio/globals'

/*describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url(`https://the-internet.herokuapp.com/login`)

        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveTextContaining(
            'You logged into a secure area!')
    })
})*/

describe('My First Test', () => {
    /*it(' Test 1 - Perform Login', async () => {
        let myUrl = 'https://www.saucedemo.com/';
        await browser.url(myUrl)
        //await browser.pause(2000)
        //await expect(browser).toHaveUrl('WWWWWWaucedemo.com')
        

        await $('#user-name').setValue('standard_user')
        await $('#password').setValue('secret_sauce')
        //await $('button[type="submit"]').click()
        await $('#login-button').click()
        await browser.pause(2000)

        const productEl = await $('.header_secondary_container>span') 
        await expect(productEl).toHaveText('Products')

        const shoppCard = await $('#shopping_cart_container>a') 
        await expect(shoppCard).toExist()

        const itemsAmount = await $$('.inventory_item');
        await expect(itemsAmount).toBeElementsArrayOfSize({ gte: 1 }); */
    it('Test 1 - Perform Login', async () => {
        await browser.url('https://www.saucedemo.com/')
        await $('#user-name').setValue('standard_user')
        await $('#password').setValue('secret_sauce')
        await $('#login-button').click()

        const productEl = await $('.header_secondary_container>span')
        await expect(productEl).toHaveText('Products')

        const shoppCard = await $('#shopping_cart_container>a')
        await expect(shoppCard).toExist()

        const itemsAmount = await $$('.inventory_item');
        await expect(itemsAmount).toBeElementsArrayOfSize({ gte: 1 });
    })

    it('Test 2 - Add product to the cart', async () => {
        const firstItem = await $('.inventory_item');
        const itemTitle = await firstItem.$('.inventory_item_name');
        const itemTitleText = await itemTitle.getText();
        console.log('----------- itemTitleText: ', itemTitleText);

        const addCard = await $('button[id="add-to-cart-sauce-labs-backpack"]')
        await addCard.click()
        await browser.pause(2000)
        const shoppCard = await $('.shopping_cart_link>.shopping_cart_badge')

        await expect(shoppCard).toHaveText("1")
        const CardLink = await $('.shopping_cart_link')
        await CardLink.click()
        //await browser.pause(2000)
        //const Product = await $('#item_4_title_link>.inventory_item_name')
        const Product = await $ ('.inventory_item_name')
        //await expect(Product).toHaveText("Sauce Labs Backpack")
        await expect(Product).toHaveText( itemTitleText )
        //await expect(Product).toHaveText({containing: itemTitleText })???
        const Remove_item = await $('button[id="remove-sauce-labs-backpack"]')
        await Remove_item.click()
        const shoppingCartBadgeContainer = await $('.shopping_cart_link');
        await expect(shoppingCartBadgeContainer).toHaveChildren({ eq: 0 });

    })

})