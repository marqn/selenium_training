"use strict";

var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({ 'browserName': 'chrome' }).build();

let loud;

function log(msg, noisy = loud) {
    if (!noisy) {
        console.log(msg);
    }
}

function logTitle() {
    browser.getTitle().then(title =>
        log('Current Page Title: ' + title)
    );
}

function clickLink(link) {
    link.click();
}

function handleFailure(err) {
    console.error('Something went wrong\n', err.stack, '\n');
    closeBrowser();
}

function closeBrowser() {
    browser.quit();
}

browser.get('http://www.nbp.pl/home.aspx?f=/statystyka/kursy.html').then(logTitle());

let table = browser.findElement(webdriver.By.id("rightSide")).then(v => {
    v.findElements(webdriver.By.tagName('table')).then(v => {
        v[1].findElements(webdriver.By.tagName('tr')).then(tr => {
            for (let i = 0; i < tr.length; i++) {
                tr[i].getText().then(txt => log(txt));
            };
        })
    });
});
table.then(closeBrowser());