import { test, expect } from '@playwright/test';
import { EbacShopPage } from '../pages/ebacShop.page';
const faker = require('faker-br');

const email = faker.internet.email(); 
const senha = faker.internet.password(16, true, /[A-Za-z0-9]/)    
const primeiroNome = faker.name.firstName()
const segundoNome = faker.name.lastName()
const companyName = faker.company.companyName()
const endereco1 = faker.address.streetAddress()
const endereco2 = faker.address.secondaryAddress()
const cidade = faker.address.city()
const cep = faker.address.zipCode('#####-###') 
const telefone = faker.phone.phoneNumber('## #####-####')

let ebacShop: any

test.describe('Realizar uma compra com sucesso de fluxo positivo e também realizar as validaçoes de erro fluxo negativo / alternativo', async () => {
  test.beforeEach(async ({ page }) => {
    ebacShop = new EbacShopPage(page);

    // Acessar o site
    await page.goto('/')
    
    // Realizar o cadastro no site antes
    await ebacShop.btnIconePerfil()
  })

  test.describe('Realizar o fluxo positivo de sucesso', async () => {
    test.beforeEach(async ({ page }) => {
      await ebacShop.realizarCadastro(email, senha)
      await ebacShop.btnRegistrar()
    })
    test('[Cenario 1] Validar as informaçoes após realizar o cadastro', async ({ page }) => {
      await test.step('[Casos de teste 1] Validar as informaçoes de perfil', async () => {
        await ebacShop.validarInforPerfil()
      })
    })
  
    test('[Cenario 2] Selecionar o produto ir no carrinho e finalizar a compra', async ({ page }) => {
      await test.step('[Casos de teste 1] ir pra home', async () => {
       await ebacShop.irPraHome()
      })
  
      await test.step('[Casos de teste 2] Selecionar um produto e validar as informaçoes do produto selecionado', async () => {
       await ebacShop.selecionarAlgumProduto()
       await ebacShop.validarInfoProdutoSelecionado()
      })
  
      await test.step('[Casos de teste 3] Escolher o tamanho e a cor do produto', async () => {
        await ebacShop.escolherTamanhoDoProduto()
        await ebacShop.escolherCorDoProduto()
    })
  
      await test.step('[Casos de teste 4] Clicar no botao para comprar o produto e em sequida ver carrinho', async () => {
        await ebacShop.btnComprar()
        await ebacShop.verCarrinho()
        await ebacShop.validarInfoVerCarrinho()
      })

      await test.step('[Casos de teste 5] Finalizar a compra', async () => {
        await ebacShop.btnConcluirCompra()
      })

      await test.step('[Casos de teste 6] Colocar as informaçoes da checkout', async () => {
        await ebacShop.infoCheckout(primeiroNome, segundoNome, companyName,
          endereco1, endereco2,
          cidade, cep, telefone, email
        )
      })

      await test.step('[Casos de teste 7] Validar mensagem final que é a de pedido finalizado', async () => {
        await ebacShop.validarInfoFinal()
      })
    });
  })

  test.describe('Realizar fluxo negativo / erros', async () => {
    test('[Cenario 3] Realizar a validação de erros na tela de cadastro', async ({ page }) => {
      await test.step('[Casos de teste 1] Validar email e senha com credenciais vazias para email e senha', async () => {
        await ebacShop.realizarCadastro('', '')
        await ebacShop.btnRegistrar()
        await ebacShop.validarMensagemErroCadastro()
  
        await ebacShop.realizarCadastro('qaTest12345678@gmail.com', '')
        await ebacShop.btnRegistrar()
        await ebacShop.validarMensagemErroCadastro()
      })
    })
  })
})

