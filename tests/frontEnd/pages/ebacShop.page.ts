import { expect, type Page } from '@playwright/test';

export class EbacShopPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async irPraHome() {
        await this.page.locator('a[href="http://lojaebac.ebaconline.art.br"]').click()
    }

    async btnIconePerfil() {
        await this.page.locator('a[title="Login"]').nth(1).click()
    } 

    async realizarCadastro(email: string, password: string) {
        await this.page.locator('input[id="reg_email"]').fill(email)
        await this.page.locator('input[id="reg_password"]').fill(password)
    }

    async btnRegistrar() {
        await this.page.locator('input[name="register"]').click()
    }

    async validarInforPerfil() {
        await expect(this.page.locator('h1[class="page-title"]')).toBeVisible()
        await expect(this.page.locator('div[class="woocommerce-MyAccount-content"]')).toBeVisible()
    }

    async validarMensagemErroCadastro() {
        await expect(this.page.locator('ul[role="alert"]')).toBeVisible()
    }
}
