import { expect, browser, $ } from '@wdio/globals'

describe('My First Test', () => {
        it('Test 1 - Perform Login', async () => {
        await browser.url(process.env.BASE_URL)
        await $('#user-name').setValue(process.env.USER_NAME)
        await $('#password').setValue(process.env.USER_PASSWORD)
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
        const Product = await $ ('.inventory_item_name')
        await expect(Product).toHaveText( itemTitleText )
        const Remove_item = await $('button[id="remove-sauce-labs-backpack"]')
        await Remove_item.click()
        const shoppingCartBadgeContainer = await $('.shopping_cart_link');
        await expect(shoppingCartBadgeContainer).toHaveChildren({ eq: 0 });

    })

})