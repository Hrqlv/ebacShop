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

    async selecionarAlgumProduto() {
        await this.page.locator('div[class="product-block grid"]').nth(0).click()
    }

    async validarInfoProdutoSelecionado() {
        await expect(this.page.locator('h1[class="product_title entry-title"]')).toBeVisible({  timeout: 5000 })
        await expect(this.page.locator('div[class="woocommerce-product-details__short-description"]')).toBeVisible({  timeout: 5000 })
        await expect(this.page.locator('div[id="tab-description"]')).toBeVisible({ timeout: 5000 })
    }

    async escolherTamanhoDoProduto() {
        await this.page.locator('ul[data-attribute_name="attribute_size"] li').filter({ hasText: 'M' }).click()
    }

    async escolherCorDoProduto() {
        await this.page.locator('ul[data-attribute_name="attribute_color"] li').filter({ hasText: 'Orange' }).click()
    }

    async btnComprar() {
        await this.page.locator('button[class*="single_add_to_cart_button"]').filter({ hasText: 'Comprar' }).click()
    }

    async verCarrinho() {
        await this.page.locator('a[class="button wc-forward"]').filter({ hasText: 'Ver carrinho' }).click()
    }

    async validarInfoVerCarrinho() {
        await expect(this.page.locator('h1[class="page-title"]').filter({ hasText: 'Carrinho' })).toBeVisible()
        await expect(this.page.locator('h2').filter({ hasText: 'Total no carrinho' })).toBeVisible()
    }

    async btnConcluirCompra() {
        await this.page.locator('a[class*="checkout-button"]').filter({ hasText: 'Concluir compra' }).click()
    }

    async infoCheckout(primeiroNome: string, segundoNome: string, companyName: string, endereco1: string, endereco2: string, cidade: string, cep: string, telefone: string, email: string) {
        await this.page.locator('input[id="billing_first_name"]').fill(primeiroNome)
        await this.page.locator('input[id="billing_last_name"]').fill(segundoNome)
        await this.page.locator('input[id="billing_company"]').fill(companyName)
        await this.page.locator('input[id="billing_address_1"]').fill(endereco1)
        await this.page.locator('input[id="billing_address_2"]').fill(endereco2)
        await this.page.locator('input[id="billing_city"]').fill(cidade)
        await this.page.locator('input[id="billing_postcode"]').fill(cep)
        await this.page.locator('input[id="billing_phone"]').fill(telefone)
        await this.page.locator('input[id="billing_email"]').fill(email)
        await this.page.locator('input[id="terms"]').click()
        await this.page.locator('input[id="place_order"]').click()
    }

    async validarInfoFinal() {
        await expect(this.page.locator('h1[class="page-title"]')).toBeVisible()
    }
}
