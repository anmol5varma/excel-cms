const kebabCaseToCamelCase = (input) => {
    return input.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
}

const camelCaseToKebabCase = (input) => {
    return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

module.exports = {
    kebabCaseToCamelCase,
    camelCaseToKebabCase
}