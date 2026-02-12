const { Builder, By, until } = require('selenium-webdriver');
const path = require('path');

(async function testeCompleto() {

    let driver = await new Builder().forBrowser('chrome').build();

    try {

        // Caminho do login.html (sobe uma pasta)
        const loginPath = 'file://' + path.resolve(__dirname, '../login.html');


        // Abre login
        await driver.get(loginPath);

        await driver.findElement(By.id('matricula')).sendKeys('12345678900');


        // Espera o campo nome aparecer
        await driver.wait(until.elementLocated(By.id('nome')), 10000);

        // Digita nome
        await driver.findElement(By.id('nome')).sendKeys('Miguel Teste');

        // Clica no botão iniciar
        await driver.findElement(By.css('button.start-btn')).click();

        // Espera carregar a questão 1
        await driver.wait(until.elementLocated(By.id('q-options')), 10000);

    


        console.log("Entrou na prova!");

        // Marca a alternativa C da questão 1 (índice 2)
        const alternativas = await driver.findElements(By.css('input[name="opt"]'));
        await alternativas[2].click();

        console.log("Alternativa marcada!");

        // Clica em Finalizar Prova
        await driver.findElement(By.css('.finish-btn')).click();

        // Confirma o alert
        await driver.switchTo().alert().accept();

        console.log("Prova finalizada!");

    } catch (erro) {
        console.error("Erro:", erro);
    }

})();
