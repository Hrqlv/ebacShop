import { test, expect } from '@playwright/test';
import { EbacShopPage } from '../pages/ebacShop.page';
const faker = require('faker-br');

const email = faker.internet.email(); 
const senha = faker.internet.password(16, true, /[A-Za-z0-9]/)    


let ebacShop: any

test.describe('Realizar uma compra com sucesso', async () => {
  test.beforeEach(async ({ page }) => {
    ebacShop = new EbacShopPage(page);

    // Acessar o site
    await page.goto('/')

    // Realizar o cadastro no site antes
    await ebacShop.btnIconePerfil()
  })

  test('[Cenario 1] Realizar o cadastro', async ({ page }) => {
    await test.step('[Casos de testes 1] Realizar o cadastro com dados validos', async () => {
      await ebacShop.realizarCadastro(email, senha)
      await ebacShop.btnRegistrar()
      await ebacShop.validarInforPerfil()
    })
  })

  test('[Cenario 2] Selecionar o produto ir no carrinho e finalizar a compra', async ({ page }) => {
    await test.step('[Casos de testes 1] ir na home e selecionar o produto', async () => {
    await ebacShop.irPraHome()
    })

    await test.step('', async () => {

    })

    await test.step('', async () => {
  
  })
  });

  test('[Cenario 3] Realizar a validação de erros na tela de cadastro', async ({ page }) => {
    await test.step('[Casos de teste 1] Validar email e senha com credenciais vazias para email e senha', async () => {
      await ebacShop.btnIconePerfil()
      await ebacShop.realizarCadastro('', '')
      await ebacShop.btnRegistrar()
      await ebacShop.validarMensagemErroCadastro()

      await ebacShop.realizarCadastro('qaTest12345678@gmail.com', '')
      await ebacShop.btnRegistrar()
      await ebacShop.validarMensagemErroCadastro()
    })
  })
})

