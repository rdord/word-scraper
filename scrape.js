const fetch = require('isomorphic-fetch');
const cheerio = require('cheerio');

async function app() {
  const pageText = await getPage(1);
  console.log(pageText);
}

async function getPage(page = 1) {
  const url = `https://fran.si/iskanje?page=${page}&FilteredDictionaryIds=133&View=1&Query=*`;
  const response = await fetch(url);
  const text = await response.text();

  const $ = cheerio.load(text);
  return $('.fran-left-content .list-group.results').html();
}

app();
