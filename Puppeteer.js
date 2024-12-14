import puppeteer from 'puppeteer';

// var puppeteer = require('puppeteer')

const Usuario_personal = '_augusto_11';
const Pass_personal = '';
const LogIn_url = 'https://www.instagram.com/accounts/login/';
const User_url = 'https://www.instagram.com/liliiiiiim.ok';

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto(LogIn_url);

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    //   espero a que exista el elemento
    await page
        .locator('::-p-xpath(/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div/section/main/div/div/div[1]/div[2]/div/form/div/div[1]/div/label/input)')
        .wait();

    // hago click en el input de usuario
    await page
        .locator('::-p-xpath(/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div/section/main/div/div/div[1]/div[2]/div/form/div/div[1]/div/label/input)')
        .click();
    // escrivo con el usuario
    await page
        .locator('::-p-xpath(/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div/section/main/div/div/div[1]/div[2]/div/form/div/div[1]/div/label/input)')
        .fill(Usuario_personal);

    // hago click en al input de contraseña
    await page
        .locator('::-p-xpath(/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div/section/main/div/div/div[1]/div[2]/div/form/div/div[2]/div/label/input)')
        .click();
    // relleno con la contraseña
    await page
        .locator('::-p-xpath(/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div/section/main/div/div/div[1]/div[2]/div/form/div/div[2]/div/label/input)')
        .fill(Pass_personal);

    // hago click en "ingresar"
    await page
        .locator('::-p-xpath(/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div/section/main/div/div/div[1]/div[2]/div/form/div/div[3]/button)')
        .click();

    // Espero a que exista el logo de instagram
    await page
        .locator('::-p-xpath(/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div/div/div/div/div[2]/div[1]/div/span/div/a)')
        .wait();

    await page
        .locator('::-p-xpath(/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div/div/div/div/div[2]/div[1]/div/span/div/a)')
        .click();


    // voy a la paguina del perfil
    await page.goto(User_url, { waitUntil: 'domcontentloaded' });

    //   espero a que exista el elemento
    await page
        .locator('::-p-xpath(/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[4]/div/div[1]/span)')
        .wait();

    // guardo el nombre de la persona
    const Nombre = await page.$eval
        (
            '::-p-xpath(/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[4]/div/div[1]/span)',
            element => element.textContent
        )
    console.log(Nombre)


    const followers = await page.$eval
        (
            '::-p-xpath(/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[2]/div/a/span/span)',
            element => element.textContent
        )
    console.log(followers)

    await page.locator('::-p-xpath(/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[2]/div/a/span/span)').click()

    //   espero a que exista el elemento
    await page
        .locator('._ap3a._aaco._aacw._aacx._aad7._aade')
        .wait();

    const kk = await page.$eval
        (
            '._ap3a._aaco._aacw._aacx._aad7._aade',
            element => element.textContent
        )
    console.log(kk)

    const ventana = await page.locator('::-p-xpath(/html/body/div[5]/div[2]/div/div/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div[3])')

    // Defining a function to scroll to the bottom of the page
  const scrollPageToBottom = async () => {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1000); // Adjust timeout as needed
  };

    // Scrolling in a loop until a certain condition is met
    let previousHeight = 0;
    while (true) {
        await scrollPageToBottom();

        const newHeight = await ventana.evaluate(() => document.body.scrollHeight);
        // Breaking the loop if no new content is loaded
        if (newHeight === previousHeight) {
            break;
        }
        previousHeight = newHeight;
    }


    //   // Set screen size
    //   await page.setViewport({width: 1080, height: 1024});

    //   // Type into search box
    //   await page.type('.devsite-search-field', 'automate beyond recorder');

    //   // Wait and click on first result
    //   const searchResultSelector = '.devsite-result-item-link';
    //   await page.waitForSelector(searchResultSelector);
    //   await page.click(searchResultSelector);

    //   // Locate the full title with a unique string
    //   const textSelector = await page.waitForSelector(
    //     'text/Customize and automate',
    //   );
    //   const fullTitle = await textSelector?.evaluate(el => el.textContent);

    //   // Print the full title
    //   console.log('The title of this blog post is "%s".', fullTitle);

    //   await browser.close();
})();