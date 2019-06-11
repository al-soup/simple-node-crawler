/* jslint es6 */
'use strict';

const fs = require('fs');
const selector = require('../src/selector');
const helpers = require('../src/helpers');
import * as cheerio from 'cheerio';

// grab content of single article
const getHtmlArticle = async function (file: string) {
    const fileText = await fs.promises.readFile(`./offline-test/${file}.html`, 'utf8')
    const $ = cheerio.load(fileText);
    const crawledArticle = selector.grabSiteContent($);
    console.log('what i need', crawledArticle);
    console.log([crawledArticle]);
    // helpers.saveArticlesAsCSV([crawledArticle], 'test-article');
}

// grab links of a site
const getHtmlLinks = async function (file: string) {
    const fileText = await fs.promises.readFile(`./offline-test/${file}.html`, 'utf8')
    const $ = cheerio.load(fileText);
    const crawledLinks = selector.grabLinks($);
    console.log(crawledLinks);
}

getHtmlArticle('iot-site');
getHtmlLinks('iot-allcontent');