
module.exports = function () {
    console.debugLog = function () {
        let mappedArguments = Object.values((arguments || {}))
            .map(arg => (arg && arg.toJS && typeof arg.toJS == 'function') ? arg.toJS() : arg);
        console.log(...mappedArguments);
    };
}();