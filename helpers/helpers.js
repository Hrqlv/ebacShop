const faker = require('faker-br');

export function criarUsuario() {
    const email = faker.internet.email(); 
    const senha = faker.internet.password(16, true, /[A-Za-z0-9]/)    
  
    return {
        email,
        senha,
    };
}

export function dadosCheckout() {
    const primeiroNome = faker.name.firstName()
    const segundoNome = faker.name.lastName()
    const companyName = faker.company.companyName()
    const endereco1 = faker.address.streetAddress()
    const endereco2 = faker.address.secondaryAddress()
    const cidade = faker.address.city()
    const cep = faker.address.zipCode('#####-###') 
    const telefone = faker.phone.phoneNumber('## #####-####') 

    return {
        primeiroNome,
        segundoNome,
        companyName,
        endereco1,
        endereco2,
        cidade,
        cep,
        telefone
    }

}
