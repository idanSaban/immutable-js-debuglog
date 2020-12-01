
module.exports = function () {
    console.debugLog = function () {
        let mappedArguments = Object.values((arguments || {}))
            .map(arg => (arg && arg.toJS && typeof arg.toJS == 'function') ? arg.toJS() : arg);
        console.log(...mappedArguments);
    };
    
    function unJSDeep(variable) {
        const isObject = variable && typeof variable === 'object';
        const isArray = isObject && Array.isArray(variable);
        if (isObject) {
            variable = !isArray && typeof variable.toJS === 'function' ? variable.toJS() : variable;
            variable = Object.entries(variable).reduce((acc, [subVarKey, subVarVal]) => { acc[subVarKey] = unJSDeep(subVarVal); return acc; }, isArray ? [] : {});
        }

        return variable;
    }

    console.deepDebugLog = function () {
        console.log(...Object.values(arguments || {}).map(unJSDeep));
    };
}();
