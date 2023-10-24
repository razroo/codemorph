let angularParse;

(async function () {
  angularParse = (await import('angular-html-parser')).parse
})();

module.exports = {
  angularParse,
};