import { test, expect } from '@playwright/test';
import { EbacShopPage } from '../pages/ebacShop.page';


let ebacShop: any

test.describe('', async () => {
  test.beforeEach(async ({ page }) => {
    ebacShop = new EbacShopPage(page);
    await page.goto('/')
  })

  test('', async ({ page }) => {
    await test.step('', async () => {
    
    })

    await test.step('', async () => {

    })

    await test.step('', async () => {
  
  })
  });
})

