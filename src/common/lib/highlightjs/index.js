var hljs = require('./highlight');

hljs.registerLanguage('xml', require('./languages/xml'));
hljs.registerLanguage('javascript', require('./languages/javascript'));
hljs.registerLanguage('typescript', require('./languages/typescript'));

module.exports = hljs;