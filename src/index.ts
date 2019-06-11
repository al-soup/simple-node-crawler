/* jslint es6 */
'use strict';

const selector = require('./selector');
const Crawler = require('crawler');
const fs = require('fs');
const fastcsv = require('fast-csv'); 
import { Article } from './models/article.model'
import * as cheerio from 'cheerio';

// Testing only
const getHtmlArticle = async function (file: string) {
    const fileText = await fs.promises.readFile(`./test-html/${file}.html`, 'utf8')
    const $ = cheerio.load(fileText);
    // selector.grabSiteContent($).forEach(e => console.log('element', e))
    const crawledArticle = selector.grabSiteContent($);
    console.log([crawledArticle])
    saveAsCSV([crawledArticle]);
}

const getHtmlLinks = async function (file: string) {
    const fileText = await fs.promises.readFile(`./test-html/${file}.html`, 'utf8')
    const $ = cheerio.load(fileText);
    const crawledLinks = selector.grabLinks($);
    return crawledLinks;
}

let feedbacks: Article[] = [];

const c = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            const $ = res.$;
            const end: Article = selector.grabSiteContent($)
            feedbacks.push(end);
        }
        done();
    }
});

// Queue just one URL, with default callback or pass an array of URLs
// c.queue('https://en.wikipedia.org/wiki/Arkadiy_Holovchenko');
// c.queue('https://www.industry-of-things.de/neural-compute-stick-2-beschleunigt-deep-learning-entwicklungen-a-789023/');
// c.queue('https://www.industry-of-things.de/vier-argumente-fuer-iot-a-826497/');

const saveAsTxtFile = function(txt: string): void {
    // falg a for "append"
    const stream = fs.createWriteStream('output/text', { flags: 'a' });
    stream.on('error',  err => {
        console.log(err);
        stream.end();
    });
    stream.write(`Crawld at ${new Date().toISOString()} \n ${txt} \n`);
    stream.end();
}

const saveAsCSV = function(articles: Article[]): void {
    const ws = fs.createWriteStream('output/output.csv');
    fastcsv.write(articles, { headers: true }).pipe(ws);
}

// Use for testing
// getHtmlArticle('iot-site');
// ;

c.queue(['https://www.industry-of-things.de/vernetzte-landwirtschaft-beispiel-fuer-einen-wachstumsmarkt-schlechthin-a-809894/',
    'https://www.industry-of-things.de/iot-events-im-mai-2019-a-814699/',
    'https://www.industry-of-things.de/in-7-schritten-zur-industrie-40-aber-sicher-a-813903/',
    'https://www.industry-of-things.de/datenbrillen-im-unternehmen-einfuehren-in-nur-fuenf-schritten-a-813085/',
    'https://www.industry-of-things.de/kuenstliche-intelligenz-ist-der-naechste-schritt-a-814808/',
    'https://www.industry-of-things.de/geolokalisierung-mit-sigfox-a-815646/',
    'https://www.industry-of-things.de/mit-sensoren-und-blockchain-ins-internet-der-dinge-a-810136/',
    'https://www.industry-of-things.de/vogel-auf-der-hannover-messe-2019-a-815484/',
    'https://www.industry-of-things.de/autonomes-fahren-offene-schnittstellen-fuer-viele-sensordaten-a-814748/',
    'https://www.industry-of-things.de/vw-und-aws-ein-automobil-konzern-geht-in-die-cloud-a-814958/']);
setTimeout(_ => {
    saveAsCSV(feedbacks);
}, 10000);