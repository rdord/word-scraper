const fetch = require('isomorphic-fetch');
const cheerio = require('cheerio');

const allWords = [];

async function app() {
  const pageText = await getPage(1);
  const pageWords = parseText(pageText);

  // console.log(pageWords);
}

async function getPage(page = 1) {
  const url = `https://fran.si/iskanje?page=${page}&FilteredDictionaryIds=133&View=1&Query=*`;
  const response = await fetch(url).catch(e => console.log('fetch error', e));
  const text = await response.text();

  return text;
}

function parseText(text) {
  const wordsArray = [];

  const $ = cheerio.load(text, { decodeEntities: false });
  $('.entry-content').each((i, el) => {
    const word = $(el).children('.font_xlarge').children('a').html();
    $(el).find('.entry-citation').remove();

    const wordObj = { id: i, word, content: $(el).text().replace(/\s\s+/g, '') };
    console.log(wordObj);
  });
}

function saveToJSON() {}

app();
