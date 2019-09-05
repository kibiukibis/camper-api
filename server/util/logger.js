require('colors');
const _ = require('lodash');

const config = require('../config/config');

const noop = function(){};

const consoleLog = config.logging ? console.log.bind(console) : noop;

const logger = {
    log: function () {
        const args = _.toArray(arguments)
            .map(function (arg) {
                if (typeof arg === 'object') {
                    const string = JSON.stringify(arg, 2);
                    return string.magenta;
                } else {
                    arg += '';
                    return arg.magenta;
                }
            });

        consoleLog.apply(console, args);
    }
};

module.exports = logger;

