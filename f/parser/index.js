const fs = require('fs');

const marked = require('marked');
const highlight = require('highlight.js');

const defaultStyle = fs.readFileSync('./f/parser/html/style.css').toString();
const defaultScript = fs.readFileSync('./f/parser/html/script.js').toString();

module.exports = (params, callback) => {

  let md = ((params.kwargs.md || '') + '');
  let css = ((params.kwargs.css || '') + '');
  let doc = params.kwargs.hasOwnProperty('doc');

  if (!css) {
    css = defaultStyle;
  }

  callback(
    null,
    new Buffer(
      [
        doc ? `<!DOCTYPE html><html><head><base target="_parent"><style>${css}</style><script>${defaultScript}</script></head><body>` : '',
        marked(
          md,
          {
            sanitize: true,
            highlight: function (code) {
              return highlight.highlightAuto(code).value;
            }
          }
        ),
        doc ? `</body></html>` : ''
      ].join('\n')
    )
  );

};
