/* jslint es6 */
'use strict';

const fs = require('fs');
const fastcsv = require('fast-csv');
import { Article } from './models/article.model'


module.exports = {
    saveArticlesAsCSV: function (articles: Article[], filename: string): void {
        const ws = fs.createWriteStream(`output/${filename}.csv`);
        fastcsv.write(articles, { headers: true }).pipe(ws);
    }
}