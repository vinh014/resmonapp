/**
 * Copyright © vinhnv@live.com
 */
/**
 * bind array into string, format index string => value
 * @param string receiver
 * @param array or object data for bind
 */
if ('undefined' == typeof BindController) {
    var BindController = {};
}
/**
 *
 * @param string
 * @param array
 * @param openMaker undefined or not empty
 * @param closeMaker undefined or not empty
 * @returns {*}
 */
BindController.bind2 = function (string, array, openMaker, closeMaker) {
    'undefined' == typeof string ? string = '' : null;
    'undefined' == typeof array ? array = {} : null;
    'undefined' == typeof openMaker ? openMaker = '{' : null;
    'undefined' == typeof closeMaker ? closeMaker = '}' : null;

    // split each element at format: ..{string}.... => string}....
    var opens = string.split(openMaker);
    // if there has character '{'
    if (opens.length > 1) {
        // browse each element
        for (var index in opens) {
            var open = opens[index];
            // split each element string}.... => string...
            var closes = open.split(closeMaker);
            if (closes.length > 1) {
                // replace by value
                eval('closes[0] = array["' + closes[0] + '"]');
                // composite parts
                opens[index] = closes.join('');
            }
        }
        // composite parts
        string = opens.join('');
    }
    return string;
};

/**
 * new version of bind
 * @param string
 * @param array
 * @param headMaker optional
 * @param tailMaker optional
 * @returns string
 */
BindController.bind = function (string, array, headMaker, tailMaker) {
    'undefined' == typeof string ? string = '' : null;
    'undefined' == typeof array ? array = {} : null;
    'undefined' == typeof headMaker ? headMaker = '{' : null;
    'undefined' == typeof tailMaker ? tailMaker = '}' : null;

    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    return string.replace(new RegExp(headMaker + '(\\w+)' + tailMaker, 'g'), function (match, p1, offset, string) {
        if (undefined === array[p1]) {
            return '';
        }
        return ('' + array[p1]).length ? array[p1] : '';
    });
};