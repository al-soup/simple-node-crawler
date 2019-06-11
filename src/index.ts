/* eslint es6 */
'use strict';

const selector = require('./selector');
const helpers = require('./helpers');
const Crawler = require('crawler');
import { Article } from './models/article.model'
import dayjs from 'dayjs';
// import * as cheerio from 'cheerio';


let allLinks: string[] = [];
const articles: Article[] = [];

const linkCrawler = new Crawler({
    maxConnections: 10,
    rateLimit: 1000, // minimum time gap between two crawls in ms
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            const $ = res.$;
            const end = selector.grabLinks($);
            // add new links to existing ones
            allLinks = [...allLinks, ...end];
        }
        done();
    }
});

const articleCrawler = new Crawler({
    maxConnections: 10,
    rateLimit: 1000, 
    // This callback will be called for each crawled page
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            const $ = res.$;
            const end: Article = selector.grabSiteContent($);
            if (end.hasOwnProperty) {
                end.link = res.request.uri.href;
            }
            articles.push(end);
        }
        done();
    }
});

const start = function(url: string, max: number) {
    const links: string[] = [];
    for (let i = 1; i <= max; i++) {
        links.push(url + i)
    }
    linkCrawler.queue(links);
    // emitted when queue is empty
    linkCrawler.on('drain', () => {
        console.log('after', allLinks);
        // prepend the doamin
        const targets = allLinks.map(link => '...' + link)
        articleCrawler.queue(targets)
        articleCrawler.on('drain', () => {
            helpers.saveArticlesAsCSV(articles, `Articles till ${dayjs().format('YYYY-MM-DD HH:mm')}`);
        });
    });
}

// Query the URLs for the first `max` pages of articel listings
// start('...', 10)
