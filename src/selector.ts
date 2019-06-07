/* jslint es6 */
'use strict';
import { zipObject } from 'lodash';

type Article = {
    time: string,
    subhead: string,
    headline: string,
    vortext: string,
    link: string
};

module.exports = {
    grabLinks: function($) {
        const links: string[] = [];
        $('#content_wrap').find('a').each((i: number, e: string,) => {
            links[i] = $(e).attr('href');
        });
        const pattern = 'contentlisting';
        // Set for uniqueness, populate the array with the ...spread operator
        return [...new Set(links)].filter(str => {
            return str.indexOf(pattern) === -1;
        });
    },
    
    // map keys and value into an object
    mergeToObj: function(arr: string[]): Article {
        const keys = ['published', 'subhead', 'headline', 'vortext', 'link'];
        return <Article>zipObject(keys, arr);
    },

    grabSiteContent: function($): string[] {
        const result = ['.subhead', '.headline', '.vortext'].map(e => {
            // remove first character "."
            if ($(e).hasClass(e.slice(1))) {
                return $(e).text()
            } else {
                return e + ' missing'
            }
        });
        if ($().find('time')) {
            return this.mergeToObj([$('time').text(), ...result]);
        } else {
            return this.mergeToObj(['time missing', ...result]);
        }
    },

}