import puppeteer from 'puppeteer';

// remember - all this tests run on the same browser session.
// assertion library is jest

let browser, page;

beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
});

afterAll(async () => {
    await browser.close();
})

describe('App', () => {
    test('User can launch the browser', async () => {
        const text = await page.$eval('h1.red', el => el.innerHTML);
        expect(text).toEqual('Player One');
    });
});

describe('LetterGrid', () => {
    test('User can click on a letter', async () => {
        await page.click('p[data-value="a"]');
        const word = await page.$eval('#word', el => el.innerHTML);
        expect(word).toEqual('a');
    });

    test('When a user clicks on a letter, it gets "selected" class', async () => {
        const letterId = await page.$eval('p[data-value="a"]', el => el.dataset.id);
        const letterClass = await page.$eval(`p[data-id="${letterId}"]`, el => el.className);
        expect(letterClass).toBe('letter selected');
    })

    test('User can clear the letter', async () => {
        await page.click('#clear');
        const word = await page.$eval('#word', el => el.innerHTML);
        expect(word).toBe('');
    })

    test('User can create a word', async () => {
        await page.click('p[data-value="s"]');
        await page.click('p[data-value="u"]');
        await page.click('p[data-value="r"]');
        await page.click('p[data-value="f"]');

        const word = await page.$eval('#word', el => el.innerHTML);
        expect(word).toEqual('surf');
    })

    test('Player One can submit a word', async () => {
        await page.click('#submit');
        await page.waitForSelector('li[data-word="surf"]');
        
        const playerOneWord = await page.$eval('#playerOne li[data-word="surf"]', el => el.innerHTML);
        expect(playerOneWord).toEqual('surf')
        
    });

    test('Player Two can create a word after Player One', async () => {
        await page.click('p[data-value="p"]');
        await page.click('p[data-value="i"]');
        await page.click('p[data-value="e"]');
        
        const word = await page.$eval('#word', el => el.innerHTML);
        expect(word).toEqual('pie');
        
    })

    test('Player Two can submit their word', async () => {
        await page.click('#submit');
        await page.waitForTimeout(1000);
    
        const playerTwoWord = await page.$eval('#playerTwo li[data-word="pie"]', el => el.innerHTML);
        expect(playerTwoWord).toEqual('pie');
    })
})
    

