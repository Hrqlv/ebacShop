import { test, expect } from '@playwright/test';
import { EbacShopPage } from '../pages/ebacShop.page';
import { criarUsuario } from '../../../helpers/helpers';
import { dadosCheckout } from '../../../helpers/helpers';

let ebacShop: any
let usuarioCadastro = criarUsuario();
let usuarioCheckout = dadosCheckout()

test.describe('Realizar uma compra com sucesso de fluxo positivo e também realizar as validaçoes de erro fluxo negativo / alternativo @CI', async () => {
  test.beforeEach(async ({ page }) => {
    ebacShop = new EbacShopPage(page);

    // Acessar o site
    await page.goto('/')
    
    // Realizar o cadastro no site antes
    await ebacShop.btnIconePerfil()
  })

  test.describe('[Objetivo do teste] Realizar o fluxo positivo de sucesso', async () => {
    test.beforeEach(async ({ page }) => {
      await ebacShop.realizarCadastro(usuarioCadastro.email, usuarioCadastro.senha)
      await ebacShop.btnRegistrar()
    })

    // CENÁRIO 1
    test('[Cenario 1] Validar as informaçoes após realizar o cadastro', async ({ page }) => {
      await test.step('[Casos de teste 1] Validar as informaçoes de perfil', async () => {
        await ebacShop.validarInforPerfil()
      })
    })
    
    // CENÁRIO 2
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
        await ebacShop.infoCheckout(usuarioCheckout.primeiroNome, usuarioCheckout.segundoNome, usuarioCheckout.companyName,
          usuarioCheckout.endereco1, usuarioCheckout.endereco2,
          usuarioCheckout.cidade, usuarioCheckout.cep, usuarioCheckout.telefone, usuarioCheckout.email
        )
        await ebacShop.btnFinalizarCompra()
      })

      await test.step('[Casos de teste 7] Validar mensagem final que é a de pedido finalizado', async () => {
        await ebacShop.validarInfoFinal()
      })
    });
  })

  test.describe('[Objetivo do teste] Realizar fluxo negativo / erros', async () => {

    // CENÁRIO 3
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

    // CENÁRIO 4
    test('[Cenario 4] Realizar a validação de erros na tela de checkout', async ({ page }) => {
      await test.step('[Casos de teste 1] Validar mensagens de erros / campos obrigatórios', async () => {

        // Realizar o cadastro e a compra antes
        await ebacShop.realizarCadastro(usuarioCadastro.email, usuarioCadastro.senha)
        await ebacShop.btnRegistrar()
        await ebacShop.validarInforPerfil()
        await ebacShop.irPraHome()
        await ebacShop.selecionarAlgumProduto()
        await ebacShop.validarInfoProdutoSelecionado()
        await ebacShop.escolherTamanhoDoProduto()
        await ebacShop.escolherCorDoProduto()
        await ebacShop.btnComprar()
        await ebacShop.verCarrinho()
        await ebacShop.validarInfoVerCarrinho()
        await ebacShop.btnConcluirCompra()
        await ebacShop.btnFinalizarCompra()

        // Validar mensagens de erro da checkout
       await ebacShop.validarMensagemErroCheckout()
      })
    })
  })
})

