var fs = require('fs');

function parseJSON(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

module.exports = parseJSON;