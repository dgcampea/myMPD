"use strict";
// SPDX-License-Identifier: GPL-3.0-or-later
// myMPD (c) 2018-2021 Juergen Mang <mail@jcgames.de>
// https://github.com/jcorporation/mympd

function smartCount(number) {
    if (number === 0) { return 1; }
    else if (number === 1) { return 0; }
    else { return 1; }
}

function tn(phrase, number, data) {
    if (phrase === undefined) {
        logWarn('Phrase is undefined');
        return 'undefined';
    }
    let result = undefined;
    if (isNaN(number)) {
        data = number;
    }

    if (phrases[phrase]) {
        result = phrases[phrase][locale];
        if (result === undefined) {
            if (locale !== 'en-US') {
                logWarn('Phrase "' + phrase + '" for locale ' + locale + ' not found');
            }
            result = phrases[phrase]['en-US'];
        }
    }
    if (result === undefined) {
        result = phrase;
    }

    if (isNaN(number) === false) {
        const p = result.split(' |||| ');
        if (p.length > 1) {
            result = p[smartCount(number)];
        }
        result = result.replace('%{smart_count}', number);
    }
    
    if (data !== null) {
        result = result.replace(/%\{(\w+)\}/g, function(m0, m1) {
            return data[m1];
        });
    }
    return result;
}

function localeDate(secs) {
    let d;
    if (secs === undefined) {
       d  = new Date();
    }
    else {
        d = new Date(secs * 1000);
    }
    return d.toLocaleString(locale);
}

function beautifyDuration(x) {
    const days = Math.floor(x / 86400);
    const hours = Math.floor(x / 3600) - days * 24;
    const minutes = Math.floor(x / 60) - hours * 60 - days * 1440;
    const seconds = x - days * 86400 - hours * 3600 - minutes * 60;

    return (days > 0 ? days + smallSpace + tn('Days') + ' ' : '') +
        (hours > 0 ? hours + smallSpace + tn('Hours') + ' ' + 
        (minutes < 10 ? '0' : '') : '') + minutes + smallSpace + tn('Minutes') + ' ' + 
        (seconds < 10 ? '0' : '') + seconds + smallSpace + tn('Seconds');
}

function beautifySongDuration(x) {
    const hours = Math.floor(x / 3600);
    const minutes = Math.floor(x / 60) - hours * 60;
    const seconds = Math.floor(x - hours * 3600 - minutes * 60);

    return (hours > 0 ? hours + ':' + (minutes < 10 ? '0' : '') : '') + 
        minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function i18nHtml(root) {
    const attributes = [
        ['data-phrase', 'textContent'], 
        ['data-title-phrase', 'title'], 
        ['data-placeholder-phrase', 'placeholder']
    ];
    for (let i = 0, j = attributes.length; i < j; i++) {
        const els = root.querySelectorAll('[' + attributes[i][0] + ']');
        const elsLen = els.length;
        for (let k = 0, l = elsLen; k < l; k++) {
            els[k][attributes[i][1]] = tn(els[k].getAttribute(attributes[i][0]));
        }
    }
}
